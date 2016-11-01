/**
 * Created by anubhavshrimal on 2/7/16.
 */

var EventEmitter = require("events");

var myEmitter = new EventEmitter();
var yourEmitter = new EventEmitter();

myEmitter.on('data', function () {
    console.log("data listner");
});

myEmitter.once('data', function () {
    console.log("once data listner");
});

yourEmitter.on('data', function () {
    console.log("your emmitter data listner 1");
});


yourEmitter.on('data', function () {
    console.log("your emmitter data listner 2");
});

// by default 10 listners are allowed so that not too much load on processor
// it will allow more listners too but will give warnings
myEmitter.setMaxListeners(5);

myEmitter.emit('data');
myEmitter.emit('data');
myEmitter.emit('data');


yourEmitter.emit('data');

myEmitter.removeAllListeners();

// will not run this listner due to removeAllListners
myEmitter.emit('data');

console.log(myEmitter.getMaxListeners());
console.log(myEmitter.listenerCount('data'));   // will show 0 due to removeAllListners
console.log(yourEmitter.listenerCount('data'));
