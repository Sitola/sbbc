$(function ()
  {


      var editorAction = ace.edit("textCommand");
      editorAction.$blockScrolling = 1;
      editorAction.setTheme("ace/theme/twilight");
      editorAction.session.setMode("ace/mode/sh");
      document.getElementById('textCommand').style.fontSize = '15px';

      const actionName = $("#actionName");
      const saveButton = $("#saveButton");
      const runAsync = $("#runAsync");

      function saveButtonClick()
      {
          "use strict";
          const aName = actionName.val();
          const command = editorAction.getValue();
          const description = "";
          const id = Tools.removeSpaces(aName);
          const async = runAsync.is(':checked');


          const request = {
              id: id,
              name: aName,
              description: description,
              action: command,
              async: async
          };

          var resp = Manager.createObject("actions", request);
          resp.handle(
              function (res)
              {
                  console.info(res);
              });
      }

      saveButton.click(saveButtonClick);
  });