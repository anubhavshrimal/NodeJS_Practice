var express = require("express");
var app = express();
var logger = require("morgan");

var PORT = 8888;

// middlewares


app.use(function (req, res, next) {         // custom middleware
    /*console.log(req.method, req.url);
    console.log("my middleware");*/
    if(req.query.firstname == "dexter") {
        req.method = "POST";
        req.url = "/polls";     // will redirect to diffrent api if name = dexter
    }

    next();                         // passes controller to the next middleware / function

});
app.use(logger("dev"));
app.use(express.static("public"));

//Apis
app.get("/", function (req, res) {
    console.log(req.url);
    res.send("hi");
});

app.post("/polls", function (req, res) {
    res.send("post request made");
});

app.get("/poll", authenticator, function (req, res) {       // authenticates before running the annonymous function
    console.log(req.query);
    res.send("<h1>post request</h1>");
});

//Listen Server
app.listen(PORT, function (req, res) {
   console.log("server started "+PORT);
});

function authenticator(req, res, next) {
    if(req.query.role == "admin"){
        next();
    }else{
        res.sendStatus(403);
    }
}
