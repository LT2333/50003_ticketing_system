var request = require("request");
let chai = require("chai");
var assert = chai.assert;
var base_url = "https://courier50003.herokuapp.com";
var userSample = '5c94643a471b590004e5fd00';
var invalid_id = '243242342';
let requestDB = '../models/REQUESTS.model.js';

//=========================//
// For testing of Filter by priority
//========================//
describe("Filtering by priority", function() {
  //=========================//
  // Post 3 messages into the database with different messages (Ranging in tone)
  //=========================//
  // Remove entries from database
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
  // TEST OF FILTER BY priority
  //========================//
  // Valid filtering
  describe("GET /portal/viewpriority", function() {
    it("valid view priority", function(done) {
      var options = { method: 'GET',
        url: 'https://courier50003.herokuapp.com/portal/viewpriority',
        qs: { token: userSample },
        headers:
         {
           'cache-control': 'no-cache' } };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        var firstpriority = body[0].priority;
        var secondpriority = body[1].priority;
        var thirdpriority = body[2].priority;
        var compareFirst = false;
        var compareSecond = false;
        if(firstpriority>=secondpriority){
          compareFirst = true;
        }
        if(secondpriority>=thirdpriority){
          compareSecond = true;
        }
        assert.isTrue(firstpriority);
        assert.isTrue(secondpriority);
        done();
      });
      });
    });
  // _id does not exist
  describe("GET /portal/viewpriority", function() {
    it("invalid view priority", function(done) {
      var options = { method: 'GET',
        url: 'https://courier50003.herokuapp.com/portal/viewpriority',
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
