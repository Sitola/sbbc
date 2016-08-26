import {MessageFactory} from "../utils/messages";
import winston from 'winston';
/**
 * Created by wermington on 8/26/16.
 */

export class WSConnection {
  constructor(wss) {
    this.wss = wss;

    this.wss.on('message', this.handleIncommingMessage);
    this.wss.on('open', this.handleOpenConnection);
    this.wss.on('close', this.handleCloseConnection);
  }

  handleIncommingMessage(msg) {
    winston.debug("[WEBSOCKET] Received new message!");
    if (msg.type && msg.msg) {
      this.handleMessage(msg.msg);
    }
  }

  handleMessage(msg) {
    if(msg.type == "exec")
    {

    }
  }

  handleOpenConnection() {
    winston.info("[WEBSOCKET] New connection opened.");
  }

  handleCloseConnection() {
    winston.info("[WEBSOCKET] Closed connection.")
  }

  send(msg, type) {
    this.wss.send(MessageFactory.msg(msg, type));
  }

  sendError(msg) {
    this.wss.send(MessageFactory.err(msg));
  }

  sendWarn(msg) {
    this.wss.send(MessageFactory.warn(msg));
  }
}