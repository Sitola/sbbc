/**
 * Created by wermington on 7/7/16.
 */
import express from 'express'
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('list/index', { title: 'Show Layouts' });
});

router.get('/:layout', function(req, res, next)
{
    "use strict";
    const lay = req.params.layout;
    res.render(`../resources/layouts/${lay}`);
});


export default router;
