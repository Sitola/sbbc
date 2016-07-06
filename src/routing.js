/**
 * Created by wermington on 7/4/16.
 */

const routes = require('../routes/index');
const users = require('../routes/users');
const admin = require('../routes/admin');
const api = require('../routes/api');
const control = require('../routes/control');
const tests = require('../routes/tests');


export function applyRouting(app)
{
    app.use('/', routes);
    app.use('/users', users);
    app.use('/api', api);
    app.use('/control', control);
    app.use('/admin', admin);
    app.use('/tests', tests);
    return app;
}

