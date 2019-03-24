var request = require("request");
let chai = require("chai");
var assert = chai.assert;
var base_url = "https://courier50003.herokuapp.com";
var userSample = '5c94643a471b590004e5fd00';
var invalid_id = '243242342';


//=========================//
// For testing of Filter by who
//========================//
describe("Filtering by who", function() {
  //=========================//
  // Post 3 messages into the database that we know the name and that an admin has addressed. 2 admins handle the case
  //=========================//


  //=========================//
  // TEST OF FILTER BY WHO
  //========================//
  // Valid filtering
  describe("GET /portal/viewwho", function() {
    it("valid view who", function(done) {
      var options = { method: 'GET',
        url: 'https://courier50003.herokuapp.com/portal/viewwho',
        qs: { token: userSample },
        headers:
         {
           'cache-control': 'no-cache' } };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        var firstWho = body[0].who;
        var secondWho = body[1].who;
        var thirdWho = body[2].who;
        assert.equal(firstWho, secondWho);
        assert.notEqual(secondWho,thirdWho);
        done();
      });
      });
    });
  // _id does not exist
  describe("GET /portal/viewwho", function() {
    it("invalid view who", function(done) {
      var options = { method: 'GET',
        url: 'https://courier50003.herokuapp.com/portal/viewwho',
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
