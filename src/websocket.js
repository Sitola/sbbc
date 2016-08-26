/**
 * Created by pstanko on 7/4/16.
 */

import {manager, debug} from './global';
import winston from 'winston';

export default function(app) {
  winston.info('[WEBSOCKET] Listening on \"/ws\".');
  app.ws('/ws', function(ws, req) {
    ws.on('message', function(msg) {
      winston.debug('[WEBSOCKET] Received message: ', msg);



    });
  });

  app.get('/ws', function(req, res) {
    res.send('Hello.');
    winston.debug('>>>>> HELLO');
  });

  return app;
}



