/**
 * Created by anubhavshrimal on 7/6/16.
 */

var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var module = require("./module");
var api = require("./api");
// var db = require("./db");
var timeout = require("connect-timeout");
var models = require("./models");
var playerRoute = require("./playerRoute");

var app = express();

// external module
console.log("module:",module);
console.log("module function call:");
module.speak();     //function call from module.js

app.use(timeout('5s'));
app.use(logger("dev")); // combined can be an argument as well
app.use(bodyParser.json()); //for fetching the data hidden in body packet eg. POST request form data or JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/player", playerRoute);


//regular expression
app.get(/\/abc?d/, function (req, res) { //c is optional in url now /abd or /abcd both are valid
    res.send("abd get request");
});

app.get(/\/(ef)?d/, function (req, res) { //ef is optional in url now /efd or /d both are valid
    res.send("efd get request");
});

app.get("/pq*r", function (req, res) { //pq(string)r; (string) is optional in url
    res.send("pqr get request");
});

// variable routing
app.get("/products/:brand",api.brandFunction);

app.post("/products/:brand/:category",api.brandCategory);

//mongo Test
/*app.get("/students", db.getStudents);
app.get("/student/:name", db.getStudent);
app.post("/insert", db.setStudent);*/

// mongoose
app.post("/signup", models.userSignup);
app.get("/showAll", models.getUsers);

app.listen(8080, function () {
   console.log("server started");
});

