/**
 * Created by wermington on 5/29/16.
 */


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('control', { title: 'Control' });
});

module.exports = router;
