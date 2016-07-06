"use strict";

var _global = require("./src/global");

var glob = _interopRequireWildcard(_global);

var _config = require("./src/config");

var configure = _interopRequireWildcard(_config);

var _routing = require("./src/routing");

var routing = _interopRequireWildcard(_routing);

var _websocket = require("./src/websocket");

var WebSocket = _interopRequireWildcard(_websocket);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var app = glob.app;
app = configure.applyConfig(app);
app = routing.applyRouting(app);
app = WebSocket.applyWebSocket(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports.app = app;

//# sourceMappingURL=app-compiled.js.map