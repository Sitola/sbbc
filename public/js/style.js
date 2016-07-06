/**
 * Created by wermington on 6/5/16.
 */



$(function ()
  {

      var editor_css = ace.edit("textCssStyle");
      editor_css.setTheme("ace/theme/twilight");
      editor_css.session.setMode("ace/mode/css");
      document.getElementById('textCssStyle').style.fontSize = '15px';

      var textStyleName = $("#textStyleName");
      var textStyleClass = $("#textStyleClass");
      var textCssStyle = $("#textCssStyle");


      var buttonPrev = $("#buttonPreview");
      var button = $("#styledButton");

      var btnPrevClick = $("#prevClickButton");
      var btnSaveClick = $("#saveClickButton");
      var previewStyle = $("#previewStyle");


      btnPrevClick.click(
          function (e)
          {
              var css_text = editor_css.getValue();
              var styleClass = textStyleClass.val();
              console.log("Setting style [%s] to: %s", styleClass, css_text);

              button.addClass(styleClass);
              previewStyle.text("\n" + css_text + "\n");
          });


      btnSaveClick.click(
          function (e)
          {
              var css_text = editor_css.getValue();
              var styleClass = textStyleClass.val();
              var styleName = textStyleName.val();
              var description = "";


              const request = {
                  id: removeSpaces(styleName),
                  name: styleName,
                  description: description,
                  css: css_text,
                  className: styleName
              };

              var resp = restClient.createObject("style", request);

              if(resp)
              {
                    console.log(resp);
              }

          });

  });