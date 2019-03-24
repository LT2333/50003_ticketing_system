var request = require("request");
let chai = require("chai");
var assert = chai.assert;
var base_url = "https://courier50003.herokuapp.com"


//=========================//
// For testing of Filter by who
//========================//
describe("Filtering by who", function() {
  //=========================//
  // Post 2 messages into the database that we know the name and that an admin has addressed
  //=========================//


  //=========================//
  // TEST OF Signups
  //========================//
  // username blank
  describe("POST /users/signup", function() {
    it("username is blank sign up", function(done) {
      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/user/signup',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { username: '',
           password: 'test',
           email: 'jjjj@gmail.com',
           contact_num: 1234 },
        json: true };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.error);
        assert.equal("Username field is empty", body.error);
        done();
      });
      });
    });
  // username in use
  describe("POST /users/signup", function() {
    it("username is used sign up", function(done) {
      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/user/signup',
        headers:
         { 'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { username: 'eunice',
           password: 'test',
           email: 'hello@gmail.com',
           contact_num: 1234 },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal('error:Username already exists', body)
        done();
      });
    });
  });

  // email blank
  describe("POST /users/signup", function() {
    it("email is blank sign up", function(done) {
      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/user/signup',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { username: 'tom hanks',
           password: 'test',
           email: '',
           contact_num: 1234 },
        json: true };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.error);
        assert.equal("email field is empty", body.error);
        done();
      });
    });
  });

  // // invalid Email
  describe("POST /users/signup", function() {
    it("email is invalid sign up", function(done) {
      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/user/signup',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { username: 'loo hanks',
           password: 'test',
           email: 'abcd',
           contact_num: 1234 },
        json: true };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.error);
        assert.equal("Invalid Email", body.error);
        done();
      });
    });
  });

  // Email in use
  describe("POST /users/signup", function() {
    it("email is used sign up", function(done) {
      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/user/signup',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { username: 'looew hanks',
           password: 'test',
           email: 'rohit@accenture.com',
           contact_num: 1234 },
        json: true };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.error);
        assert.equal('error:Email already used', body);
        done();
      });
    });
  });

  //  password blank
  describe("POST /users/signup", function() {
    it("Password is blank sign up", function(done) {
      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/user/signup',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { username: 'loosew hanks',
           password: '',
           email: 'rohisst@accenture.com',
           contact_num: 1234 },
        json: true };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.error);
        assert.equal("Password field is empty", body.error);
        done();
      });
    });
  });


 });
