/**
 * Created by anubhavshrimal on 2/7/16.
 */

var socket = io.connect('http://'+window.location.host+'/');
/* socket.on('news', function (data) {
 console.log(data);

 });
 */
var sendMsg = function () {
    var input = document.getElementById('msg').value;

    socket.emit('chat', input);

    document.getElementById('msg').value = "";
};

var messages = document.getElementById("messages");

socket.on('sendChat', function (data) {
    messages.innerHTML = messages.innerHTML+"<p>"+data+"</p>"
});