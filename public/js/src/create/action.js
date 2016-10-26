$(function() {


  const editorAction = ace.edit("textCommand");
  editorAction.$blockScrolling = 1;
  editorAction.setTheme("ace/theme/twilight");
  editorAction.session.setMode("ace/mode/sh");
  document.getElementById('textCommand').style.fontSize = '15px';


  const editorJavaScript = ace.edit("textJavaScript");
  editorAction.$blockScrolling = 1;
  editorAction.setTheme("ace/theme/twilight");
  editorAction.session.setMode("ace/mode/javascript");
  document.getElementById('textJavaScript').style.fontSize = '15px';

  const actionName = $("#actionName");
  const saveButton = $("#saveButton");

  function saveButtonClick() {
    "use strict";
    const action = new Action();
    action.name = actionName.val();
    action.command = editorAction.getValue();
    action.javascript = editorJavaScript.getValue();
    action.description = "";
    action.id = action.generateId();

    var resp = Manager.createObject("actions", action);
    resp.handle(
      function(res) {
        console.info(res);
      });
  }

  saveButton.click(saveButtonClick);
});