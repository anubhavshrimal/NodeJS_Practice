/**
 * Created by anubhavshrimal on 15/6/16.
 */

var mongoose = require("mongoose");

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/nodeClass");

var Schema = mongoose.Schema;

var addressSchema = Schema({
    plot: Number,
    street: String,
    city: String
});

var userSchema = Schema({
    name: String,
    age: {type: Number, max: 65, min: 1},
    classes: String,
    address: addressSchema
});

var Address = mongoose.model("Address", addressSchema);

// model name:- First letter capital, singular in name
var User = mongoose.model("User", userSchema);

var a1 = new Address({"plot": 58, "street": "hawa sadak","city": "jaipur"});

exports.userSignup = function (req, res) {
    var u1 = new User(req.body); // constructor initialization
    u1.address = a1;

    // save the values in DB
    u1.save(function (err, result) {
        if(err){
            res.send(err);
        }
        else{
            // console.log(result);
            res.redirect("/showAll");
        }
    });
}

exports.getUsers = function (req, res) {

    // save the values in DB
    User.find(function (err, result) {
        if(err){
            res.send(err);
        }
        else{
            // console.log(result);
            res.send(result)
        }
    });
}

// --------------------------------------------------------------------------------

var playerSchema = Schema({
    name: String,
    age: {type: Number, max: 40, min: 1},
    team: {type:String, default: "IND"}
});

// adding a function on Class name
playerSchema.statics.findByName = function (n, callBack) {
    return this.find({name: n},callBack);
}

// adding a function on instance of Class
playerSchema.methods.tellFuture = function () {
    if(this.age > 30){
        return "he needs to retire";
    }
    else{
        return "pichar abhi baki h mere dost";
    }
}

var Player = mongoose.model("Player", playerSchema);


exports.setPlayer = function (req, res) {

    var p = new Player(req.body);
    p.save(function (err, result) {
        if(err){
            res.send(err);
        }
        else{
            // console.log(result);
            res.send(p.tellFuture());
        }
    });
}

exports.getPlayer = function (req, res) {

    Player.findByName(req.query.name, function (err, result) {
       if(err)
           res.send(err);
        else
           res.send(result);
    });
}