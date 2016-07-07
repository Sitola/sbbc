/**
 * Created by wermington on 7/7/16.
 */
import {DefaultResponse, ResponseError, ResponseInfo, ResponseWarning, ResponseException, Manager} from "../manager";
import express from 'express'
import {debug} from "../global";
var router = express.Router();
const manager = new Manager();


function handleException(e, res)
{
    if (e.hasOwnProperty('what')) {
        e.out();
    }
    else {
        console.error(e);
    }
    res.send(e);
}

router.get('/style', function (req, res, next)
{
    debug("Received [GENERATE] STYLE request. ");

    try {
        var msg = manager.generate("style");
        res.header("Content-Type", "text/css");
        res.send(msg);
    } catch (e) {
        handleException(e, res);
    }
});


router.get('/script', function (req, res, next)
{
    debug("Received [GENERATE] SCRIPT request. ");

    try {
        var msg = manager.generate("script");
        res.header("Content-Type", "text/javascript");
        res.send(msg);
    } catch (e) {
        handleException(e, res);
    }
});

export default router;