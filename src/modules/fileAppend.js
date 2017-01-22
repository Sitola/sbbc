import * as fs from "fs";
import * as winston from 'winston';

export class FileAppendModule
{
  constructor(config = {}) {
    this.config = config;
  }

  /**
   *
   * @param data {Object} Prefix that can be applied
   */
  data(data = {}) {
    winston.debug("[WRITE]: ", data.path);
    fs.appendFile(data.path || this.config.path, data.text, function (err) {
      winston.debug("Cannot write timestamp to file")
    });
  }
}


export default FileAppendModule;

