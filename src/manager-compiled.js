/**
 * Created by wermington on 6/5/16.
 */

var fs = require('fs');
var util = require('util');

var Loader = {

    resourcesPath: "resources/",
    listsPath: "lists/",
    cssPath: "styles/",

    saveCss: function (name, text) {
        var path = Loader.resourcesPath + Loader.cssPath + name + ".css";
        console.log("Saving css file: [%s] to [%s]", name, path);
        fs.writeFile(path, text);
    },

    deleteCss: function (name) {
        var path = Loader.resourcesPath + Loader.cssPath + name + ".css";
        fs.unlink(path);
    },

    loadJson: function (path) {
        fs.readFile(path, function (err, data) {
            if (err) {
                console.error(err);
                return null;
            }
            try {
                return JSON.parse(data);
            } catch (e) {
                console.error(e);
                return {};
            }
        });
    },

    saveJson: function (path, json) {
        console.log("Saving json [" + path + "]: ", json);
        var string = JSON.stringify(json);
        fs.writeFile(path, string);
    },

    loadList: function (name) {
        var basePath = Loader.resourcesPath + Loader.listsPath;
        var path = basePath + name + ".json";

        console.info("Loading lists file: \"%s\"", path);
        return Loader.loadJson(path);
    },

    saveList: function (name, object) {
        var basePath = Loader.resourcesPath + Loader.listsPath;
        var path = basePath + name + ".json";
        console.info("Saving lists file: \"%s\"", path);
        Loader.saveJson(path, object);
    }
};

var manager = function () {

    this.stylesCollection = Loader.loadList("styles");
    this.commandsCollection = Loader.loadList("commands");
    this.buttonsCollection = Loader.loadList("buttons"); // TODO
    this.layoutsCollection = Loader.loadList("layouts"); // TODO

    this.createStyle = function (req) {
        var obj = req.body.data;

        console.log("Style name: %s", obj.name);
        console.log("Class name: %s", obj.className);
        console.log("Style text: %s", obj.css);

        if (this.stylesCollection == null) {
            console.log("Style was null");
            this.stylesCollection = {};
        }

        if (this.stylesCollection.hasOwnProperty(obj.className)) {
            var err = util.format("Style class with name: \"%s\" already exists.", obj.className);
            console.warn(err);
            return err;
        }

        this.stylesCollection[obj.className] = obj;
        Loader.saveList("styles", this.stylesCollection);
        return "Style saved successfully";
    };

    this.createCommand = function (req) {
        const obj = req.data;

        if (this.commandsCollection.hasOwnProperty(obj.name)) {
            var err = util.format("Action with name: \"%s\" already exists.", obj.name);
            console.warn(err);
            throw err;
        }

        console.log("Added new command: \"%s\": %s", obj.name, obj.commandText);
        this.commandsCollection[out.name] = obj;
        Loader.saveList("command", this.commandsCollection);
        return 0;
    };

    this.createButton = function (req) {
        var obj = req.body.data;

        if (this.buttonsCollection.hasOwnProperty(obj.buttonName)) {
            var err = util.format("Button with name: \"%s\" already exists.", obj.buttonName);
            console.warn(err);
            throw err;
        }

        console.log('Added new button: %s: ', obj.name, obj);

        this.buttonsCollection[obj.buttonName] = obj;
        Loader.saveList("command", this.commandsCollection);
        return 0;
    };

    this.getStyle = function (id) {
        var style = this.stylesCollection[id];
        if (!style) {
            return null;
        }
        return JSON.stringify(style);
    };

    this.getStyles = function () {
        return JSON.stringify(this.stylesCollection);
    };

    this.getCommands = function () {
        return JSON.stringify(this.commandsCollection);
    };

    this.getButtons = function () {
        return JSON.stringify(this.buttonsCollection);
    };

    this.getLayouts = function () {
        return JSON.stringify(this.layoutsCollection);
    };

    this.getCommand = function (id) {
        var command = this.commandsCollection[id];
        if (!command) {
            return null;
        }
        return JSON.stringify(command);
    };

    this.getButton = function (id) {
        var btn = this.buttonsCollection[id];
        if (!btn) {
            return null;
        }
        return JSON.stringify(btn);
    };

    this.getLayout = function (id) {
        var layout = this.layoutsCollection[id];
        if (!layout) {
            return null;
        }
        return JSON.stringify(layout);
    };

    this.deleteCss = function (req) {};

    this.creators = {
        style: this.getStyle,
        command: this.createCommand,
        button: this.createButton
    };

    this.getters = {
        style: this.getStyle,
        command: this.getCommand,
        button: this.getButton,
        layout: this.getLayout
    };
};

module.exports = manager;

//# sourceMappingURL=manager-compiled.js.map