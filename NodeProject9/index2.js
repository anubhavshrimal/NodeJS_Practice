/**
 * Created by anubhavshrimal on 2/7/16.
 */

var EventEmitter = require('events');
var util = require('util');

var myEmitter = function () {
}

util.inherits(myEmitter, EventEmitter);

var em1 = new myEmitter();

em1.on('data', function (name, age) {
    console.log("data listner", name, age);
});

// multiple agruments can be passed as data in the emitter
em1.emit('data', {name: 'anubhav'}, {age: 20});
em1.emit('data', 'hello world');
