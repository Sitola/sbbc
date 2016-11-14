/**
 * Created by pstanko on 10/19/16.
 */

var elems = document.getElementsByClassName("timer");

var timer = new Timer(elems[0]);

ContentGenerator.generateTerminal('#terminal');

ContentGenerator.generateStyle(
  function(out) {
    $("<style>").text(out).appendTo('head');
  });
ContentGenerator.generateButtonActions(
  function(data) {
    console.log("[STDOUT]", data.stdout);
    if (data.stderr) {

      console.error("[STDERR]", data.stderr);
    }
  });

if (!window.terminal) {
  try {
    window.terminal = new Terminal();
  }
  catch (e) {
    window.terminal = {
      out: function() {},
      err: function() {}
    };
  }
}


window.wsClient = new WebSocketClient();

window.wsClient.on('stdout', function(msg) {
  var data = msg.data;
  var pid = msg.pid;
  var out = "[OUT] (" + pid + "): " + data;
  window.terminal.out(out);
});

window.wsClient.on('stderr', function(msg) {
  var data = msg.data;
  var pid = msg.pid;
  var out = "[ERR] (" + pid + "): " + data;
  window.terminal.out(out);

});

window.wsClient.on('proc_close', function(msg) {
  var data = msg.data;
  var pid = msg.pid;
  var name = msg.name;
  var btnID = msg.buttonId;
  var button = $("#"+ btnID);
  var out = "[CLOSE] (" + pid + ")[" + name + "]: Program exited!";
  window.terminal.out(out);
  ContentGenerator.setStyleNormal(ContentGenerator.buttons[btnID],button);

  if(name == "Process_recording"){
    timer.reset();
    timer.stop();
  }

});

window.wsClient.on('proc_start', function(msg) {
  var data = msg.data;
  var pid = msg.pid;
  var name = msg.name;
  var out = "[START] (" + pid + ")[" + name + "]: Program started.";
  var btnID = msg.buttonId;
  var button = $("#" + btnID);
  window.terminal.out(out);

  ContentGenerator.setStyleClicked(ContentGenerator.buttons[btnID],button);

  // id of component that should be invoked
  if(name == "demo_Record"){
    timer.start();
  }

});

window.wsClient.on('echo', function(msg) {
  var data = msg.data;
  var pid = msg.pid;
  var out = "[OUT] (" + pid + "): " + data;
  window.terminal.out(out);
  window.wsClient.send(msg);
});


