/**
 * Created by anubhavshrimal on 15/6/16.
 */

var mongoose = require("mongoose");

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/nodeProject4");

var Schema = mongoose.Schema;

var commentSchema = Schema({
    _id: Number,
    message: String,
    userName: String,
    created_at: Date
});

var postSchema = Schema({
    userName: String,
    message: String,
    comments: [{type:Number, ref:'Comment'}]
});

var Post = mongoose.model("Post", postSchema);
var Comment = mongoose.model("Comment", commentSchema);


exports.savePost = function (req, res) {

    var p = new Post();
    p.userName = "anubhav";
    p.message = "this is the post message";

    var c = new Comment();
    c._id = 1;
    c.message = "comment 1";
    c.userName = "dummy user 1";
    c.created_at = new Date();

    /* p.comments.push(c);
            or
    alternate p.comments.push( p.comments.create({"message":"hello", "userName":"youstart"}) );
    this would create a model of the object passed with obj ID and add it to the array no need to make model*/

    c.save(function (err, result) {
        if(err) res.send(err);
        if(result){
            p.comments.push(result._id);
            p.save(function (err, result) {
                res.send(result);
            });
        }
    });
}

exports.getPost = function (req, res) {

    var query = Post.find()
        .populate("comments")
        .exec(function (err, result) {
            if(err) res.send(err);
            if(result){
                res.send(result);
            }
        });
}