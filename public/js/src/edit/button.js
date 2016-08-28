/**
 * Created by wermington on 7/8/16.
 */
$(function() {

  var currentEdit = null;
  const parent = $(".componentContainer");
  const component = new SelectComponent("buttonComponent", "button", parent);
  component.listen(fillForm);

  const buttonName = $("#buttonName");
  const buttonText = $("#buttonText");
  const saveButton = $("#saveButton");
  const categoryName = $("#categoryName");

  const compStyle = new SelectComponent("#selectButtonStyle", "style");
  const compAction = new SelectComponent("#selectButtonCommand", "action");


  function saveButtonClicked() {
    const bName = buttonName.val();
    const text = buttonText.val();
    const style = compStyle.getSelectedId();
    const action = compAction.getSelectedId();
    const id = component.getSelectedId();
    const category = categoryName.val() || "default";


    currentEdit = id;

    const request = {
      id: id,
      name: bName,
      description: "",
      style: style,
      action: action,
      value: text,
      category: category
    };

    var resp = Manager.updateObject("buttons", request);
    resp.handle(function(res) {
      console.log(res);
    });
    component.refresh();
    component.select(id);
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
    buttonName.val(selectedObject.name);
    buttonText.val(selectedObject.value);
  }


});