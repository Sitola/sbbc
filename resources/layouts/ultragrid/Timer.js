/**
 * Created by pstanko on 10/13/16.
 */

var Timer = function(elem, options) {

    var timer       = createTimer(),
        offset,
        clock,
        seconds = 0, minutes = 0, hours = 0,
        interval;

    // default options
    options = options || {};
    options.delay = options.delay || 1000;

    // append elements
    elem.appendChild(timer);

    // initialize
    reset();

    // private functions
    function createTimer() {
        return document.createElement("span");
    }

    function start() {
        if (!interval) {
            offset   = Date.now();
            interval = setInterval(update, options.delay);
        }
    }

    function stop() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    function reset() {
        clock = 0;
        seconds = 0; minutes = 0; hours = 0;
        render();
    }

    function update() {
        seconds++;
        render();
    }
    function align(num) {
        "use strict";
        return num > 9 ? "" + num: "0" + num;
    }

    function render() {
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        timer.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    }

    function delta() {
        var now = Date.now(),
            d   = now - offset;

        offset = now;
        return d;
    }

    // public API
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;
};