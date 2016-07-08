/**
 * Created by wermington on 7/8/16.
 */


const ContentGenerator = {
    generateStyle(callback) {
        "use strict";
        const resp = Manager.getCollection("styles");
        console.log('Generating styles');
        resp.handle(
            function (styles)
            {
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

    appendStyle(button, elem)
    {
        "use strict";
        const resp = Manager.getObject("style", button.style);
        resp.handle(
            function (style)
            {
                elem.addClass(style.className);
            }
        )
    },

    generateButtonActions(callback)
    {
        "use strict";
        const btnResp = Manager.getCollection("buttons");
        btnResp.handle(
            function (buttons)
            {
                for (const key in buttons) {
                    if (buttons.hasOwnProperty(key)) {
                        const button = buttons[key];
                        const buttElem = $("#" + button.id);
                        if (!buttElem) {
                            continue;
                        }
                        {
                            ContentGenerator.appendStyle(button, buttElem);
                            buttElem.text(button.value);
                            buttElem.click(
                                function ()
                                {
                                    var actionExec = button.action;
                                    console.log("Adding action id:", actionExec);
                                    const execResp =
                                        Manager.executeCommand({ exec: actionExec});

                                    execResp.handle(
                                        function (resp)
                                        {
                                            callback(resp);
                                        }
                                    );
                                });
                        }
                    }
                }
            });
    }
};

