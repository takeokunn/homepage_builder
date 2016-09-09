#!/bin/sh
gulp dist
git add dist
git commit -m "push"
git subtree push --prefix dist origin gh-pages
