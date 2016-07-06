"use strict";

admin / style; /**
               * Created by wermington on 6/5/16.
               */

$(function () {

    var actionName = $("#actionName");
    var actionCommand = $("#textCommand");
    var saveButton = $("#saveButton");

    saveButton.click(function (e) {
        var aName = actionName.val();
        var command = actionCommand.val();
        var description = "";

        var request = {
            id: removeSpaces(aName),
            name: aName,
            description: description,
            action: command
        };

        var resp = restClient.createObject("action", request);
        ajaxSender.handleResponse(resp, function (res) {
            console.info(res);
        });
    });
});

//# sourceMappingURL=action-compiled.js.map