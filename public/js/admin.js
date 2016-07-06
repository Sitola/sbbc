


$(function () {

    var editor_css = ace.edit("text_css_style");
    editor_css.setTheme("ace/theme/twilight");
    editor_css.session.setMode("ace/mode/css");
    document.getElementById('text_css_style').style.fontSize='15px';


    var editor_command = ace.edit("text_command");
    editor_command.setTheme("ace/theme/twilight");
    editor_command.session.setMode("ace/mode/sh");
    document.getElementById('text_command').style.fontSize='20px';
    
   
    $("#btn_create").click(function (e) {
        var name = $('#txt_name').val();
        var css_text = editor_css.getValue();
        var cmd_text = editor_command.getValue();

        var url = "/api/command/add";

        var data = {
            id: removeSpaces(name),
            name: name,
            css : css_text,
            cmd : cmd_text
        };

        $.post(url, data).done(function (result) {
            console.info(result);
        })

    });

});
