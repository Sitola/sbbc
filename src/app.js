import * as glob from "./global"
import configure from "./config";
import routing from "./routing";
import WebSocket from "./websocket";


let app = glob.app;
app = configure(app);
app = routing(app);
app = WebSocket(app);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);
app.listen(port);

/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

module.exports.app = app;

