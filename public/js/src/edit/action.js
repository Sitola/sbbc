/**
 * Created by wermington on 7/8/16.
 */


$(function ()
  {

      var editorAction = ace.edit("textCommand");
      editorAction.$blockScrolling = 1;
      editorAction.setTheme("ace/theme/twilight");
      editorAction.session.setMode("ace/mode/sh");
      document.getElementById('textCommand').style.fontSize = '15px';

      const parent = $(".componentContainer");
      const component = new SelectComponent("actionComponent", "action", parent);
      component.listen(fillForm);

      const actionName = $("#actionName");
      const saveButton = $("#saveButton");

      function fillForm(selectedObject)
      {
          actionName.val(selectedObject.name);
          editorAction.setValue(selectedObject.action, 1);
      }

      saveButton.click(
          function ()
          {
              const aName = actionName.val();
              const command = editorAction.getValue();
              const description = "";
              const id = component.getSelectedId();

              const request = {
                  id: id,
                  name: aName,
                  description: description,
                  action: command
              };

              var resp = Manager.updateObject("actions", request);
              resp.handle(
                  function (res)
                  {
                      console.info(res);
                  });
              component.refresh();
          });
  });