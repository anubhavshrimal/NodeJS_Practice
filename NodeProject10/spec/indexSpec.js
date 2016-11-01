/**
 * Created by anubhavshrimal on 7/7/16.
 */

var index = require("../index");
var request = require("request");
var url = "http://localhost:8888";

describe("Index Test", () => {

    describe("GET /", () => {

        beforeEach( () => {
            console.log("running");
        });

        it("i get Hello", (done) => {
            request(url+"/", (err, res, body) => {
                expect(body).toBe("hello");
                done();
            });
        });

        it("i get status 200", (done) => {
            request(url+"/", (err, res, body) => {
                expect(res.statusCode).toBe(200);
                index.server.close();   // to stop the test
                done();
            });
        });

    });
});
