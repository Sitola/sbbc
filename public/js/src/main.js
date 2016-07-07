/**
 * Created by wermington on 5/29/16.
 */

window.ajaxSender = {

    urlCreate: "/api/create/",
    urlGet: "/api/get/",
    urlPut: "/api/put/",
    urlDelete: "/api/delete/",
    urlUpdate: "/api/update/",
    urlExec: "/api/exec/",


    handleResponse: function (resp, callback)
    {
        resp.done(function (res) {
            console.log(res);
            try {

                switch(res.type)
                {
                    case "warning":
                        console.warn(res.msg);
                    case "response":
                        return callback(res.msg, res.type);
                        break;
                    case "error":
                        console.error(res.msg);
                        return null;
                        break;
                    default:
                        console.warn("Unknown type: %s", res.type);
                        return callback(res.msg, res.type);
                }
            }catch(e)
            {
                console.warn(e);
                return null;
            }
        });

        resp.fail(function (err) {
            console.error(err);
            return null;
        });

        return resp;
    },

    send: function (method, url, data)
    {
        //var sdata = JSON.stringify(data);
        var request = {
            type: method,
            url: url
        };

        if (data != null) {
            console.debug('Sending data: ', data);
            request.data = data;
        }

        const obj = $.ajax(request);
        return obj;
    },

    sendPut: function (data, url)
    {
        url = url || ajaxSender.urlCreate;
        return this.send("PUT", url, data);
    },

    sendPost: function (data, url)
    {
        url = url || ajaxSender.urlCreate;
        return this.send("POST", url, data);
    },

    sendGet: function (data, url)
    {
        url = url || ajaxSender.urlGet;
        return this.send("GET", url, data);
    },
    sendDelete: function (data, url)
    {
        url = url || ajaxSender.urlDelete;
        return this.send("DELETE", url, data);
    },
    sendUpdate: function (data, url)
    {
        url = url || ajaxSender.urlUpdate;
        return this.send("PUT", url, data);
    },

    sendExec: function (data, url)
    {
        url = url || ajaxSender.urlExec;
        return this.send("POST", url, data);
    }
};


window.removeSpaces = function (string)
{
    return string.replace(/ /g, "_");
};

window.restClient = {

    getCollection: function (name)
    {
        var response = ajaxSender.sendGet(null, '/api/' + name + "/");
        return response;
    },

    getObject: function (type, id)
    {
        var obj = {
            id: id
        };
        var response = ajaxSender.sendGet(obj, '/api/' + type + "/");
        return response;
    },

    createObject: function (name, obj)
    {
        const request = {
            type: name,
            data: obj
        };
        var response = ajaxSender.sendPut(request);
        return response;
    },

    deleteObject: function (name, obj)
    {
        const request = {
            type: name,
            data: obj.id
        };
        var reponse = ajaxSender.sendDelete(request);
        return reponse;
    },

    updateObject: function (name, obj)
    {
        const request = {
            type: name,
            data: obj
        };

        var response = ajaxSender.sendUpdate(request);
        return response;
    },

    executeCommand: function (obj)
    {
        const request = {
            type: "exec",
            data: obj
        };

        var response = ajaxSender.sendExec(request);
        return response;
    }
};

