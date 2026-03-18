SHELL := /bin/bash

.PHONY: build dist deploy

build:
	rm -rf .dist
	mkdir -p .dist
	for file in ./*.md; do pandoc "$$file" -d html -o ".dist/$${file%md}html"; done
	cp -R css .dist
	cp -R img .dist

dist: build
	git worktree remove -f .deploy || true
	rm -rf .deploy
	git worktree add .deploy deploy
	rsync -av --delete .dist/ .deploy --exclude=.git --exclude=.nojekyll --exclude=CNAME
	cd .deploy && git add -A && git commit -sm "Bump dist"

deploy:
	git push
	git push origin deploy
