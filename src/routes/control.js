/**
 * Created by wermington on 5/29/16.
 */


import express from 'express'
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('control', { title: 'Control' });
});

export default router;
