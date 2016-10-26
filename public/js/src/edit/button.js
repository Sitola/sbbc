/**
 * Created by wermington on 7/8/16.
 */
$(function() {

    const parComponent = $("#editComponentSelector");
    var component = null;

    if (parComponent.length) {
        component = new SelectComponent("buttonComponent", "button", parComponent);
        component.listen(fillForm);
    }

    const buttonName = $("#buttonName");
    const buttonText = $("#buttonText");
    const saveButton = $("#saveButton");
    const categoryName = $("#categoryName");

    const compStyle = new SelectComponent("#selectButtonStyle", "style");
    const compAction = new SelectComponent("#selectButtonCommand", "action");
    const compStyleClicked = new SelectComponent("#selectButtonStyleClicked", "style");
    if(!component) {
        compStyle.getContent();
        compAction.getContent();
        compStyleClicked.getContent();
    }


    function saveButtonClicked() {
        const bName = buttonName.val();
        const text = buttonText.val();
        const style = compStyle.getSelectedId();
        const action = compAction.getSelectedId();
        const category = categoryName.val() || "default";
        const styleClicked = compStyleClicked.getSelectedId();


        const request = {
            name: bName,
            description: "",
            style: style,
            action: action,
            value: text,
            category: category,
            styleClicked: styleClicked
        };

        var resp = null;
        if(component) {
            request["id"] = component.getSelectedId();
            resp = Manager.updateObject("buttons", request);
        }
        else{
            request["id"] = Tools.removeSpaces(bName);
            resp = Manager.createObject("buttons", request);
        }

        resp.handle(function(res) {
            console.log(res);
        });

        if (component) {
            component.refresh();
            component.select(id);
        }
    }


    saveButton.click(saveButtonClicked);


    function fillForm(selectedObject) {
        "use strict";
        compStyle.getContent(function() {
            compStyle.select(selectedObject.style);
        });
        compAction.getContent(function() {
            compAction.select(selectedObject.action);
        });

        compStyleClicked.getContent(function() {
            compStyleClicked.select(selectedObject.styleClicked);
        });
        buttonName.val(selectedObject.name);
        buttonText.val(selectedObject.value);
    }


});