import {Loader} from "./loader";
/**
 * Created by wermington on 8/26/16.
 */


export class Config
{
  constructor()
  {
    this.config = {};
  }

  static loadFile(path)
  {
    const cfg = new Config();
    cfg.config = Loader.loadJson(path);
    return cfg;
  }

  get(name)
  {
    return this.config[name];
  }

  set(name, value)
  {
    return this.config[name] = value;
  }
}



