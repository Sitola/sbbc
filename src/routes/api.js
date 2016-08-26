/**
 * Created by wermington on 5/29/16.
 */


import {DefaultResponse, ResponseError, ResponseInfo, ResponseWarning, ResponseException} from "../manager";
import express from 'express'
var router = express.Router();
import {manager} from '../global';

import {debug} from "../global";


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
            res.send(new DefaultResponse(result));
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
        var id = req.params.id;
        try {
            var result = manager.getObject(type + "s", id);
            res.send(new DefaultResponse(result));

        } catch (e) {
            handleException(e, res);
        }
    }

    var eName = "/" + type + "/:id";
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
    debug("[EXEC] called.");

    function callback(data)
    {
        res.send(data);
    }

    try {
        const id = req.body.data.exec;
        manager.execute(id, callback);
    } catch (e) {
        //handleException(e, res);
    }
});


router.put('/create', function (req, res, next)
{
    debug("Received PUT [CREATE] request. ");
    debug(" >>> [CREATE] Request: ", req.body);
    const method = req.body.type;
    try {
        const data = req.body.data;
        manager.createObject(method, data);
        res.send(new DefaultResponse(`Object ["${data.id}"] @ \"${method}\" successfully created!`));
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
        res.send(new DefaultResponse(`Object [ ${data.id}] @ \"${method}\" successfully updated!`));

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
        var id = req.body.data.id;
        manager.deleteObject(method, id);
        const msg = `Object ${id} @ \"${method}\" successfully deleted`;
        res.send(new DefaultResponse(msg));

    } catch (e) {
        handleException(e, res);
    }
});

export default router;
