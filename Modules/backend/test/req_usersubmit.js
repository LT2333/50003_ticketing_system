var request = require("request");
let chai = require("chai");
var assert = chai.assert;
var base_url = "https://courier50003.herokuapp.com"

//=========================//
// For testing of requests user submits form
//========================//
describe("Request testing", function() {
  // Just the status code which is 200
  describe("GET /portal/test", function() {
    it("returns status code 200", function(done) {
      request.get(base_url+'/portal/test', function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
  });
  // Check for the body if it is equals
  describe("Request testing", function() {
    it("returns the sample string", function(done) {
      request.get(base_url+'/portal/test', function(error, response, body) {
        assert.equal(200, response.statusCode);
        assert.equal("This is the REQUESTS Test controller!", body)
        done();
      });
    });
  });
  // User sumbits form with no account
  describe("GET /portal/usersubmit", function(){
    it("Successful Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { email: 'helllo@accenture.com',
             contact_num: 1234,
             message: 'this is infuriating',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.username);
        assert.equal("no account", body.username);
        done();
      });
    });
  });
  // User submits form with no account, blank message
  describe("GET /portal/usersubmit", function(){
    it("No message Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { email: 'helllo@accenture.com',
             contact_num: 1234,
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
  // User submits form with no account, blank email
  describe("GET /portal/usersubmit", function(){
    it("No email Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { email: '',
             contact_num: 1234,
             message: 'hello',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("email field is empty", body.error);
        done();
      });
    });
  });
  // User submits form with no account, blank email
  describe("GET /portal/usersubmit", function(){
    it("No contact num Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { email: 'helllo@accenture.com',
             contact_num: "",
             message: 'hello',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("Contact Number field is empty", body.error);
        done();
      });
    });
  });
  // User submits form with no account, invalid email
  describe("GET /portal/usersubmit", function(){
    it("No email Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { email: 'hellloacm',
             contact_num: 1234,
             message: 'hello',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("Invalid Email", body.error);
        done();
      });
    });
  });
});
