/**
 * Created by wermington on 5/29/16.
 */


import express from 'express'
var router = express.Router();

import {debug} from '../global';
import winston from 'winston';


/* GET home page. */
router.get('/', function(req, res, next) {
  const passedObject = {
    title: 'Admin',
    form_page: 'index'
  };
  winston.debug(">>> Passing object: ", passedObject);
  res.render('admin/admin',
             passedObject);
});

router.get('/edit', function(req, res, next) {
  res.render('admin/edit', {title: 'Style', form_page: 'edit'});
});

router.get('/create', function(req, res, next) {
  res.render('admin/create', {title: 'Button', form_page: 'create'});
});

router.get('/edit/:form', function(req, res, next) {
  const form = req.params.form;
  res.render('admin/edit', {title: 'Command', form_page: form});
});

router.get('/create/:form', function(req, res, next) {
  const form = req.params.form;
  res.render('admin/create', {title: 'Command', form_page: form});
});


export default router;
