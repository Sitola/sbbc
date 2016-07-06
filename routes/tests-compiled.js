'use strict';

/**
 * Created by wermington on 7/4/16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('tests/index', { title: 'REST Tests' });
});

router.get('/layouts', function (req, res, next) {
    res.render('tests/layouts', { title: 'REST Tests layouts ' });
});

router.get('/actions', function (req, res, next) {
    res.render('tests/actions', { title: 'REST Tests actions' });
});
router.get('/styles', function (req, res, next) {
    res.render('tests/styles', { title: 'REST Tests styles' });
});
router.get('/buttons', function (req, res, next) {
    res.render('tests/buttons', { title: 'REST Tests buttons' });
});

router.get('/exec', function (req, res, next) {
    res.render('tests/exec', { title: 'REST Tests exec' });
});

module.exports = router;

//# sourceMappingURL=tests-compiled.js.map