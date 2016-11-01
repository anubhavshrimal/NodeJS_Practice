
var fs = require("fs");

var readStream = fs.createReadStream("data.txt");
var writeStream = fs.createWriteStream("output.txt", {"flags": 'a'});   // a - append mode; w - write mode

// will append the data read from data.txt into output.txt
readStream.pipe(writeStream);   // pipe function passes data of one stream into another

            /* or */
/*
readStream.setEncoding("UTF8");

readStream.on("data", function (data) {
   // console.log(data);
    writeStream.write(data);
});

readStream.on("end", function () {  // read operation automatically ends on end of file
    console.log("end of file");
    writeStream.end();  // to end the write operation on file we have to use this function
});

readStream.on("error", function (err) {
    console.log(err);
});
*/
