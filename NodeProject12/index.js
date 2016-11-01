/**
 * Created by anubhavshrimal on 11/7/16.
 */

var express = require("express");
var fs = require("fs");
var app = express();
var PORT = 8888;

app.use(express.static(__dirname+"/public"));

var total = fs.statSync('video.MP4').size;

app.get("/video", (req, res) => {

    var videoData;
    var start = parseInt(req.get('range').split("-")[0].split("bytes=")[1]);
    var end =  total-start < 65535 ? total : start + 65535;

    console.log(start, end);

    var readStream = fs.createReadStream('video.MP4', {"start": start, "end": end});
    readStream.on("data", (data) => {
        videoData = data;
        readStream.close();
    });

    res.set({
        "Content-Range": "bytes "+ start + "-" + (end) + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": end-start+1,
        "Content-Type": "video/mp4"
    });

    readStream.on("close", () => {
        res.status(206).end(videoData);
    });
});






app.listen(PORT, () => {
    console.log("server started at "+PORT);
});
