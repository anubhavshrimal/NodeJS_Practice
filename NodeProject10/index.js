/**
 * Created by anubhavshrimal on 5/7/16.
 */

/*
// will run this in next server loop
process.nextTick(function () {
    console.log(__dirname);
});

console.log(__filename);
*/

var express = require("express");
var app = express();
var PORT = 8888;

app.get('/', (req, res) => {
    res.send("hello");
});

// exports the server process to indexSpec.js
exports.server = app.listen(PORT, () => {
    console.log("server started at "+PORT);
});