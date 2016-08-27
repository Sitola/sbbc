/**
 * Created by pstanko on 7/4/16.
 */

import {manager, debug} from './global';
import winston from 'winston';
import {WSConnection} from "./ws/WSConnection";

export default function(app) {
  winston.info('[WEBSOCKET] Listening on \"/ws\".');
  app.ws('/ws', function(ws, req) {
    const connection = new WSConnection(ws);
    const echo = {type: 'echo', data: 'ECHO!!!!!'};

    connection.send(echo);

    connection.on('echo',
    function(data) {
      winston.debug("[WS_ECHO]: %s", data);
      connection.send(data);
    });
  });

  app.get('/ws', function(req, res) {
    res.send('OK');
    winston.debug('>>>>> HELLO');
  });

  return app;
}



