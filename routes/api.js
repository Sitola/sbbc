/**
 * Created by wermington on 5/29/16.
 */


var express = require('express');
var router = express.Router();
var Manager = require('../lib/manager');
var manager = new Manager();

/* GET API page. */
router.get('/', function(req, res, next) {
    res.send('This is api response!!!');
});

/* GET API page. */
router.get('/command', function(req, res, next) {
    res.send('This is api command response!!!');
});

/* POST API page. */

router.post('/command', function (req, res, next) {
   res.send("Post request was send!");
});

router.post('/command/add', function (req, res, next) {
    var name = req.body.name;
    var css  = req.body.css;
    var cmd = req.body.cmd;
    console.log(name);
    console.log(css);
    console.log(cmd)
    res.send({ name : name, css: css, cmd : cmd });
});




/* PUT API page. */

router.put('/create', function (req, res, next) {
    res.send('Put request was send!');

    var method = req.body.method;
    var func =  manager.creators[method];
    func(req, res);

});





module.exports = router;
