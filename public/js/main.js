/**
 * Created by wermington on 5/29/16.
 */



window.ajaxSender = function () {
  
    var url = "/api/create/";

    this.send= function (method, data, callback) {
        $.ajax({
            type: method,
            url: url,
            contentType: "application/json",
            data: JSON.stringify(data),
            success: callback
        });
    };


    this.sendPut = function (data, callback) {
       this.send("PUT", data, callback);
    };

    this.sendPost = function (data, callback) {
        this.send("POST", data, callback);
    }

    this.sendGet = function (data, callback) {
        this.send("GET", data, callback);
    }
    
};


$(function () {

    
  
});

