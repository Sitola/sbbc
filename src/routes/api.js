/**
 * Created by wermington on 5/29/16.
 */


import {DefaultResponse, ResponseError, ResponseInfo, ResponseWarning, ResponseException} from "../manager";
import express from 'express'
var router = express.Router();
import {manager} from '../global';

import winston from 'winston'
import {MessageFactory, DefaultMessage, ErrorMessage, WarningMessage} from '../utils/messages';


function handleException(e, res) {
  try {
    if (e.hasOwnProperty('out')) {
      e.out();
    }
    else {
      winston.error(e);
    }
    res.send(e);
  }
  catch (e) {
    winston.error('[ERROR] Message: ', e);
  }

}

function initGetCollection(router, name) {
  function collectionsCallback(req, res, next) {
    winston.debug(" >>> [GET] request for: " + name);

    try {
      var result = manager.getCollection(name);
      res.send(MessageFactory.msg(result));
    } catch (e) {
      handleException(e, res);
    }
  }

  var eName = "/" + name;
  router.get(eName, collectionsCallback);
  winston.info("[GET] API endpoint \"/api%s\" ", eName);
  return router;
}

function initGetCollections(router) {
  const connArr = ["", "styles", "actions", "buttons", "layouts"];
  connArr.forEach(
    function(i) {
      router = initGetCollection(router, i);
    });
  return router;
}


function initGetObject(router, type) {

  function objectCallback(req, res, next) {
    winston.debug(" >>> [GET] request for: " + type);
    winston.debug("Request attrs: ", req.query);
    var id = req.params.id;
    try {
      var result = manager.getObject(type + "s", id);
      res.send(MessageFactory.msg(result));

    } catch (e) {
      handleException(e, res);
    }
  }

  const eName = "/" + type + "/:id";
  router.get(eName, objectCallback);
  winston.info("[GET] API endpoint \"/api%s\" ", eName);
  return router;
}

function initGetObjects(router) {
  const connArr = ["", "style", "action", "button", "layout"];
  connArr.forEach(
    function(i) {
      router = initGetObject(router, i);
    });
  return router;
}

router = initGetCollections(router);
router = initGetObjects(router);

router.post('/exec', function(req, res, next) {
  winston.debug("[EXEC] called.");

  function callback(data) {
    res.send(data);
  }

  try {
    const id = req.body.data.exec;
    manager.execute(id, callback);
    res.send(MessageFactory.msg("OK"));
  } catch (e) {
    handleException(e, res);
  }
});


router.put('/create', function(req, res, next) {
  winston.debug("Received PUT [CREATE] request. ");
  winston.debug(" >>> [CREATE] Request: ", req.body);
  const method = req.body.type;
  try {
    const data = req.body.data;
    manager.createObject(method, data);
    res.send(MessageFactory.msg(`Object ["${data.id}"] @ \"${method}\" successfully created!`));
  } catch (e) {
    handleException(e, res);
  }
});

router.put('/update', function(req, res, next) {
  winston.debug("Received PUT [UPDATE] request. ");
  winston.debug(" >>> [UPDATE] Request: ", req.body);
  const method = req.body.type;
  try {
    const data = req.body.data;
    manager.updateObject(method, data);
    res.send(MessageFactory.msg(`Object [ ${data.id}] @ \"${method}\" successfully updated!`));
    } catch (e) {
    handleException(e, res);
  }

});


router.delete('/delete', function(req, res, next) {
  winston.debug("Received DELETE request. ");
  winston.debug(" >>> [DELETE] Request: ", req.body);
  const method = req.body.type;

  try {
    const id = req.body.data.id;
    manager.deleteObject(method, id);
    const msg = `Object ${id} @ \"${method}\" successfully deleted`;
    res.send(new MessageFactory.msg(msg));

  } catch (e) {
    handleException(e, res);
  }
});

export default router;
