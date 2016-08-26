/**
 * Created by wermington on 8/26/16.
 */

import winston from 'winston';
import * as util from "util";

export class DefaultMessage
{
  constructor(msg, type, next)
  {
    this.msg = msg;
    this.type = type || "message";
    this.next = next;
  }

  static build(msg)
  {
    return new DefaultMessage(msg.msg, msg.type, msg.next);
  }

  message()
  {
    return this.msg;
  }

  out()
  {
    winston.log(this.what());
  }

  what()
  {
    var str = util.format("[%s] Exception: %s", this.type, this.msg);
    if (this.next) {
      str += "\n" + this.next.what();
    }
    return str;
  }
}


export class ErrorMessage extends DefaultMessage
{
  constructor(msg, next)
  {
    super(msg, "err", next);
  }
}


export class WarningMessage extends DefaultMessage
{
  constructor(msg, next)
  {
    super(msg, "warn", next);
  }
}


export class MessageFactory
{
  static msg(msg, type, next)
  {
    return new DefaultMessage(msg, type, next);
  }

  static err(msg, next)
  {
    return new ErrorMessage(msg, next);
  }

  static warn(msg, next)
  {
    return new WarningMessage(msg, next);
  }

  static build(msg)
  {
    switch (msg.type)
    {
      case 'err':
        return DefaultMessage.build(msg);
      case 'warn':
        return DefaultMessage.build(msg);
      default:
        return DefaultMessage.build(msg);
    }
  }
}




