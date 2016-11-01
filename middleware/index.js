/**
 * Created by anubhavshrimal on 18/7/16.
 */

var express = require('express');
var compression = require('compression');

var app = express();

app.use(compression());

app.use(express.static('public'));

app.get("/", function (req, res) {
    res.send("hello")
});

app.listen(8888, function () {
    console.log("server started at 8888");
});