/**
 * Created by wermington on 8/27/16.
 */


class Terminal
{
  constructor(name, config)
  {
    name = name || "terminal";

    this.elem = $(name);
    this.config = config;

    if(!this.elem)
    {
      console.error('No element named terminal!');
      this.elem = $(`<div id='${name}}'></div>`);
      $('body').append(this.elem);
    }

    const outCss = {
      margin: "10 px auto",
      width: "90%",
      height: "400px",
      border: "1px solid black",
      overflow: "scroll"
    };


    this.output = $('<div id="terminal-output"></div>');
    this.output.css(outCss);

    this.elem.append(this.output);
  }


  out(string)
  {
    const line = $(`<div class="terminal-line" style="width: 100%"><span></span></div>`);
    line.text(string);
    this.output.append(line);
    console.log(string);
    $("#terminal-output").scrollTop($("#terminal-output")[0].scrollHeight);

  }

  err(string)
  {
    console.error(string);
    this.out(string);
  }


}



