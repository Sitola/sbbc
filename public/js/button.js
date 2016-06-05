/**
 * Created by wermington on 6/5/16.
 */
/**
 * Created by wermington on 6/5/16.
 */



$(function () {

    var buttonName = $("#buttonName");
    var buttonText = $("#buttonText");
    var selectButtonStyle = $("#selectButtonStyle");
    var selectButtonCommand = $("#selectButtonCommand");

    var saveButton = $("#saveButton");


    saveButton.click(function (e) {
        var bName = buttonName.val().replace(/ /g,"_");
        var text = buttonText.val();
        var style = selectButtonStyle.val();
        var command = selectButtonCommand.val();


        var result  = {
            method : "button",
            name : bName,
            style: style,
            command: command,
            text: text
        };

        ajaxSender.sendPut(result);
    })

});