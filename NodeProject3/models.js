/**
 * Created by anubhavshrimal on 15/6/16.
 */

var mongoose = require("mongoose");

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/nodeProject3");

var Schema = mongoose.Schema;

var playerSchema = Schema({
    name: String,
    age: {type: Number, max: 40, min: 1},
    team: {type:String, default: "IND"}
});

var Player = mongoose.model("Player", playerSchema);


exports.setPlayer = function (req, res) {

    var p = new Player(req.body);
    p.save(function (err, result) {
        if(err){
            res.send(err);
        }
        else{
            // console.log(result);
            res.status(201);   // code that tells that something is added to browser
            res.send(result);
        }
    });
}

exports.getPlayer = function (req, res) {

    Player.find(function (err, result) {
        if(err)
            res.send(err);
        else
            res.send(result);
    });
}

exports.updatePlayer = function (req, res) {

    Player.findOne({name: req.body.oldName},function (err, result) {
        if(err)
            res.send(err);
        if(result)
        {
            result.name = req.body.newName;
            result.save(function (err, result) {
                if(err){
                    res.send(err);
                }
                else{
                    // console.log(result);
                    res.send(result);
                }
            });
        }
        res.send("resource not found");
    });
}

exports.deletePlayer = function (req, res) {

    Player.findOne({name: req.body.name},function (err, result) {
        if(err)
            res.send(err);
        if(result)
        {
            result.remove(function (err, result) {
                if(err){
                    res.send(err);
                }
                else{
                    // console.log(result);
                    res.send(result);
                }
            });
        }
        res.send("resource not found");
    });
}

exports.findTeam = function (req, res) {

    var query = Player.find({"team": req.body.team});

    query.sort("-age name")  // sort by age(descending) and then sort those blocks by name
        .limit(12)  // show first 12 results
        .where("team").equals(req.query.team)
        .select("name age -_id")
        .exec(function (err, result) {      // execute the query
            res.send(result);
        });
}
