
/**
 * Created by wermington on 7/4/16.
 */

const glob = require('./global');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const express = glob.express;
const logger = glob.logger;

function applyConfig(app) {
    var eWS = glob.expressWS(app);
    app = eWS.app;

    app.use(function (req, res, next) {
        console.log('middleware');
        req.testing = 'testing';
        return next();
    });

    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '..', 'public')));

    return app;
}

// view engine setup

module.exports = applyConfig;

//# sourceMappingURL=config-compiled.js.map