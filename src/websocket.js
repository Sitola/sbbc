/**
 * Created by pstanko on 7/4/16.
 */

import {manager, debug} from './global';

export default function(app) {
    console.info('[WEBSOCKET] Listening on \"/ws\".');
    app.ws('/ws', function(ws, req) {
        ws.on('message', function(msg) {
            if(msg.type == "exec")
            {
                const ex = msg.exec;
                if(ex)
                {
                    manager.executeAsync(ex,
                        function (type, data)
                        {
                            const msg = {
                                type: type,
                                data : data
                            };
                            const sendMsg = JSON.stringify(msg);
                            debug("[WEBSOCKET] Sending message", sendMsg);
                            ws.send(sendMsg);
                        }
                    )
                }
            }
        });
        console.log('socket', req.testing);
    });

    app.get('/ws', function (req, res) {
       res.send('Hello.');
        console.log('>>>>> HELLO');
    });

    return app;
}



