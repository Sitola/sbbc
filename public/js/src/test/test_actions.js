function getObject(name, action)
{
    const obj = {
        id: name,
        name: name,
        description: name,
        action: action
    };

    return obj;
}

const CONST_TYPE = "actions";

function actionsClean(obj)
{
    "use strict";
    restClient.deleteObject(CONST_TYPE , obj);
}

QUnit.module(CONST_TYPE);

QUnit.test("test actions add", function (assert)
{
    console.log("Executing test ADD");
    const action = getObject("test_objAdd", "echo");
    var done = assert.async();


    var response = restClient.createObject(CONST_TYPE,action);
    ajaxSender.handleResponse(response, function (msg)
    {
        var obj = msg;
        console.info("Response from server after create: ", obj);

        var getResp = restClient.getCollection(CONST_TYPE);
        ajaxSender.handleResponse(getResp, function (data)
        {
            console.info("Response from server after get: ", data);

            var actionObject = data[action.id];
            assert.ok(actionObject);
            assert.equal(actionObject.id, action.id);
            assert.equal(actionObject.name, action.name);
            assert.equal(actionObject.action, action.action);
            actionsClean(action);
            done();
        });
    });
});

QUnit.test("test actions get", function (assert)
{
    console.log("Executing test get");
    const action = getObject("test_ObjGet", "echo");
    var done = assert.async();

    var response = restClient.createObject(CONST_TYPE,action);
    ajaxSender.handleResponse(response, function (msg)
    {
        var obj = msg;
        console.info("Response from server after create: ", obj);

        var getResp = restClient.getObject("action", action.id);
        ajaxSender.handleResponse(getResp, function (data)
        {
            console.info("Response from server after get: ", data);

            var actionObject = data;
            assert.ok(actionObject);
            assert.equal(actionObject.id, action.id);
            assert.equal(actionObject.name, action.name);
            assert.equal(actionObject.action, action.action);
            actionsClean(action);
            done();
        });
    });
});


QUnit.test("test actions delete", function (assert)
{
    console.log("Executing test get");
    const style = getObject("test_objDelete", "echo");
    var done = assert.async();

    var response = restClient.deleteObject(CONST_TYPE, style);
    ajaxSender.handleResponse(response, function (msg)
    {
        var obj = msg;
        console.info("Response from server after delete: ", obj);

        var getResp = restClient.getObject("action", style.id);
        ajaxSender.handleResponse(getResp, function (data)
        {
            console.info("Response from server after get: ", data);
            assert.notOk(data);
            done();
        });
    });
});



QUnit.test("test actions update", function (assert)
{
    console.log("Executing test UPDATE");
    const action = getObject("test_objUpdate", "echo");
    var done = assert.async();

    var newAction = getObject("test_objUpdate", "newAction");

    var resOld = restClient.createObject(CONST_TYPE,action);

    ajaxSender.handleResponse(resOld, function (msg)
    {
        var resNew = restClient.updateObject(CONST_TYPE, newAction);

        ajaxSender.handleResponse(resNew, function (msg)
        {
            var obj = msg;
            console.info("Response from server after create: ", obj);

            var getResp = restClient.getCollection(CONST_TYPE);
            ajaxSender.handleResponse(getResp, function (data)
            {
                console.info("Response from server after get: ", data);

                var actionObject = data[action.id];
                assert.ok(actionObject);
                assert.equal(actionObject.id, newAction.id);
                assert.equal(actionObject.name, newAction.name);
                assert.equal(actionObject.action, newAction.action);
                actionsClean(newAction);
                done();
            });
        });

    });
});








