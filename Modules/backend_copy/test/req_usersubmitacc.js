var request = require("request");
let chai = require("chai");
var assert = chai.assert;
var base_url = "https://courier50003.herokuapp.com";

//=========================//
// For testing of requests user submits form with account
//========================//
describe("Request testing with account", function() {
  // User sumbits form with account
  describe("GET /portal/usersubmitacc", function(){
    it("Successful Submission", function(done) {
      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/usersubmitacc',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { id: '5c9464a2471b590004e5fd02',
           message: 'this service could be much better than it currently is',
           category: 'test' },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("john", body.username);
        done();
      });
    });
  });
  // User dpes not fill in a message
  describe("GET /portal/usersubmitacc", function(){
    it("Submit without a message Submission", function(done) {
      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/usersubmitacc',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { id: '5c9464a2471b590004e5fd02',
           message: '',
           category: 'test' },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("You have not typed a message", body.error);
        done();
      });
    });
  });
});
