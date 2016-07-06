/**
 * Created by wermington on 7/4/16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('tests', { title: 'REST Tests' });
});

module.exports = router;
