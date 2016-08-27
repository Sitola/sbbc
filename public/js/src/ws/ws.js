/**
 * Created by wermington on 8/26/16.
 */


function url(s) {
  var l = window.location;
  return ((l.protocol === "https:") ? "wss://" : "ws://") + l.host + '/' + s;
}


class DefaultMessageWS
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
    console.log(this.what());
  }

  what()
  {
    var str = `[${this.type}] Exception: ${this.msg}`;
    if (this.next) {
      str += "\n" + this.next.what();
    }
    return str;
  }
}


class ErrorMessage extends DefaultMessageWS
{
  constructor(msg, next)
  {
    super(msg, "err", next);
  }
}


class WarningMessage extends DefaultMessageWS
{
  constructor(msg, next)
  {
    super(msg, "warn", next);
  }
}


class MessageFactory
{
  static msg(msg, type, next)
  {
    return new DefaultMessageWS(msg, type, next);
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







class WebSocketClient
{
  constructor()
  {
    const _this = this;
    this.url = url('ws');
    this.actions = {};

    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => _this.onOpen();
    this.ws.onclose = () =>_this.onClose();
    this.ws.onerror = (err) => _this.onError(err);


    this.ws.onmessage = (event) => _this.onMessage(event);


    this.defaultFunc = function(data) {
      window.terminal.out(data);
    }
  }

  on(type, callback)
  {
    this.actions[type] = callback;
  }


  onMessage(event)
  {
    const _this = this;
     function handleMessage(msg) {
       const func = _this.actions[msg.type];
       if(func)
       {
         func(msg);
       }else{
         console.error('[WS] (handleMessage) Cannot find type: %s', msg.type);
         _this.defaultFunc(msg);
       }
     };

    const msgStr = event.data;
    console.log("[WS]: Received message: " + msgStr);

    const msg = JSON.parse(msgStr);
    if (!msg || !msg.type) return;
    switch (msg.type)
    {
      case 'err':
        console.error(msg.msg);
        window.terminal.err(msg.msg);
        break;
      case 'warn':
        console.warn(msg.msg);
        window.terminal.err(msg.msg);
        break;
      case 'message':
      default:
        handleMessage(msg.msg);
        break;
    }
  }


  onOpen() {
    console.log(`[WS] Connection opened to: ${this.url}`);
  }



  onClose()
  {
    console.log('[WS] Connection closed!');
  }

  onError(error)
  {
    console.error(error);
  }


  send(data, type)
  {
    const obj = MessageFactory.msg(data, type);
    console.log('[WS] Sending message: ', obj);
    const strObj = JSON.stringify(obj);
    this.ws.send(strObj);
  }

  sendError(error)
  {
    this.send(error, 'err');
  }

  sendWarn(warn)
  {
    this.send(warn, 'warn');
  }

}




