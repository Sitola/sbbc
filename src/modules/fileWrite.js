import * as fs from "fs";
import * as winston from 'winston';

export class FileWriteModule
{
  constructor(config = {}) {
    this.config = config;
  }

  /**
   *
   * @param data {Object} Prefix that can be applied
   */
  data(data = {}) {
    fs.writeFile(data.path || this.config.path, data.text, (err) => {
      winston.warning("Cannot write timestamp to file")
    });
  }
}
export default FileWriteModule;
