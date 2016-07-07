# SBBC


### Install
 * `npm install`
 * `npm run babel-server`
 * `npm run babel-client`

    or just run
 * `./install.sh`


### Run

 * `npm run start`
 or
 * `node bin/www`


### Runtime:
Server will run at port: **5000**
* `http://localhost:5000/admin/` -- Administration page *(TODO)*
* `http://localhost:5000/demo/` -- Demo application *(TODO)*
* `http://localhost:5000/tests/` -- Unit Tests *(Almost done)*


### Structure:
 * `bin/www` -- main application starter
 * `lib/` -- output of **bablel** - translated **es6**
 * `src/` -- main sources of **express**
 * `src/routes/` -- routes for **express**
 * `src/manager.js` -- main _Manager_ -- most of interesting part
 * `src/websocket.js` -- _TODO_
 * `public/` -- public resources -- javascript and styles
 * `public/js/{src,lib}` -- sources and compiled client javascript
 * `resources/` -- project resources
 * `resources/lists/` -- files are containing JSON DB for each button, style, action and layout
 * `resources/layouts/` -- layouts (In Progress) -- only one - DEMO

### Layouts:
 * Just one - DEMO -- IN PROGRESS

### API ENDPOINTS:
 * `[GET] /api/` -- Nothing to do
 * `[PUT] /api/create/`  -- create Object
 * `[PUT] /api/update/`  -- update Object
 * `[DELETE] /api/delete/` -- Delete Object
 * `[POST] /api/exec/` -- **Execute command** - wait for end of execution
 * `[GET] /api/styles` -- return collection of styles
 * `[GET] /api/style/:id` -- select style with **id**
 * `[GET] /api/{buttons,layouts,actions}` -- same as **styles**
 * `[GET] /api/{button,layout, action}/:id` -- same as **style**


 ### Project status:

 * **Layouts** - _UNSUPPORTED_
 * **API** - _Almost Done_
 * **Edit** - _In Progress_
 * **Admin** - _In Progress_




