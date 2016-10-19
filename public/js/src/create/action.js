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
    const aName = actionName.val();
    const command = editorAction.getValue();
    const javascr = editorJavaScript.getValue();
    const description = "";
    const id = Tools.removeSpaces(aName);


    const request = {
      id: id,
      name: aName,
      description: description,
      javascript: javascr,
      action: command,

    };

    var resp = Manager.createObject("actions", request);
    resp.handle(
      function(res) {
        console.info(res);
      });
  }

  saveButton.click(saveButtonClick);
});