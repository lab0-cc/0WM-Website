const { chromium } = require('playwright');
const path = require('path');

async function settle(page) {
  await page.evaluate(() =>
    new Promise(resolve =>
      requestAnimationFrame(() =>
        requestAnimationFrame(resolve)
      )
    )
  );
}

(async () => {
  const browser = await chromium.launch();

  const context = await browser.newContext({
    viewport: {
      width: 960,
      height: 640,
    },
  });

  const page = await context.newPage();
  await page.goto('http://opmode', { waitUntil: 'networkidle' });
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'img/opmode-home-1.png' });

  await page.getByLabel('New floorplan').setInputFiles(path.resolve('playwright/sample-floorplan.png'));
  await page.getByText('Press:').waitFor();
  await settle(page);
  await page.screenshot({ path: 'img/opmode-edit-1.png' });

  const canvas = page.locator('floorplan-editor canvas');
  await canvas.click({ position: { x: 48, y: 48 } });
  await canvas.click({ position: { x: 721, y: 48 } });
  await canvas.click({ position: { x: 721, y: 529 } });
  await canvas.click({ position: { x: 48, y: 529 } });
  await canvas.click({ position: { x: 48, y: 48 } });
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'img/opmode-edit-2.png' });

  await page.getByText('Map Editor').click();
  await page.screenshot({ path: 'img/opmode-place-1.png' });

  await page.locator('floorplan-container').evaluate(container => container.ofJSON([
    { x: 50, y: 50 },
    { x: 750, y: 50 },
    { x: 50, y: 550}
  ]));
  await page.screenshot({ path: 'img/opmode-place-2.png' });

  await page.locator('world-map').evaluate(map => {
    map.panTo({ lat: 48.451959, lng: -5.139625 });
    map.setZoom(20);
  });
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'img/opmode-place-3.png' });

  await page.getByText('Place').click();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(100);
  await page.screenshot({ path: 'img/opmode-place-4.png' });

  await page.locator('world-map').evaluate(map => {
    map.ofJSON([
      { lat: 48.4520556236671, lng: -5.139546990394593 },
      { lat: 48.45195778045223, lng: -5.139078944921494 },
      { lat: 48.45184659475193, lng: -5.139646232128144 }
    ]);
    map.updateOverlay(document.querySelector('floorplan-container').getAnchors(), { x: 800, y: 600 });
  });
  await page.screenshot({ path: 'img/opmode-place-5.png' });

  await page.getByText('Additional Parameters').click();
  await page.waitForTimeout(100);
  await page.screenshot({ path: 'img/opmode-finalize-1.png' });

  await page.getByLabel('Floor altitude').fill('1');
  await page.getByLabel('Ceiling altitude').fill('4');
  const floorplanName = page.getByPlaceholder('Floorplan name');
  await floorplanName.fill('Your floorplan');
  await page.waitForTimeout(100);
  await page.screenshot({ path: 'img/opmode-finalize-2.png' });

  await floorplanName.press('Enter');
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'img/opmode-home-2.png' });

  await page.getByText('Reset view').click();
  await page.getByText('Locate floorplan').click();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: 'img/opmode-home-4.png' });

  await page.mouse.move(480, 320);
  await page.waitForTimeout(2700);
  await page.screenshot({ path: 'img/opmode-home-3.png' });

  await page.locator('world-map .delete').click();
  await page.waitForTimeout(100);
  await browser.close();
})();
