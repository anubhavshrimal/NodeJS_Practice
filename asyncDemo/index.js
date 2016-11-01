/**
 * Created by anubhavshrimal on 23/7/16.
 */

var async = require('async');

var delayedOutput = function (a, b, cb) {
    setTimeout(function () {
        console.log("output1", (a+b));
        // arguments (err, result)
        cb(null, a+b);
    }, 3000);
};

var delayedOutput2 = function (sum, cb) {
    setTimeout(function () {
        console.log("output2", sum * 2);
        // arguments (err, result)
        cb(null, "output2");
    }, 3000);
};

var nonDelayedOutput = function (cb) {
    console.log("output3");
    // arguments (err, result)
    cb(null, "output3");
};

// delayedOutput();
// delayedOutput2();
// nonDelayedOutput();

// async series passes a callback as the last argument in the asynchronous function which is then called to execute
// the next function in series array
/*
async.series(
    [
        function(cb){delayedOutput(5, 2, cb);},
        function(cb){delayedOutput2(7, cb);},
        nonDelayedOutput],
        function(err, results){
            console.log("over");
            console.log(results);
        }
);
*/

/*
async.parallel(
    [
        delayedOutput,
        delayedOutput2,
        nonDelayedOutput],
    function(err, results){
        console.log("over");
        console.log(results);
    }
);*/

// passes the return of the previous function in the next function
// eg. delayedOutput's o/p can be passed in delayedOutput2
async.waterfall(
    [
        function(cb){delayedOutput(5, 2, cb);},
        function(resultOfOutput1, cb){delayedOutput2(resultOfOutput1, cb);},
        function(resultOfOutput2, cb){nonDelayedOutput(cb);}
    ],
    function(err, resultOfNonDelayed){
        console.log("over");
        console.log(resultOfNonDelayed);
    }
);