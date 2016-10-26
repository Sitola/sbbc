/**
 * Created by pstanko on 10/19/16.
 */


class SimpleEntity{
  constructor(params){
    params = params || {};
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
  }

  toJson(){
    return JSON.stringify(this);
  }

  generateId(){
    this.id = Tools.removeSpaces(this.name);
  }
}


class Action extends SimpleEntity{
    constructor(params){
      super(params);
      this.action = params.action;
      this.javascript = params.javascript;
      this.actionType = params.actionType;
    }
}

class Button extends SimpleEntity{
  constructor(params){
    super(params);
    this.style = params.style;
    this.styleClicked = params.styleClicked;
    this.action = params.action;
    this.value = params.value;
    this.category = params.category;
  }
}


class Layout extends SimpleEntity{
  constructor(params){
    super(params);
  }
}

class Style extends SimpleEntity{
  constructor(params){
    super(params);
    this.css = params.css;
    this.className = params.className;
  }
}