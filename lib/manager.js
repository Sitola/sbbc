/**
 * Created by wermington on 6/5/16.
 */

var fs = require('fs');


var Loader = {

    resourcesPath : "/resources/",
    listsPath: "lists/",
    cssPath: "css/",

    saveCss: function (name, text) {
        var path = Loader.resourcesPath + Loader.cssPath + name + ".css";
        fs.writeFile(path, text);
    },

    deleteCss: function (name) {
        var path = Loader.resourcesPath + Loader.cssPath + name + ".css";
        fs.unlink(path);
    },
    
    loadJson: function (path) {
      fs.readFile(path, function (err, data) {
          if(err) {
              console.error(err);
              return null
          }

          return JSON.parse(data);
      });
    },

    saveJson: function (path, json) {
        var string  = JSON.stringify(json);
        fs.writeFile(path, string);
    },

    loadList : function (name) {
        var basePath = Loader.resourcesPath + Loader.listsPath;
        var path = basePath + name + ".json";

        console.info("Loading lists file: \"%s\"", path);
        return Loader.loadJson(path);
    },

    saveList : function (name, object) {
        var basepath = Loader.resourcesPath + Loader.listsPath;
        var path = basepath + name + ".json";

        Loader.saveJson(path, object)
    }
};


var manager = function () {

    this.stylesCollection = Loader.loadList("styles");
    this.commandsCollection = Loader.loadList("commands");
    this.buttonsCollection = Loader.loadList("buttons"); // TODO
    this.layoutsCollection = Loader.loadList("layouts"); // TODO

    this.creators = {
        style : this.createStyle,
        command : this.createCommand,
        button: this.createButton
    };

    this.getters ={
        style : this.getStyle,
        command : this.getCommand,
        button : this.getButton,
        layout: this.getlayout
    };
    
    this.createStyle = function (req) {
        var styleName = req.body.name;
        var className = req.body.className;
        var styleText = req.body.css;

        var selStyle = this.stylesCollection[styleName];

        if(selStyle)
        {
            console.warn("Style class with name: \"%s\" already exists.", className);
            throw err;
        }


        var output = {
            styleName: styleName,
            className: className
        };

        Loader.saveCss(className, styleText);
        this.stylesCollection[className] = output;
        Loader.saveList("styles", this.stylesCollection);
        return 0;
    };
    
    this.createCommand = function (req) {
        var commandName = req.body.name;
        var commandText = req.body.commandText;

        var selCommand = this.commandsCollection[commandName];

        if(selCommand)
        {
            console.warn("Command with name: \"%s\" already exists.", commandName);
            throw err;

        }

        var output = {
            commandName: commandName,
            commandText: commandText
        };

        this.stylesCollection[className] = output;
        Loader.saveList("command", this.commandsCollection);
        return 0;

    };

    this.createButton = function (req) {
        var buttonName = req.body.name;
        var buttonComand = req.body.command;
        var buttonStyle = req.body.style;
        var buttonText = req.body.text;

        var selButton = this.buttonsCollection[buttonName];

        if(selButton)
        {
            console.warn("Button with name: \"%s\" already exists.", buttonName);
            throw err;

        }

        var output = {
            buttonName: buttonName,
            buttonText: buttonText,
            buttonStyle : buttonStyle,
            buttonCommand : buttonComand
        };

        this.stylesCollection[className] = output;
        Loader.saveList("command", this.commandsCollection);
        return 0;
    };


    this.getStyle = function (id) {
        return this.stylesCollection[id];
    };

    this.getCommand = function (id) {
        return this.commandsCollection[id];
    };

    this.getButton = function (id) {
        return this.buttonsCollection[id];
    };

    this.getLayout = function (id) {
        return this.layoutsCollection[id];
    };


    this.deleteCss = function (req) {


    }
    
};


module.exports = manager;

