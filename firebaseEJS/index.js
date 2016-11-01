/**
 * Created by anubhavshrimal on 02/08/16.
 */

var express = require("express");
var firebase = require("firebase");
var ejs = require("ejs");
var jade = require("jade");

var app = express();

var students = [];
app.set("view engine", "ejs");
app.set("views", "./templates");

app.get("/show", function (req, res) {
    res.render("index", {"students":students});
});

// --------------Firebase Start---------------//
firebase.initializeApp({
    serviceAccount: "nodeFirebaseKey.json",
    databaseURL: "https://nodeprojectfirebaseejs.firebaseio.com/"
});

var db = firebase.database();   // db object of firebase
var ref = db.ref(); // root reference
var studentsRef = ref.child("students");

ref.on("child_added", function(snapshot, prevKey) { // listner activates when value is added in firebase
    console.log(snapshot.key, snapshot.val());
    // console.log(prevKey);
});

studentsRef.on("child_added", function(snapshot, prevKey) { // listner activates when value is added in firebase
    students.push(snapshot.val());
})

app.get("/", function (req, res) {
    studentsRef.push({
        "name": "firebase",
        "class": "node",
        "age": 20
    });

    res.send("hello");
});
// --------------Firebase END---------------//

app.listen(8888, function () {
     console.log("server started at 8888");
});