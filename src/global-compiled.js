/**
 * Created by wermington on 7/4/16.
 */

/*
 * Exported modules
 */

const express = require('express');
var logger = require('morgan');
var http = require('http');

module.exports.express = express;
module.exports.logger = logger;
module.exports.expressWS = require('express-ws');
module.exports.debug = require('debug')("sbbc");
module.exports.http = http;

/*
 *  export implementation
 */

module.exports.app = express();

//# sourceMappingURL=global-compiled.js.map