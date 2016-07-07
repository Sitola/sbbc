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
    Manager.deleteObject(CONST_TYPE , obj);
}

QUnit.module(CONST_TYPE);

QUnit.test("test actions add", function (assert)
{
    console.log("Executing test ADD");
    const action = getObject("test_objAdd", "echo");
    var done = assert.async();


    const response = Manager.createObject(CONST_TYPE, action);
    response.handle(function (msg)
    {
        console.info("Response from server after create: ", msg);

        var getResp = Manager.getCollection(CONST_TYPE);
        getResp.handle( function (data)
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

    const response = Manager.createObject(CONST_TYPE, action);
    response.handle(function (msg)
    {
        console.info("Response from server after create: ", msg);

        var getResp = Manager.getObject("action", action.id);
        getResp.handle(function (data)
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
    const action = getObject("test_objDelete", "echo");
    var done = assert.async();

    var response = Manager.deleteObject(CONST_TYPE, action);
    response.handle(function (msg)
    {
        console.info("Response from server after delete: ", msg);

        var getResp = Manager.getObject("action", action.id);
        getResp.handle(function (data)
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
    const done = assert.async();
    const newAction = getObject("test_objUpdate", "newAction");
    const resOld = Manager.createObject(CONST_TYPE, action);

    resOld.handle(function ()
    {
        var resNew = Manager.updateObject(CONST_TYPE, newAction);

        resNew.handle(function (msg)
        {
            console.info("Response from server after create: ", msg);

            var getResp = Manager.getCollection(CONST_TYPE);
            getResp.handle(function (data)
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








