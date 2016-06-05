/**
 * Created by wermington on 6/5/16.
 */



$(function () {

    var actionName = $("#actionName");
    var actionCommand = $("#textCommand");

    var saveButton = $("#saveButton");


    saveButton.click(function (e) {
        var aName = actionName.val().replace(/ /g,"_");
        var command = actionCommand.val();

        var result  = {
            method : "command",
            name : aName,
            command: command
        };

        function callback(res) {
            
        }

        ajaxSender.sendPut(result, callback);
    })

});