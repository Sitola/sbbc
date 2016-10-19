/**
 * Created by wermington on 6/5/16.
 */
/**
 * Created by wermington on 6/5/16.
 */

$(function() {

  const buttonName = $("#buttonName");
  const buttonText = $("#buttonText");
  const saveButton = $("#saveButton");
  const categoryName = $("#categoryName");

  const compStyle = new SelectComponent("#selectButtonStyle", "style");
  const compStyleClicked = new SelectComponent("#selectButtonStyleClicked", "style");
  const compAction = new SelectComponent("#selectButtonCommand", "action");

  compStyle.getContent();
  compAction.getContent();
  compStyleClicked.getContent();

  function saveButtonClicked() {
    const bName = buttonName.val();
    const category = categoryName.val();
    const id = Tools.removeSpaces(bName);
    const text = buttonText.val();
    const style = compStyle.getSelectedId();
    const action = compAction.getSelectedId();
    const styleClicked = compStyleClicked.getSelectedId();

    const request = {
      id: id,
      name: bName,
      description: "",
      style: style,
      styleClicked: styleClicked,
      action: action,
      value: text,
      category: category
    };

    var resp = Manager.createObject("buttons", request);
    resp.handle(function(res) {
      console.log(res);
    });
  }

  saveButton.click(saveButtonClicked);

});