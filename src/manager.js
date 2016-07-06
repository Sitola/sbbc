/**
 * Created by wermington on 6/5/16.
 */

import * as fs from "fs";
import * as util from "util";
import {debug} from "./global"

export class ManagerResponse
{
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

export class ManagerException extends ManagerResponse{
    constructor(msg, next)
    {
        super(msg, next);
        this.type = "exception"
    }


}

export class ManagerError extends ManagerException {
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

export class ManagerWarning extends ManagerException {
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

export class ManagerInfo extends ManagerException {
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
            var data =fs.readFileSync(path, 'utf8').toString();
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

        console.info("Loading lists file: \"%s\"", path);
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
        this.collections = {
            styles: Loader.loadList(Types.STYLES),
            commands: Loader.loadList(Types.ACTIONS),
            buttons: Loader.loadList(Types.BUTTONS),
            layouts: Loader.loadList(Types.LAYOUTS)
        };
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
            throw new ManagerWarning(" Object \"" + id + "\" not exists in \"" + type + "\"");
        }

        this.deleteCollection(type, id);
    };


    createObject(type, obj)
    {
        debug("Creating \"%s\": ", type, obj);

        if (this.getObject(type, obj.id)) {
            throw new ManagerWarning(" Object \"" + obj.id + "\" already exists in \"" + type + "\"");
        }

        this.addCollection(type, obj);
    }

    updateObject(type, obj)
    {
        debug("Updating object \"%s\" in [%s]: ", obj.id, type, obj);
        if (this.getObject(type, obj.id) == null) {
            throw new ManagerWarning(" Object \"" + obj.id + "\" not exists in \"" + type + "\"");
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
            throw new ManagerError("Cannot find collection: " + name);
        }
        else {
            console.log("Sending %s collection.", name);
            debug("Sending object: ", obj);
            return obj;
        }
    };
}




