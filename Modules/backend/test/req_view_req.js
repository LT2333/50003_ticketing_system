var request = require("request");
let chai = require("chai");
var assert = chai.assert;

//=========================//
// For testing of user management REQUESTS
//========================//
describe("View requests by token", function() {
  //test to see a request
  describe("GET /portal/viewreq", function() {
    it("Get a valid request. Array of chats", function(done) {
      var options = { method: 'GET',
        url: 'https://courier50003.herokuapp.com/viewreq',
        qs: { token: '5c9464d4471b590004e5fd05' },
        headers:
         {
           'cache-control': 'no-cache' } };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("object", typeof(body));
      });
    });
  });

  // blank request id
  describe("GET /portal/viewreq", function() {
    it("Get a valid request. Array of chats", function(done) {
      var options = { method: 'GET',
        url: 'https://courier50003.herokuapp.com/viewreq',
        qs: { token: '' },
        headers:
         {
           'cache-control': 'no-cache' } };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal('false', body.success);
      });
    });
  });
 });
