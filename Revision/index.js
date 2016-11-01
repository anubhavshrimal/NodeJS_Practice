/**
 * Created by anubhavshrimal on 03/08/16.
 */

var express = require('express');
var app = express();
var process = require('process');
var PORT = process.env.PORT || 8888;
var routes = require('./routes')(app);


app.listen(PORT, function () {
    console.log("server started at " + PORT);
});