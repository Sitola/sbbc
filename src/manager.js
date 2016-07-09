/**
 * Created by wermington on 6/5/16.
 */

import * as fs from "fs";
import * as util from "util";
import {debug} from "./global"
import {exec, spawn} from 'child_process';

var spawnargs = require('spawn-args');



export class DefaultResponse {
    constructor(msg, next)
    {
        this.msg = msg;
        this.next = next;
        this.type = "response"
    }

    message()
    {
        return this.msg;
    }

    out()
    {
        console.log(this.what());
    }

    what()
    {
        var str = util.format("[%s] Exception: %s", this.type, this.msg);
        if (this.next) {
            str += "\n" + this.next.what();
        }
        return str;
    }
}

export class ResponseException extends DefaultResponse {
    constructor(msg, next)
    {
        super(msg, next);
        this.type = "exception"
    }
}

export class ResponseError extends ResponseException {
    constructor(msg, next)
    {
        super(msg, next);
        this.type = "error";
    }

    out()
    {
        console.error(this.what());
    }
}

export class ResponseWarning extends ResponseException {
    constructor(msg, next)
    {
        super(msg, next);
        this.type = "warning";
    }

    out()
    {
        console.warn(this.what());
    }
}

export class ResponseInfo extends ResponseException {
    constructor(msg, next)
    {
        super(msg, next);
        this.type = "info";
    }

    out()
    {
        console.info(this.what());
    }
}

var Loader = {

    resourcesPath: "resources/",
    listsPath: "lists/",
    cssPath: "styles/",

    loadJson: function (path)
    {

        try {
            var data = fs.readFileSync(path, 'utf8').toString();
            debug(" [READ] File [%s] content: ", path, data);
            const parsedJson = JSON.parse(data);
            debug("Parsed json: ", parsedJson);
            return parsedJson;
        } catch (e) {
            console.error(e);
            return {};
        }
    },

    saveJson: function (path, json)
    {
        debug("Saving json [" + path + "]: ", json);
        var string = JSON.stringify(json, null, 2);
        fs.writeFile(path, string);
    },

    loadList: function (name)
    {
        var basePath = Loader.resourcesPath + Loader.listsPath;
        var path = basePath + name + ".json";

        debug("[LIST] Loading lists file: \"%s\"", path);
        const loadJson = Loader.loadJson(path);
        debug("[LIST] %s: ", name, loadJson);
        return loadJson;
    },

    saveList: function (name, object)
    {
        var basePath = Loader.resourcesPath + Loader.listsPath;
        var path = basePath + name + ".json";
        console.info("Saving lists file: \"%s\"", path);
        Loader.saveJson(path, object)
    }
};

export const Types = {
    STYLES: "styles",
    ACTIONS: "actions",
    BUTTONS: "buttons",
    LAYOUTS: "layouts"
};

export class Manager {

    constructor()
    {
        const _this = this;
        this.collections = {
            styles: Loader.loadList(Types.STYLES),
            actions: Loader.loadList(Types.ACTIONS),
            buttons: Loader.loadList(Types.BUTTONS),
            layouts: Loader.loadList(Types.LAYOUTS),
            generates: {
                styles: null
            }
        };
    }

    generateScript()
    {
        var out = `$(function() {`;
        var collection = this.collections.buttons;
        for (var key in collection) {
            if (collection.hasOwnProperty(key)) {
                const obj = collection[key];
                const objStyle = obj.style;
                out += ` 
                var intern_${key} = $(\"#${key}\");\n
                intern_${key}.addClass('${objStyle}');\n
                intern_${key}.click(function()\n
                {\n
                    console.log("[CLICK] ${key} clicked: ${obj.action}");
                    var response = Manager.executeCommand({exec: \"${obj.action}\" });\n
                    response.handle(function (msg)\n
                    {\n
                        \nconst output = Tools.removeNewLine(msg.stdout);
                        \nconst err = Tools.removeNewLine(msg.stderr);
                        \nconsole.log("STDOUT: %s", output);
                        \nif(err || err != "")
                        \n{
                            \nconsole.warn("STDERR: %s", err);
                        \n}
                    \n});                    
                \n});\n\n`;
            }
        }

        out += `});`;
        return out;
    }


    generateStyles()
    {
        var out = "";
        var collection = this.collections.styles;

        for (var key in collection) {
            if (collection.hasOwnProperty(key)) {
                const obj = collection[key];
                const clsName = obj.className;
                const css = obj.css;
                out += "\n ." + clsName + " {\n" + css + "\n}\n\n";
            }
        }
        return out;
    }
    
    generate(select)
    {
        debug('[GENERATE] Called: (%s)', select);
        var out = null;
        switch (select) {
            case "style":
                out = this.generateStyles();
                break;
            case "script":
                out = this.generateScript();
                break;
        }
        return out;
    }


    executeAsync(command, callback)
    {
        try {
            const cmd=  command.substr(0, command.indexOf(' '));
            const tmp=  command.substr(command.indexOf(' '), command.length);
            const args = spawnargs(tmp);
            console.info("[EXEC]: %s ", cmd, args);
            const child = spawn(cmd, args);
            var result = '';
            child.stdout.on('data', function (data)
            {
                if (callback) {
                    callback("out", data);
                    debug("[STDOUT]: %s", data);

                }
            });
            child.stderr.on('data', function (data)
            {
                if (callback) {
                    callback("err", data);
                    debug("[STDERR]: %s", data);
                }
            });
            child.on('close', function (code)
            {
                return callback("close", result);
            });
        }catch(e)
        {
            console.error("[EXEC] Error:", e);
        }
    }


    executeSync(command, callback)
    {
        const child = exec(command, function (error, stdout, stderr)
        {
            var commandRes = {
                stdout: stdout,
                stderr: stderr
            };

            if (error) {
                callback(ResponseError("Error: " + error));
            }

            var managerInfo = new DefaultResponse(commandRes);
            callback(managerInfo);
        });
    }


    execute(id, callback)
    {
        const cmd = this.getObject("actions", id);

        if (!cmd) {
            throw new ResponseError("No command was found with id: " + id);
        }

        if(cmd.async)
        {
            callback(new DefaultResponse("Process started at background: ["+ cmd.action +"]"));
            this.executeAsync(cmd.action, null);
        }else
        {
            this.executeSync(cmd.action, callback);
        }

    }

    getObject(type, name)
    {
        debug("Requested object [%s] from %s", name, type);
        const collection = this.getCollection(type);
        const obj = collection[name];

        if (!obj) {
            debug("Object [%s] not found!", name);
            return null;
        }

        return obj;
    };


    deleteObject(type, id)
    {
        debug("Deleting %s from \"%s\". ", id, type);

        if (this.getObject(type, id) == null) {
            throw new ResponseWarning(" Object \"" + id + "\" not exists in \"" + type + "\"");
        }

        this.deleteCollection(type, id);
    };


    createObject(type, obj)
    {
        debug("Creating \"%s\": ", type, obj);

        if (this.getObject(type, obj.id)) {
            throw new ResponseWarning(" Object \"" + obj.id + "\" already exists in \"" + type + "\"");
        }

        this.addCollection(type, obj);
    }

    updateObject(type, obj)
    {
        debug("Updating object \"%s\" in [%s]: ", obj.id, type, obj);
        if (this.getObject(type, obj.id) == null) {
            throw new ResponseWarning(" Object \"" + obj.id + "\" not exists in \"" + type + "\"");
        }

        this.updateCollection(type, obj);
    }

    addCollection(type, obj)
    {
        var collection = this.getCollection(type);
        collection[obj.id] = obj;
        Loader.saveList(type, collection);
    };

    deleteCollection(type, id)
    {
        var collection = this.getCollection(type);
        delete collection[id];
        Loader.saveList(type, collection);
    };


    updateCollection(type, obj)
    {
        this.deleteCollection(type, obj.id);
        this.addCollection(type, obj);
    };

    getCollection(name)
    {
        const obj = this.collections[name];
        if (!obj) {
            throw new ResponseError("Cannot find collection: " + name);
        }
        else {
            console.log("Sending %s collection.", name);
            return obj;
        }
    };
}




