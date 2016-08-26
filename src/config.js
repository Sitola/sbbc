/**
 * Created by wermington on 7/4/16.
 */

const express = require('express');
const expressWS = require('express-ws');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const logger = require("morgan");
const winston = require('winston');


export default function(app) {
  var eWS = expressWS(app);
  app = eWS.app;

  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'jade');
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  if (app.get('env') === 'development') {
    app.locals.pretty = true;
  }

  winston.info("[CONFIG] Successfully applied!");

  return app;
}


// view engine setup





