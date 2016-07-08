/**
 * Created by wermington on 6/5/16.
 */
/**
 * Created by wermington on 6/5/16.
 */

$(function () {

    const buttonName = $("#buttonName");
    const buttonText = $("#buttonText");
    const saveButton = $("#saveButton");

    const compStyle = new SelectComponent("#selectButtonStyle", "style");
    const compAction = new SelectComponent("#selectButtonCommand", "action");

    compStyle.getContent();
    compAction.getContent();

    function saveButtonClicked()
    {
        const bName = buttonName.val();
        const id =  Tools.removeSpaces(bName);
        const text = buttonText.val();
        const style = compStyle.getSelectedId();
        const action = compAction.getSelectedId();

        const request = {
            id : id,
            name: bName,
            description:  "",
            style: style,
            action: action,
            value: text
        };

        var resp = Manager.createObject("buttons", request);
        resp.handle(function (res) {
            console.log(res);
        });
    }

    saveButton.click(saveButtonClicked);

});