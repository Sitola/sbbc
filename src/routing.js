/**
 * Created by wermington on 7/4/16.
 */

import routes from './routes/index';
import users from './routes/users';
import admin from './routes/admin';
import api from './routes/api';
import control  from './routes/control';
import tests from './routes/tests';
import out from "./routes/out";
import generate from "./routes/generate";


export default function(app)
{
    app.use('/', routes);
    app.use('/users', users);
    app.use('/api', api);
    app.use('/control', control);
    app.use('/admin', admin);
    app.use('/tests', tests);
    app.use('/out', out);
    app.use('/generate', generate);

    return app;
}

