#!/usr/bin/env bash

git stash

git pull --rebase origin master

git stash apply


npm update
npm run babel-server
npm run babel-client



