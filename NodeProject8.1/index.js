/**
 * Created by anubhavshrimal on 29/6/16.
 */

var socket = require("socket.io");
var express = require("express");
var app = express();
var server = require("http").Server(app);

var PORT = process.env.PORT || 3000;    // set the port for heroku else local
var io = socket(server);

app.use(express.static(__dirname+"public"));

io.on("connection", function (sock) {
    
    // sock.emit('news', 'youstart');
    console.log("connected to client");

    sock.on('chat', function (data) {

        sendChat(data);
    });
});

var sendChat = function (data) {
    io.emit('sendChat', data);  // will broadcast to all the sockets connected
    // to send only to the sender's socket use sock.on where sock is the argument of io.on
}

/*app.get("/", function (req, res) {
   res.send("hello");
});*/

server.listen(PORT, function (req, res) {   // app mounted on socket.io
    console.log("server started at 3000");
});

