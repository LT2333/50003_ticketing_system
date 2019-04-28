var request = require("request");
let chai = require("chai");
var assert = chai.assert;
var base_url = "https://courier50003.herokuapp.com";
var userSample = '5c94643a471b590004e5fd00';
var invalid_id = '243242342';
let requestDB = '../models/REQUESTS.model.js';


//=========================//
// For testing of Filter by date
//========================//
describe("Filtering by date", function() {
  //=========================//
  // Post 3 messages into the database with different messages
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

  //=========================//
  // TEST OF FILTER BY date
  //========================//
  // Valid filtering
  describe("GET /portal/viewdate", function() {
    it("valid view date", function(done) {
      var options = { method: 'GET',
        url: 'https://courier50003.herokuapp.com/portal/viewdate',
        qs: { token: userSample },
        headers:
         {
           'cache-control': 'no-cache' } };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        var firstdate = body[0].date;
        var seconddate = body[1].date;
        var thirddate = body[2].date;
        var compareFirst = false;
        var compareSecond = false;
        // first date is the earliest
        if(firstdate<=seconddate){
          compareFirst = true;
        }
        if(seconddate<=thirddate){
          compareSecond = true;
        }
        assert.isTrue(firstdate);
        assert.isTrue(seconddate);
        done();
      });
      });
    });
  // _id does not exist
  describe("GET /portal/viewdate", function() {
    it("invalid view date", function(done) {
      var options = { method: 'GET',
        url: 'https://courier50003.herokuapp.com/portal/viewdate',
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
