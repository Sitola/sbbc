/**
 * Created by pstanko on 7/4/16.
 */

export default function(app) {
    console.info('[WEBSOCKET] Listening on \"/ws\".');
    app.ws('/ws', function(ws, req) {
        ws.on('message', function(msg) {
            ws.send(msg);
            console.log('[WEBSOCKET] Message has been sent: ', msg);
        });
        console.log('socket', req.testing);
    });

    app.get('/ws', function (req, res) {
       res.send('Hello.');
        console.log('>>>>> HELLO');
    });

    return app;
}



