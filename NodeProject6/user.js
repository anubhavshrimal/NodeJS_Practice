/**
 * Created by anubhavshrimal on 27/6/16.
 */

/**
 * Created by anubhavshrimal on 27/6/16.
 */

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/loginUser");

var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    image: String,
    profileId: String
});

userSchema.statics.findOrCreate = function (conditions, doc, options, callback) {
    if (arguments.length < 4) {
        if (typeof options === 'function') {
            // Scenario: findOrCreate(conditions, doc, callback)
            callback = options;
            options = {};
        } else if (typeof doc === 'function') {
            // Scenario: findOrCreate(conditions, callback);
            callback = doc;
            doc = {};
            options = {};
        }
    }
    var self = this;
    this.findOne(conditions, function(err, result) {
        if(err || result) {
            if(options && options.upsert && !err) {
                self.update(conditions, doc, function(err, count){
                    self.findOne(conditions, function(err, result) {
                        callback(err, result, false);
                    });
                })
            } else {
                callback(err, result, false)
            }
        } else {
            for (var key in doc) {
                conditions[key] = doc[key];
            }
            var obj = new self(conditions)
            obj.save(function(err) {
                callback(err, obj, true);
            });
        }
    })
}

module.exports = mongoose.model("User", userSchema);




