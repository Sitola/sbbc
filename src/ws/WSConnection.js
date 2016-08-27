import {MessageFactory} from "../utils/messages";
import winston from 'winston';
/**
 * Created by wermington on 8/26/16.
 */

//winston.level = 'debug';

const log = new winston.Logger({
  level : 'debug',
  transports: [
    new (winston.transports.Console)()
  ]
});

export class WSConnection {
  constructor(wss) {
    this.wss = wss;
    this.actions = {};
    const _this = this;

    log.info('[WS] New connection established!');

    this.wss.on('message', (msg) => _this.handleIncommingMessage(msg));
    this.wss.on('open',  () => _this.handleOpenConnection());
    this.wss.on('close', () => _this.handleCloseConnection());

    this.defaultFunc = function(data) {
      log.debug(data);
      this.send(data);
    }
  }

  on(type, callback)
  {
    this.actions[type] = callback;
  }

  handleIncommingMessage(msgStr) {
    var msg = msgStr;
    if(typeof msg === "string")
    {
      msg = JSON.parse(msg);
    }

    log.debug(`[WS] Received message: `, msgStr);
    if (msg.type && msg.msg) {
      this.handleMessage(msg.msg);
    }
  }

  handleMessage(msg) {
    if(!msg.type)
    {
      log.error('Cannot read type: ', msg);
    }

    const func = this.actions[msg.type];
    if(!func)
    {
      this.defaultFunc(msg);
    } else {
      func(msg);
    }

  }

  handleOpenConnection() {
    log.info("[WS] New connection opened.");
    this.wss.send({type: "echo", data: "echo!"});
  }


  handleCloseConnection(){
    log.info("[WS] Closed connection.")
  }

  send(msg, type){
    log.debug(`[WS] Sending message: `, JSON.stringify(msg));
    this.wss.send(MessageFactory.msg(msg, type).json());
  }

  sendError(msg) {
    this.wss.send(MessageFactory.err(msg).json());
  }

  sendWarn(msg) {
    this.wss.send(MessageFactory.warn(msg).json());
  }
}