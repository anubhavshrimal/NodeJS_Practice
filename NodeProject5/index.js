/**
 * Created by anubhavshrimal on 24/6/16.
 */

var fs = require('fs'); // get file system library of node

// file name, encoding format (optional), callback
fs.readFile("./data.json", 'utf-8', function (err, result) {

    // result is in string format
    // parse string into json format
    console.log("data read:", JSON.parse(result).name);
});

var data= {"name": "NodeJS class"};

// file name, data to be added, callback
// parse data into string before adding
fs.appendFile("./newData.json", JSON.stringify(data), function (err) {
    console.log("data added");
});

fs.readdir("./", function (err, result) {
    console.log(result);
});

/*
// to watch over file changes if any
// current -> after file change; previous -> before file change
fs.watchFile("./data.json", function (current, previous) {
    console.log("Old File Info:");
    console.log(previous);
    console.log("New File Info:");
    console.log(current);
});
*/

/*
// to watch over the whole directory changes
fs.watch('./', function(event, filename) {
    console.log("event is:", event);
if (filename) {
    console.log("filename provided:", filename);
} else {
    console.log('filename not provided');
}
});
*/

