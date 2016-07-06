function getStyle(name, css)
{
    const obj = {
        id: name,
        name: name,
        description: name,
        css: css,
        className: name
    };

    return obj;
}

function styleClean(obj)
{
    "use strict";
    restClient.deleteObject( "styles" ,obj);
}


QUnit.test("test add", function (assert)
{
    console.log("Executing test ADD");
    const style = getStyle("test_objAdd", "bah");
    var done = assert.async();


    var response = restClient.createObject("styles",style);
    ajaxSender.handleResponse(response, function (msg)
    {
        var obj = msg;
        console.info("Response from server after create: ", obj);

        var getResp = restClient.getCollection("styles");
        ajaxSender.handleResponse(getResp, function (data)
        {
            console.info("Response from server after get: ", data);

            var styleObject = data[style.id];
            assert.ok(styleObject);
            assert.equal(styleObject.id, style.id);
            assert.equal(styleObject.name, style.name);
            assert.equal(styleObject.css, style.css);
            assert.equal(styleObject.className, style.className);
            styleClean(style);
            done();
        });
    });
});

QUnit.test("test get", function (assert)
{
    console.log("Executing test get");
    const style = getStyle("test_ObjGet", "bah");
    var done = assert.async();

    var response = restClient.createObject("styles",style);
    ajaxSender.handleResponse(response, function (msg)
    {
        var obj = msg;
        console.info("Response from server after create: ", obj);

        var getResp = restClient.getObject("style", style.id);
        ajaxSender.handleResponse(getResp, function (data)
        {
            console.info("Response from server after get: ", data);

            var styleObject = data;
            assert.ok(styleObject);
            assert.equal(styleObject.id, style.id);
            assert.equal(styleObject.name, style.name);
            assert.equal(styleObject.css, style.css);
            assert.equal(styleObject.className, style.className);
            styleClean(style);
            done();
        });
    });
});


QUnit.test("test delete", function (assert)
{
    console.log("Executing test get");
    const style = getStyle("test_objDelete", "bah");
    var done = assert.async();

    var response = restClient.deleteObject("styles", style);
    ajaxSender.handleResponse(response, function (msg)
    {
        var obj = msg;
        console.info("Response from server after delete: ", obj);

        var getResp = restClient.getObject("style", style.id);
        ajaxSender.handleResponse(getResp, function (data)
        {
            console.info("Response from server after get: ", data);

            var styleObject = data;
            assert.notOk(data);
            done();
        });
    });
});



QUnit.test("test styles update", function (assert)
{
    console.log("Executing test UPDATE");
    const style = getStyle("test_objUpdate", "bah");
    var done = assert.async();

    var newStyle = getStyle("test_objUpdate", "newCss");

    var resOld = restClient.createObject("styles",style);

    ajaxSender.handleResponse(resOld, function (msg)
    {
        var resNew = restClient.updateObject("styles", newStyle);

        ajaxSender.handleResponse(resNew, function (msg)
        {
            var obj = msg;
            console.info("Response from server after create: ", obj);

            var getResp = restClient.getCollection("styles");
            ajaxSender.handleResponse(getResp, function (data)
            {
                console.info("Response from server after get: ", data);

                var styleObject = data[style.id];
                assert.ok(styleObject);
                assert.equal(styleObject.id, newStyle.id);
                assert.equal(styleObject.name, newStyle.name);
                assert.equal(styleObject.css, newStyle.css);
                assert.equal(styleObject.className, newStyle.className);
                styleClean(newStyle);
                done();
            });
        });

    });
});








