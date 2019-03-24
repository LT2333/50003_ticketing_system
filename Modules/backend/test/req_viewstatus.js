var request = require("request");
let chai = require("chai");
var assert = chai.assert;
var base_url = "https://courier50003.herokuapp.com";
var userSample = '5c94643a471b590004e5fd00';
var invalid_id = '243242342';


//=========================//
// For testing of Filter by status
//========================//
describe("Filtering by status", function() {
  //=========================//
  // Post 3 messages into the database with different messages and admin handles 2 of them
  //=========================//
  // Remove entries from the database before the testing
  beforeEach((done) =>{
    requestDB.remove({},(err)=>{
      done();
    });
  });
  // First message
  var options = { method: 'POST',
    url: 'https://courier50003.herokuapp.com/portal/usersubmit',
    headers:
     {
       'cache-control': 'no-cache',
       'content-type': 'application/json' },
    body:
     { email: 'test@gmail.com',
       name: 'testing king',
       contact_num: 98989898,
       message: 'this is infuriating',
       category: 'test' },
    json: true };

  request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  });
  // Second message
  var options = { method: 'POST',
    url: 'https://courier50003.herokuapp.com/portal/usersubmit',
    headers:
     {
       'cache-control': 'no-cache',
       'content-type': 'application/json' },
    body:
     { email: 'test@gmail.com',
       name: 'testing king',
       contact_num: 98989898,
       message: 'this is very good i love it',
       category: 'test' },
    json: true };

  request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  });
  // Third message
  var options = { method: 'POST',
    url: 'https://courier50003.herokuapp.com/portal/usersubmit',
    headers:
     {
       'cache-control': 'no-cache',
       'content-type': 'application/json' },
    body:
     { email: 'test@gmail.com',
       name: 'testing king',
       contact_num: 98989898,
       message: 'hello i am testing this API',
       category: 'test' },
    json: true };

  request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  });

  // Admin handles 2 of them

  //=========================//
  // TEST OF FILTER BY status
  //========================//
  // Valid filtering
  describe("GET /portal/viewstatus", function() {
    it("valid view status", function(done) {
      var options = { method: 'GET',
        url: 'https://courier50003.herokuapp.com/portal/viewstatus',
        qs: { token: userSample },
        headers:
         {
           'cache-control': 'no-cache' } };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        var firststatus = body[0].status;
        var secondstatus = body[1].status;
        var thirdstatus = body[2].status;
        assert.equal(firststatus, secondstatus);
        assert.notEqual(secondstatus,thirdstatus);
        done();
      });
      });
    });
  // _id does not exist
  describe("GET /portal/viewstatus", function() {
    it("invalid view status", function(done) {
      var options = { method: 'GET',
        url: 'https://courier50003.herokuapp.com/portal/viewstatus',
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
