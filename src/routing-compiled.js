/**
 * Created by wermington on 7/4/16.
 */

const routes = require('.././index');
const users = require('.././users');
const admin = require('.././admin');
const api = require('.././api');
const control = require('.././control');
const tests = require('.././tests');

function applyRouting(app) {
    app.use('/', routes);
    app.use('/users', users);
    app.use('/api', api);
    app.use('/control', control);
    app.use('/admin', admin);
    app.use('/tests', tests);
    return app;
}

module.exports = applyRouting;

//# sourceMappingURL=routing-compiled.js.map