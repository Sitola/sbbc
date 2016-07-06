admin/style/**
 * Created by wermington on 6/5/16.
 */



$(function () {

    var actionName = $("#actionName");
    var actionCommand = $("#textCommand");

    var saveButton = $("#saveButton");


    saveButton.click(function (e) {
        var aName = actionName.val();
        var command = actionCommand.val();

        const request = {
            id: removeSpaces(aName),
            name: aName,
            commandText: command
        };

        var resp = restClient.createObject("action",request);
        if(resp != null)
        {
            console.log(resp);
        }
    });

});