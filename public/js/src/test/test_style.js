function getObject(name, css)
{
    return {
        id: name,
        name: name,
        description: name,
        css: css,
        className: name
    };
}

const CONST_TYPE = "styles";

function styleClean(obj)
{
    "use strict";
    Manager.deleteObject(CONST_TYPE , obj);
}

QUnit.module(" Styles ");


QUnit.test("test Style add", function (assert)
{
    console.log("Executing test ADD");
    const style = getObject("test_objAdd", "bah");
    var done = assert.async();


    var response = Manager.createObject(CONST_TYPE, style);
    response.handle(function (msg)
    {
        console.info("Response from server after create: ", msg);

        var getResp = Manager.getCollection(CONST_TYPE);
        getResp.handle(function (data)
        {
            console.info("Response from server after get: ", data);

            var styleObject = data[style.id];
            console.info(`[STYLE] (${style.id}): ${data}`);
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

QUnit.test("test Style get", function (assert)
{
    console.log("Executing test get");
    const style = getObject("test_ObjGet", "bah");
    var done = assert.async();

    var response = Manager.createObject(CONST_TYPE, style);
    response.handle(function (msg)
    {
        console.info("Response from server after create: ", msg);

        var getResp = Manager.getObject("style", style.id);
        getResp.handle(function (data)
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


QUnit.test("test Style delete", function (assert)
{
    console.log("Executing test get");
    const style = getObject("test_objDelete", "bah");
    var done = assert.async();

    var response = Manager.deleteObject(CONST_TYPE, style);
    response.handle(function (msg)
    {
        console.info("Response from server after delete: ", msg);

        var getResp = Manager.getObject("style", style.id);
        getResp.handle(function (data)
        {
            console.info("Response from server after get: ", data);
            assert.notOk(data);
            done();
        });
    });
});



QUnit.test("test Style update", function (assert)
{
    console.log("Executing test UPDATE");
    const style = getObject("test_objUpdate", "bah");
    var done = assert.async();

    var newStyle = getObject("test_objUpdate", "newCss");

    var resOld = Manager.createObject(CONST_TYPE, style);

    resOld.handle( function ()
    {
        var resNew = Manager.updateObject(CONST_TYPE, newStyle);

        resNew.handle( function (msg)
        {
            console.info("Response from server after create: ", msg);

            var getResp = Manager.getCollection(CONST_TYPE);
            getResp.handle(function (data)
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








