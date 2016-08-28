/**
 * Created by pstanko on 7/4/16.
 */

import {manager} from './global';
import winston from 'winston';
import {WSConnection} from "./ws/WSConnection";
import {} from './utils/execution';


class WSSender {

  constructor(name, conn) {
    this.name = name;
    this.conn = conn;
    const _this = this;
    this.config = {
      stdout: function(data) {
        _this.sendStdOut(data.toString('utf8'));
      },
      stderr: function(data) {
        _this.sendStdErr(data.toString('utf8'));
      },
      close: function() {
        _this.sendClose()
      },
      start: function(data) {
        _this.sendStart(data);
      }
    };

    this.exec = manager.execute(this.name, this.config);
    this.config.start(this.exec);
    }

  sendStdDefault(data, type) {
    const obj = {
      type: type,
      pid: this.exec.process.pid,
      data: data
    };

    this.conn.send(obj);
  }

  sendStdOut(data) {
    return this.sendStdDefault(data, "stdout");
  }

  sendStdErr(data) {
    return this.sendStdDefault(data, "stderr");
  }

  sendState() {
    return this.sendStdDefault(this.exec.state, "proc_state");
  }

  sendStart()
  {
    return this.sendStdDefault("Start", "proc_start");
  }

  sendClose()
  {
    return this.sendStdDefault("Close", "proc_close");
  }

}


export default function(app) {
  winston.info('[WEBSOCKET] Listening on \"/ws\".');
  app.ws('/ws', function(ws, req) {
    const connection = new WSConnection(ws);
    const echo = {type: 'echo', data: 'ECHO!!!!!'};

    connection.on('echo',
                  function(data) {
                    winston.debug("[WS_ECHO]: %s", data);
                   // connection.send(data);
                  });

    connection.on('exec',
                  function(msg) {
                    if (!msg.data) {
                      return;
                    }
                    const cmd = msg.data.exec;
                    const handle = new WSSender(cmd, connection);
                  });

  });


  app.get('/ws', function(req, res) {
    res.send('OK');
    winston.debug('>>>>> HELLO');
  });

  return app;
}



