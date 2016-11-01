/**
 * Created by anubhavshrimal on 03/08/16.
 */
var apis = require('../API');

module.exports = (function (app) {
    app.get("/", apis.getStudents);
});
