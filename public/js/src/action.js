admin/style/**
 * Created by wermington on 6/5/16.
 */



$(function () {

    const actionName = $("#actionName");
    const actionCommand = $("#textCommand");
    const saveButton = $("#saveButton");


    saveButton.click(function (e) {
        const aName = actionName.val();
        const command = actionCommand.val();
        const description = "";

        const request = {
            id: removeSpaces(aName),
            name: aName,
            description: description,
            action: command
        };

        var resp = restClient.createObject("action",request);
        ajaxSender.handleResponse(resp, function (res)
        {
            console.info(res);
        });
    });

});