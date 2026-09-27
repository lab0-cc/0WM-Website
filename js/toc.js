'use strict';

(function() {
    function tocScroll() {
        const main = document.querySelector('main');
        const offsets = [...document.querySelectorAll('h1,h2,h3')].map(e => e.offsetTop);
        offsets.push(main.offsetHeight);
        const toc = document.querySelector('aside.toc');
        const heights = [...toc.querySelectorAll('ul a')].map(e => e.offsetHeight);
        const ymin = window.scrollY;
        const ymax = ymin + window.innerHeight - main.offsetTop;
        let viewportStart = 0;
        let viewportEnd = 0;
        let first = true;
        let atBottom = false;
        for (let i = 0; i < offsets.length - 1; i++) {
            atBottom = false;
            const offset = offsets[i];
            const nextOffset = offsets[i+1];
            const height = heights[i];
            if (first && ymin <= nextOffset) {
                first = false;
                viewportStart += height * (ymin - offset) / (nextOffset - offset);
            }
        
            if (!first && ymax <= nextOffset) {
                viewportEnd += height * (ymax - offset) / (nextOffset - offset);
                break;
            }
        
            if (first)
                viewportStart += height;
            viewportEnd += height;
            atBottom = true;
        }

        toc.style.setProperty("--viewport-start", `${viewportStart}px`);
        toc.style.setProperty("--viewport-end", `${viewportEnd}px`);
        if (atBottom && viewportStart <= 0)
            toc.classList.add('hide-viewport');
        else
            toc.classList.remove('hide-viewport');
    }
    window.addEventListener('load', tocScroll);
    window.addEventListener('resize', tocScroll);
    window.addEventListener('scroll', tocScroll);
})();
