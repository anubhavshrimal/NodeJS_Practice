/**
 * Created by anubhavshrimal on 03/08/16.
 */

module.exports = {
    "getStudents": getStudents
};

function getStudents(req, res){
    res.send(['abc', 'def']);
}