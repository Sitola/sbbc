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


QUnit.module( "Style Tests" );

QUnit.test("test add", function (assert)
{
    console.log("Executing test ADD");
    const style = getStyle("random_Style", "bah");
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
            done();
        });
    });
});

QUnit.test("test get", function (assert)
{
    console.log("Executing test get");
    const style = getStyle("random_Style", "bah");
    var done = assert.async();

    var response = restClient.createObject("styles",style);
    ajaxSender.handleResponse(response, function (msg)
    {
        var obj = msg;
        console.info("Response from server after create: ", obj);

        var getResp = restClient.getObejct("style", style.id);
        ajaxSender.handleResponse(getResp, function (data)
        {
            console.info("Response from server after get: ", data);

            var styleObject = data;
            assert.ok(styleObject);
            assert.equal(styleObject.id, style.id);
            assert.equal(styleObject.name, style.name);
            assert.equal(styleObject.css, style.css);
            assert.equal(styleObject.className, style.className);
            done();
        });
    });
});






