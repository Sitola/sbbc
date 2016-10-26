/**
 * Created by wermington on 5/29/16.
 */

class DefaultMessage {
  constructor(msg, type, next) {
    this.msg = msg;
    this.type = type || "message";
    this.next = next;
  }

  static build(msg) {
    return new HTTPMessage(msg.msg, msg.type, msg.next);
  }

  message() {
    return this.msg;
  }

  out() {
    console.log(this.what());
  }

  what() {
    var str = `[${this.type}] Exception: ${this.msg}`;
    if (this.next) {
      str += "\n" + this.next.what();
    }
    return str;
  }
}


class ErrorMessage extends DefaultMessage {
  constructor(msg, next) {
    super(msg, "err", next);
  }
}


class WarningMessage extends DefaultMessage {
  constructor(msg, next) {
    super(msg, "warn", next);
  }
}


class MessageFactory {
  static msg(msg, type, next) {
    return new DefaultMessage(msg, type, next);
  }

  static err(msg, next) {
    return new ErrorMessage(msg, next);
  }

  static warn(msg, next) {
    return new WarningMessage(msg, next);
  }

  static build(msg) {
    switch (msg.type) {
      case 'err':
        return DefaultMessage.build(msg);
      case 'warn':
        return DefaultMessage.build(msg);
      default:
        return DefaultMessage.build(msg);
    }
  }

  static httpMessage(type, data, method) {
    return new HTTPMessage(type, data, method);
  }

  static httpResponse(response, callback)
  {
    return new HTTPResponse(response, callback);
  }
}


class HTTPMessage {
  constructor(type, data, method) {
    this.method = method || "PUT";
    this.cont = {
      type: type,
      data: data
    };
  }

  send(url) {
    return window.Sender.send(url, this.method, this.cont);
  }

  sendWithHandle(url, callback) {
    var resp = this.send(url);
    Sender.handleResponse(resp, callback);
  }
}


class HTTPResponse {

  constructor(response, callback) {
    this.response = response;
    this.callback = callback;
  }

  setCallback(callback) {
    this.callback = callback;
  }

  handle(callback) {
    callback = callback || this.callback;
    Sender.handleResponse(this.response, callback);
  }

}


class Tools {
  static removeSpaces(str) {
    return str.replace(/ /g, "_");
  }

  static cleanCss(css) {
    const posOpen = css.indexOf('{');
    const posClose = css.indexOf('}');
    return css.substring(posOpen + 1, posClose - 1);
  }

  static generateCss(className, css) {
    return `.${className} \n{${css}\n}\n`;
  }

  static removeNewLine(str) {
    return str.replace(/(\r\n|\n|\r)/gm, "")
  }
}

const SenderUrl = {
  Create: "/api/create/",
  Get: "/api/get/",
  Put: "/api/put/",
  Delete: "/api/delete/",
  Update: "/api/update/",
  Exec: "/api/exec/",
  getCollection: function(style) {
    return `/api/${style}/`
  }
};


const Sender = {

  handleResponse: function(resp, callback) {
    resp.done(function(res) {
      try {

        //noinspection FallThroughInSwitchStatementJS
        switch (res.type) {
          case "warning":
            console.warn(res.msg);
          case "response":
            return callback(res.msg, res.type);
            break;
          case "error":
            console.error(res.msg);
            return null;
            break;
          case "message":
            return callback(res.msg, res.type);
          default:
            console.warn("[GET] Unknown type: %s", res.type);
            return callback(res.msg, res.type);
        }
      } catch (e) {
        console.warn(e);
        return null;
      }
    });

    resp.fail(function(err) {
      console.error(err);
      return null;
    });

    return resp;
  },

  send: function(url, method, data) {
    var request = {
      type: method,
      url: url
    };

    if (data != null) {
      console.debug('[SEND] Sending data: ', data);
      request.data = data;
    }

    return $.ajax(request);
  },

  sendGet: function(url) {
    return $.get(url);
  }
};


const Manager = {

  getCollection: function(name, callback) {
    return this.invokeRequest(SenderUrl.getCollection(name), null, null, "GET", callback);
  },

  getObject: function(type, id, callback) {
    const resp = Sender.sendGet(`${SenderUrl.getCollection(type)}${id}`);
    console.log("[GET] Object response: ", resp);
    return new HTTPResponse(resp, callback);
  },

  invokeRequest: function(url, name, obj, method, callback) {
    const request = MessageFactory.httpMessage(name, obj, method);
    const serverResponse = request.send(url, "");
    return new HTTPResponse(serverResponse, callback);
  },

  createObject: function(name, obj, callback) {
    return this.invokeRequest(SenderUrl.Create, name, obj, "PUT", callback);
  },

  deleteObject: function(name, obj, callback) {
    return this.invokeRequest(SenderUrl.Delete, name, obj, "DELETE", callback);
  },

  updateObject: function(name, obj, callback) {
    return this.invokeRequest(SenderUrl.Update, name, obj, "PUT", callback);
  },

  executeCommand: function(obj, callback) {
    //return this.invokeRequest(SenderUrl.Exec, null, obj, "POST" , callback);

    window.wsClient.send({ type: 'exec', data: obj});

  }
};

