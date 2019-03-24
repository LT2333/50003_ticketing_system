var request = require("request");
let chai = require("chai");
var assert = chai.assert;
var base_url = "https://courier50003.herokuapp.com";
var admin_id = "5c8cd5ca82951b2ab08496ca";
var request_id = "5c8e0b4b3facd432b444d97b";


//=========================//
// For testing of ADMIN HANDLING
//========================//
describe("Admin complete requests", function() {
  //=========================//
  // TEST OF BASIC CONNECTION
  //========================//
  // Successful handling of request
  describe("POST /portal/admincomplete", function() {
    it("Valid handle", function(done) {
      var request = require("request");

      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/admincomplete',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { admin_id: admin_id,
           request_id: request_id },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("true",body.success);
        done();
      });
    });
  });
  // admin id blank
  describe("POST /portal/admincomplete", function() {
    it("No id handle", function(done) {
      var request = require("request");

      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/admincomplete',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { admin_id: "",
           request_id: request_id },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("front-end please send admin's id",body.error);
        done();
      });
    });
  });
  // request id blank
  describe("POST /portal/admincomplete", function() {
    it("request id blank handle", function(done) {
      var request = require("request");

      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/admincomplete',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { admin_id: admin_id,
           request_id: "" },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("front-end please send request's id",body.error);
        done();
      });
    });
  });
  // admin id does not exist


 });
