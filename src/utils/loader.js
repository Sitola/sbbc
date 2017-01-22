/**
 * Created by wermington on 8/26/16.
 */


import winston from 'winston';
import * as fs from "fs";

export const Loader = {

  resourcesPath: "resources/",
  listsPath: "lists/",
  cssPath: "styles/",
  outputPath: "output/",

    /**
     * Loads Json file from path
     * @param path {String} JSON file path
     * @returns {Object}
     */
  loadJson: function (path)
  {

    try {
      const data = fs.readFileSync(path, 'utf8').toString();
      winston.debug(" [READ] File [%s] content: ", path, data);
      const parsedJson = JSON.parse(data);
      winston.debug("Parsed json: ", parsedJson);
      return parsedJson;
    } catch (e) {
      winston.error(e);
      return {};
    }
  },

    /**
     * Saves Json
     * @param path {String}
     * @param json {Object}
     */
  saveJson: function (path, json)
  {
    winston.debug("[SAVE] Saving json [" + path + "]: ", json);
    const string = JSON.stringify(json, null, 2);
    fs.writeFile(path, string);
  },

  loadList: function (name)
  {
    const basePath = Loader.resourcesPath + Loader.listsPath;
    const path = basePath + name + ".json";

    winston.debug("[LIST] Loading lists file: \"%s\"", path);
    const loadJson = Loader.loadJson(path);
    winston.debug("[LIST] %s: ", name, loadJson);
    return loadJson;
  },

  saveList: function (name, object)
  {
    const basePath = Loader.resourcesPath + Loader.listsPath;
    const path = basePath + name + ".json";
    winston.info("[SAVE] Saving lists file: \"%s\"", path);
    Loader.saveJson(path, object)
  }
};
