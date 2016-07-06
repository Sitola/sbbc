function getObject(name, action, style)
{
    const obj = {
        id: name,
        name: name,
        description: name,
        value: name,
        action: action,
        style: style
    };

    return obj;
}

const CONST_TYPE = "buttons";

function buttonClean(obj)
{
    "use strict";
    restClient.deleteObject(CONST_TYPE , obj);
}

QUnit.module(CONST_TYPE);

QUnit.test("test actions add", function (assert)
{
    console.log("Executing test ADD");
    const button = getObject("test_objAdd", "echo", "super");
    var done = assert.async();


    var response = restClient.createObject(CONST_TYPE,button);
    ajaxSender.handleResponse(response, function (msg)
    {
        var obj = msg;
        console.info("Response from server after create: ", obj);

        var getResp = restClient.getCollection(CONST_TYPE);
        ajaxSender.handleResponse(getResp, function (data)
        {
            console.info("Response from server after get: ", data);

            var buttonObject = data[button.id];
            assert.ok(buttonObject);
            assert.equal(buttonObject.id, button.id);
            assert.equal(buttonObject.name, button.name);
            assert.equal(buttonObject.action, button.action);
            assert.equal(buttonObject.style, button.style);
            assert.equal(buttonObject.value, button.value);
            buttonClean(button);
            done();
        });
    });
});

QUnit.test("test actions get", function (assert)
{
    console.log("Executing test get");
    const button = getObject("test_objAdd", "echo", "super");
    var done = assert.async();

    var response = restClient.createObject(CONST_TYPE,button);
    ajaxSender.handleResponse(response, function (msg)
    {
        var obj = msg;
        console.info("Response from server after create: ", obj);

        var getResp = restClient.getObject("button", button.id);
        ajaxSender.handleResponse(getResp, function (data)
        {
            console.info("Response from server after get: ", data);

            var buttonObject = data;
            assert.ok(buttonObject);
            assert.equal(buttonObject.id, button.id);
            assert.equal(buttonObject.name, button.name);
            assert.equal(buttonObject.action, button.action);
            assert.equal(buttonObject.style, button.style);
            assert.equal(buttonObject.value, button.value);
            buttonClean(button);
            done();
        });
    });
});


QUnit.test("test actions delete", function (assert)
{
    console.log("Executing test get");
    const button = getObject("test_objAdd", "echo", "super");
    var done = assert.async();

    var response = restClient.deleteObject(CONST_TYPE, button);
    ajaxSender.handleResponse(response, function (msg)
    {
        console.info("Response from server after delete: ", msg);

        var getResp = restClient.getObject("button", button.id);
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
    const button = getObject("test_objUpdate", "echo", "super");
    var newButton = getObject("test_objUpdate", "newButton", "newSuper");
    var done = assert.async();


    var resOld = restClient.createObject(CONST_TYPE, button);

    ajaxSender.handleResponse(resOld, function ()
    {
        var resNew = restClient.updateObject(CONST_TYPE, newButton);

        ajaxSender.handleResponse(resNew, function (msg)
        {
            console.info("Response from server after create: ", msg);

            var getResp = restClient.getCollection(CONST_TYPE);
            ajaxSender.handleResponse(getResp, function (data)
            {
                console.info("Response from server after get: ", data);

                var buttonObject = data[button.id];
                assert.ok(buttonObject);
                assert.equal(buttonObject.id, newButton.id);
                assert.equal(buttonObject.name, newButton.name);
                assert.equal(buttonObject.action, newButton.action);
                assert.equal(buttonObject.style, newButton.style);
                assert.equal(buttonObject.value, newButton.value);

                buttonClean(newButton);
                done();
            });
        });

    });
});








