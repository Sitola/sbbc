/**
 * Created by wermington on 6/5/16.
 */



$(function ()
  {
      var editorCSS = ace.edit("textCssStyle");
      editorCSS.$blockScrolling = 1;
      editorCSS.setTheme("ace/theme/twilight");
      editorCSS.session.setMode("ace/mode/css");
      document.getElementById('textCssStyle').style.fontSize = '15px';

      const textStyleName = $("#textStyleName");
      const textStyleClass = $("#textStyleClass");
      const textCssStyle = $("#textCssStyle");

      const button = $("#styledButton");

      const btnPrevClick = $("#prevClickButton");
      const btnSaveClick = $("#saveClickButton");
      const previewStyle = $("#previewStyle");


      function updatePrevButton()
      {
          const css_text = editorCSS.getValue();
          const styleClass = textStyleClass.val();
          button.addClass(styleClass);
          previewStyle.text("\n" + css_text + "\n");
      }

      function saveButtonClick()
      {
          const cssText = (editorCSS.getValue());
          const styleClass = textStyleClass.val();
          const styleName = textStyleName.val();
          const description = "";
          const cleanCss = Tools.cleanCss(cssText);
          const id = Tools.removeSpaces(styleName);

          const request = {
              id: id,
              name: styleName,
              description: description,
              css: cleanCss,
              className: styleClass
          };

          const resp = Manager.createObject("styles", request);
          resp.handle(
              function (res)
              {
                  console.info(res);
              });
      }

      function styleClassChange()
      {
          "use strict";
          const css = editorCSS.getValue();
          const str = textStyleClass.val();
          const other = Tools.cleanCss(css);
          const out = `.${str} \n{${other}\n}\n`;
          editorCSS.setValue(out, 1);
      }
      
      btnPrevClick.click(updatePrevButton);
      btnSaveClick.click(saveButtonClick);
      textStyleClass.on('input', styleClassChange);
      editorCSS.on('input', updatePrevButton);


  });