/**
 * Created by anubhavshrimal on 26/7/16.
 */

var os = require('os');
var path = require('path');
var process = require('process');

console.log("Uptime in hours",os.uptime()/3600);
console.log("OS type: ",os.type());
console.log("RAM in GB: ",os.totalmem()/1024/1024/1024);
console.log("Temporary directory: ",os.tmpdir());
console.log("Load on system: ",os.loadavg());
console.log("HostName: ",os.hostname());
console.log("OS Architecture: ",os.arch());

console.log("Delimiter: ",path.delimiter);
var url = "https://nodejs.org/dist/latest-v4.x/docs/api/events.html";

console.log(path.dirname(url));
console.log(path.basename(url));
console.log(path.extname(url));

console.log(process.env);