$(function () {

    const actionName = $("#actionName");
    const actionCommand = $("#textCommand");
    const saveButton = $("#saveButton");


    saveButton.click(function (e) {
        const aName = actionName.val();
        const command = actionCommand.val();
        const description = "";

        const request = {
            id: Tools.removeSpaces(aName),
            name: aName,
            description: description,
            action: command
        };

        var resp = Manager.createObject("actions", request);
        resp.handle( function (res)
        {
            console.info(res);
        });
    });
});