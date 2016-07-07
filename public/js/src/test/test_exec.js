/**
 * Created by wermington on 7/6/16.
 */

QUnit.module("Exec module");


function createExec(command)
{
    return {
        exec: command
    };
}

function createCommand(name, command)
{
    "use strict";
    return {
        id: name,
        name: name,
        description: name,
        action: command
    };
}

function restCommand(assert, done)
{
    "use strict";
    const helloWorld = "Hello World";
    const simpleEchoText = 'echo "' +  helloWorld + '"';
    const cmdName = "simpleEcho";
    const cmd = createCommand(cmdName, simpleEchoText);

    var response = Manager.createObject("actions", cmd);
    response.handle(function ()
    {
        afterCreateCommand(cmd, helloWorld, assert, done);
    });
}

function afterCreateCommand(cmd, text, assert, done)
{
    var echoExec = createExec(cmd.id);
    var response = Manager.executeCommand(echoExec);
    response.handle(function (msg)
    {
        const output = Tools.removeNewLine(msg.stdout);
        const err = Tools.removeNewLine(msg.stderr);

        console.log("STDOUT: %s", output);
        if(err || err != "")
        {
            console.warn("STDERR: %s", err);
        }
        
        assert.equal(output, text);
        done();
    });
}

QUnit.test("Simple echo", function (assert)
{
    const done = assert.async();
    restCommand(assert, done);
});




