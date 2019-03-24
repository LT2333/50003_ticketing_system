var request = require("request");
let chai = require("chai");
var assert = chai.assert;
var base_url = "https://courier50003.herokuapp.com";
var adminSample = '5c94643a471b590004e5fd00';
var invalid_id = '243242342';
let requestDB = '../models/REQUESTS.model.js';


//=========================//
// For testing of Filter by date
//========================//
describe("Filtering by admin handling", function() {
  // Post 3 messages and admin chooses to handle those 3

  //=========================//
  // TEST ADMIN VIEW REQUESTS THAT HE OR SHE HANDLES
  //========================//
  // Valid Viewing
  describe("GET /portal/adminview", function() {
    it("valid view", function(done) {
      var options = { method: 'GET',
        url: 'https://courier50003.herokuapp.com/portal/adminview',
        qs: { token: adminSample },
        headers:
         {
           'cache-control': 'no-cache' } };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        var lengthOfBody = body.length,
        assert.equal(3, lengthOfBody);
        done();
      });
      });
    });
  // _id does not exist
  describe("GET /portal/adminview", function() {
    it("invalid id", function(done) {
      var options = { method: 'GET',
        url: 'https://courier50003.herokuapp.com/portal/adminview',
        qs: { token: invalid_id },
        headers:
         {
           'cache-control': 'no-cache' } };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal('Error: Invalid', body.message);
        done();
      });
      });
    });

 });
