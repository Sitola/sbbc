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
        const bName = Tools.removeSpaces(buttonName.val());
        const text = buttonText.val();
        const style = selectButtonStyle.val();
        const command = selectButtonCommand.val();

        const request = {
                name: bName,
                style: style,
                command: command,
                text: text
        };

        var resp = Manager.createObject("buttons", request);
        resp.done(function (res) {
            console.log(res);
        });
    });

});