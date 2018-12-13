/**
 * Created by wermington on 7/8/16.
 */


const ContentGenerator = {

  buttons: {},

  generateTerminal(elemId)
  {
    "use strict";
    const elemTerm = $(elemId);

    if (!elemTerm) {
      console.error("No terminal ready!");
    }

    window.terminal = new Terminal(elemTerm);
    console.log('[GENERATE] Terminal');

  },
  generateStyle(callback)
  {
    "use strict";
    const resp = Manager.getCollection("styles");
    console.log('[GENERATE] Styles');
    resp.handle(
      function(styles) {
        var out = "";
        for (var style in styles) {
          console.log("[STYLE] ", style);
          if (styles.hasOwnProperty(style)) {
            const obj = styles[style];
            out += `${Tools.generateCss(obj.className, obj.css)}\n`;
          }
        }
        //console.log("[OUT] ", out);
        callback(out);
      });
  },

  appendStyle(button, elem, type)
  {
    if (type == "clicked") {
      ContentGenerator.setStyleClicked(button, elem);
    } else {
      ContentGenerator.setStyleNormal(button, elem);
    }
  },

  setStyleNormal(button, elem)
  {
    "use strict";
    if(button.styleClicked) {
      const respClicked = Manager.getObject("style", button.styleClicked);
      respClicked.handle(function(styleClicked) {
        elem.removeClass(styleClicked.className);
      });
    }

    const resp = Manager.getObject("style", button.style);
    resp.handle(
      function(styleNormal) {
        elem.addClass(styleNormal.className);
      }
    );

  },

  setStyleClicked(button, elem)
  {
    "use strict";
    if(!button.styleClicked) return;
    const respNormal = Manager.getObject("style", button.style);
    respNormal.handle(function(styleNormal) {
      elem.removeClass(styleNormal.className);
    });

    const resp = Manager.getObject("style", button.styleClicked);
    resp.handle(
      function(styleClicked) {
        elem.addClass(styleClicked.className);
      }
    );
  },

  invertColors(elem) {
    var bgColor = 'background-color';
    var fgColor = 'color';
    var bg = elem.css(bgColor);
    var fg = elem.css(fgColor);

    elem.css(bgColor, fg);
    elem.css(fgColor, bg);
  },

  generateButtonActions(callback)
  {
    "use strict";
    const btnResp = Manager.getCollection("buttons");
    btnResp.handle(
      function(buttons) {
        ContentGenerator.buttons = buttons;
        for (const key in buttons) {
          if (buttons.hasOwnProperty(key)) {
            const button = buttons[key];
            const buttElem = $("#" + button.id);
            if (!buttElem) {
              continue;
            }

            ContentGenerator.setStyleNormal(button, buttElem);
            buttElem.text(button.value);

            if (button.javascript) {
              eval(button.javascript);
            }

            buttElem.click(
              function() {
                var actionExec = button.action;
                console.log("[GENERATE] Adding action id:", actionExec);
                Manager.executeCommand({exec: actionExec, buttonId: button.id});
              });
          }
        }
      });
  }
};

