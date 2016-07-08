/**
 * Created by wermington on 7/8/16.
 */


$(function ()
  {
      const parent = $(".componentContainer");
      const component = new SelectComponent("styleComponent", "style", parent);
      component.listen(fillForm);

      var editorCSS = ace.edit("textCssStyle");
      editorCSS.setTheme("ace/theme/twilight");
      editorCSS.session.setMode("ace/mode/css");
      document.getElementById('textCssStyle').style.fontSize = '15px';
      const btnPrevClick = $("#prevClickButton");
      const btnSaveClick = $("#saveClickButton");
      const previewStyle = $("#previewStyle");
      const textStyleName = $("#textStyleName");
      const textStyleClass = $("#textStyleClass");
      const button = $("#styledButton");


      function updatePrevButton()
      {
          const css_text = editorCSS.getValue();
          const styleClass = textStyleClass.val();
          console.log("Setting style [%s] to: %s", styleClass, css_text);
          button.addClass(styleClass);
          previewStyle.text("\n" + css_text + "\n");
      }

      function saveButtonClick()
      {
          "use strict";
          const cssText = (editorCSS.getValue());
          const styleClass = textStyleClass.val();
          const styleName = textStyleName.val();
          const description = "";
          const cleanCss = Tools.cleanCss(cssText);
          const id = component.getSelectedId();
          console.log("[CLEAN]: ", cleanCss);

          const request = {
              id: id,
              name: styleName,
              description: description,
              css: cleanCss,
              className: styleClass
          };

          const resp = Manager.updateObject("styles", request);
          resp.handle(
              function (res)
              {
                  console.info(res);
              });
          component.refresh();
          component.select(id);
      }

      btnPrevClick.click(updatePrevButton);

      btnSaveClick.click(saveButtonClick);
      editorCSS.on('input', updatePrevButton);
      textStyleClass.on('input',styleClassChange);

      function styleClassChange()
      {
          "use strict";
          const css = editorCSS.getValue();
          const str = textStyleClass.val();
          const other = Tools.cleanCss(css);
          const out = `.${str} \n{${other}\n}\n`;
          editorCSS.setValue(out, 1);
      }

      function fillForm(selectedObject)
      {
          "use strict";
          textStyleName.val(selectedObject.name);
          var className = selectedObject.className;
          textStyleClass.val(className);
          const css = selectedObject.css;
          const pretty = Tools.generateCss(className, css);
          editorCSS.setValue(pretty, 1);
          updatePrevButton();
      }
  });