/**
 * Created by anubhavshrimal on 12/6/16.
 */

var mongodb = require("mongodb");

var MongoClient = mongodb.MongoClient;  //db client for mongo (terminal type)

var url = "mongodb://localhost:27017/nodeClass"; //url of the mongodb

var conn;
var students;
MongoClient.connect(url, function (err, db) {  //connect to the DB drivers

    if (err) throw err;
    conn = db;
    students = conn.collection("students");
});

// asynchronous callback
exports.getStudents = function(req, res){

    // asynchronous callback
    students.find().toArray(function (err, result) {
        if (err) throw err;
        /*data of find() is not in any proper format suct as array of json
        hence we change the format to array*/

        /*console.log(result);
        for(var i = 0; i < result.length; i++){
            console.log(result[i].name);
        }*/
        res.send(result);
    });
}

exports.getStudent = function(req, res){
    
    // asynchronous callback
    students.find({"name":req.params.name}).toArray(function (err, result) {
        if (err) throw err;
        /*data of find() is not in any proper format suct as array of json
         hence we change the format to array*/

        /*console.log(result);
         for(var i = 0; i < result.length; i++){
         console.log(result[i].name);
         }*/
        res.send(result);
    });
}

exports.setStudent = function(req, res){

    // asynchronous callback
    students.insertOne(req.body, function (err, result) {
        console.log(result);
        res.redirect("/students");  //redirect to all users page

    });
}