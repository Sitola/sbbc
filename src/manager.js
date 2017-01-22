/**
 * Created by wermington on 6/5/16.
 */

import * as fs from "fs";
import * as util from "util";
import {exec, spawn} from 'child_process';
import winston from 'winston';
import {Loader} from './utils/loader';
import {MessageFactory, DefaultMessage, ErrorMessage, WarningMessage} from './utils/messages';
import {Execution, Executor} from './utils/execution';
import {FileAppendModule} from "./modules/fileAppend";
import {FileWriteModule} from "./modules/fileWrite";

const spawnargs = require('spawn-args');

export const Types = {
  STYLES: "styles",
  ACTIONS: "actions",
  BUTTONS: "buttons",
  LAYOUTS: "layouts"
};

export class Manager {

  constructor() {
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

  /**
   * Returns module instance, or null if it fails
   * @param name {string} module name
   * @return {Object} module instance
   */
  getModule(name) {
    switch (name) {
      case "file-append":
        return new FileAppendModule();
      case "file-write":
        return new FileWriteModule();
    }
  }


  static executeAsync(command, config) {
    return Executor.async(command, config);
  }


  static executeSync(command, config) {
    return Manager.executeAsync(command, config);
  }


  execute(id, config) {
    const cmd = this.getObject("actions", id);

    if (!cmd) {
      throw MessageFactory.err("No command was found with id: " + id);
    }

    return Manager.executeSync(cmd.action, config);
  }

  getObject(type, name) {
    winston.debug("Requested object [%s] from %s", name, type);
    const collection = this.getCollection(type);
    const obj = collection[name];

    if (!obj) {
      winston.debug("Object [%s] not found!", name);
      return null;
    }

    return obj;
  };


  deleteObject(type, id) {
    winston.debug("Deleting %s from \"%s\". ", id, type);

    if (this.getObject(type, id) == null) {
      throw MessageFactory.msg(" Object \"" + id + "\" not exists in \"" + type + "\"");
    }

    this.deleteCollection(type, id);
  };


  createObject(type, obj) {
    winston.debug("Creating \"%s\": ", type, obj);

    if (this.getObject(type, obj.id)) {
      throw MessageFactory.warn(" Object \"" + obj.id + "\" already exists in \"" + type + "\"");
    }

    this.addCollection(type, obj);
  }

  updateObject(type, obj) {
    winston.debug("Updating object \"%s\" in [%s]: ", obj.id, type, obj);
    if (this.getObject(type, obj.id) == null) {
      throw MessageFactory.warn(" Object \"" + obj.id + "\" not exists in \"" + type + "\"");
    }

    this.updateCollection(type, obj);
  }

  addCollection(type, obj) {
    const collection = this.getCollection(type);
    collection[obj.id] = obj;
    Loader.saveList(type, collection);
  };

  deleteCollection(type, id) {
    const collection = this.getCollection(type);
    delete collection[id];
    Loader.saveList(type, collection);
  };


  updateCollection(type, obj) {
    this.deleteCollection(type, obj.id);
    this.addCollection(type, obj);
  };

  getCollection(name) {
    const obj = this.collections[name];
    if (!obj) {
      throw MessageFactory.err("Cannot find collection: " + name);
    }
    else {
      winston.debug("Sending %s collection.", name);
      return obj;
    }
  };
}




