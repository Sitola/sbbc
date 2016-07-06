/**
 * Created by wermington on 5/29/16.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin', { title: 'Admin' });
});

router.get('/style', function (req, res, next) {
    res.render('style', { title: 'Style' });
});

router.get('/button', function (req, res, next) {
    res.render('button', { title: 'Button' });
});

router.get('/command', function (req, res, next) {
    res.render('command', { title: 'Command' });
});

module.exports = router;

//# sourceMappingURL=admin-compiled.js.map