/**
 * Created by wermington on 5/29/16.
 */


import {ManagerResponse, ManagerError, ManagerInfo, ManagerWarning, ManagerException, Manager} from "../src/manager";
import express from 'express'
var router = express.Router();
var manager = new Manager();

import {debug} from "../src/global";


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

function initGetCollection(router, name)
{
    function collectionsCallback(req, res, next)
    {
        debug(" >>> [GET] request for: " + name);

        try {
            var result = manager.getCollection(name);
            res.send(new ManagerResponse(result));
        } catch (e) {
            handleException(e, res);
        }
    }
    var eName = "/" + name;
    router.get(eName, collectionsCallback);
    console.info("[GET] API endpoint \"/api%s\" ", eName);
    return router;
}

function initGetCollections(router)
{
    const connArr = ["", "styles", "actions", "buttons", "layouts"];
    connArr.forEach(
        function (i)
        {
            router = initGetCollection(router, i);
        });
    return router;
}


function initGetObject(router, type)
{

    function objectCallback(req, res, next)
    {
        debug(" >>> [GET] request for: " + type);
        debug("Request attrs: ", req.query);
        var id = req.query.id;
        try {
            var result = manager.getObject(type + "s", id);
            res.send(new ManagerResponse(result));
        } catch (e) {
            handleException(e, res);
        }
    }
    var eName = "/" + type;
    router.get(eName, objectCallback);
    console.info("[GET] API endpoint \"/api%s\" ", eName);
    return router;
}

function initGetObjects(router)
{
    const connArr = ["", "style", "action", "button", "layout"];
    connArr.forEach(
        function (i)
        {
            router = initGetObject(router, i);
        });
    return router;
}

router = initGetCollections(router);
router = initGetObjects(router);

router.post('/exec', function (req, res, next)
{
    debug("Exec action received.");

    const action = req.body.action;
    if (!action) {
        res.send(new ManagerError("No action was send"));
    }

    const id = req.body.data.id;
    const cmd = manager.getObject("actions", id);
    if (!cmd) {
        var err = new ManagerError("No command was found with name: " + id);
        err.out();
        req.send(err);
        return;
    }

    var child = exec(cmd.command, function (error, stdout, stderr)
    {
        var commandRes = {
            stdout: stdout,
            stderr: stderr
        };

        if (error) {
            var err = new ManagerError("Error: " + error);
            err.out();
            req.send(err);
        }

        var managerInfo = new ManagerInfo(commandRes);
        managerInfo.out();
        res.send(managerInfo);
    });
});


router.put('/create', function (req, res, next)
{
    debug("Received PUT [CREATE] request. ");
    debug(" >>> [CREATE] Request: ", req.body);
    const method = req.body.type;
    try {
        const data = req.body.data;
        manager.createObject(method, data);
        res.send(new ManagerResponse("Object [" + data.id + "] @ \" " + method + " \" succesfully created!"));
    } catch (e) {
        handleException(e, res);
    }
});

router.put('/update', function (req, res, next)
{
    debug("Received PUT [UPDATE] request. ");
    debug(" >>> [UPDATE] Request: ", req.body);
    const method = req.body.type;
    try {
        const data = req.body.data;
        manager.updateObject(method, data);
        res.send(new ManagerResponse("Object [" + data.id + "] @ \" " + method + " \" succesfully updated!"));

    } catch (e) {
        handleException(e, res);
    }
});



router.delete('/delete', function (req, res, next)
{
    debug("Received DELETE request. ");
    debug(" >>> [DELETE] Request: ", req.body);
    const method = req.body.type;

    try {
        var id = req.body.data;
        manager.deleteObject(method, id);
        res.send(new ManagerResponse("Object [" +id + "] @ \" " + method + " \" succesfully deleted!"));

    } catch (e) {
        handleException(e, res);
    }
});

module.exports = router;
