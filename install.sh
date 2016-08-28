#! /bin/bash

npm install
npm run babel-server
npm run babel-client

cd public/
bower install jquery
bower install qunit
bower install ace-build



