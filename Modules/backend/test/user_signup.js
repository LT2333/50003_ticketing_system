var request = require("request");
let chai = require("chai");
var assert = chai.assert;
//var base_url = "localhost:1234";
var base_url = "https://courier50003.herokuapp.com";
var unique_username = "goldilocks";
var unique_email = "goldilocks@gmail.com";
var fake_password = "qwertty";
var duplicate_username_1 = "john";
var duplicate_username_2 = "mark";
var duplicate_email_1 = "john@gmail.com";
var duplicate_email_2 = "mark@gmail.com";
var real_acccount_email = "mark@gmail.com";
var real_password = "test";
var hp_num = 1234;


//=========================//
// For testing of user management SIGNUPS
//========================//
describe("User Management SIGN UPS", function() {
  //=========================//
  // TEST OF BASIC CONNECTION
  //========================//
  // Just the status code which is 200
  describe("GET /users/test", function() {
    it("returns status code 200", function(done) {
      request.get(base_url+'/user/test', function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
  });
  // Check for the body if it is equals
  describe("GET /users/test", function() {
    it("returns the sample string", function(done) {
      request.get(base_url+'/user/test', function(error, response, body) {
        assert.equal(200, response.statusCode);
        assert.equal("This is the USER_MANAGEMENT Test controller!", body)
        done();
      });
    });
  });
  //=========================//
  // TEST OF Signups
  //========================//
  // username blank
  describe("POST /users/signup", function() {
    it("username is blank sign up", function(done) {
      var options = { method: 'POST',
        url: base_url + '/user/signup',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { username: '',
           password: fake_password,
           email: unique_email,
           contact_num: hp_num },
        json: true };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.message);
        assert.equal("Error: Username field is empty", body.message);
        done();
      });
      });
    });
  // username in use
  describe("POST /users/signup", function() {
    it("username is used sign up", function(done) {
      var options = { method: 'POST',
        url: base_url + '/user/signup',
        headers:
         { 'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { username: duplicate_username_1,
           password: fake_password,
           email: unique_email,
           contact_num: hp_num
          },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("Error: Username already in use", body.message)
        done();
      });
    });
  });

  // email blank
  describe("POST /users/signup", function() {
    it("email is blank sign up", function(done) {
      var options = { method: 'POST',
        url: base_url + '/user/signup',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { username: unique_username,
           password: fake_password,
           email: '',
           contact_num: hp_num },
        json: true };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.message);
        assert.equal("Error: email field is empty", body.message);
        done();
      });
    });
  });

  // // invalid Email
  describe("POST /users/signup", function() {
    it("email is invalid sign up", function(done) {
      var options = { method: 'POST',
        url: base_url + '/user/signup',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { username: unique_username,
           password: fake_password,
           email: 'abcd',
           contact_num: hp_num },
        json: true };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.message);
        assert.equal("Error: Invalid Email", body.message);
        done();
      });
    });
  });

  // Email in use
  describe("POST /users/signup", function() {
    it("email is used sign up", function(done) {
      var options = { method: 'POST',
        url: base_url + '/user/signup',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { username: unique_username,
           password: fake_password,
           email: duplicate_email_1,
           contact_num: hp_num },
        json: true };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.message);
        assert.equal("Error: Email already in use", body.message);
        done();
      });
    });
  });

  //  password blank
  describe("POST /users/signup", function() {
    it("Password is blank sign up", function(done) {
      var options = { method: 'POST',
        url: base_url + '/user/signup',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { username: unique_username,
           password: '',
           email: unique_email,
           contact_num: 1234 },
        json: true };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.message);
        assert.equal("Error: Password field is empty", body.message);
        done();
      });
    });
  });

  // successful signup
  // describe("POST /users/signup", function() {
  //   it("Successful sign up", function(done) {
  //     var options = { method: 'POST',
  //       url: base_url + '/user/signup',
  //       headers:
  //        {
  //          'cache-control': 'no-cache',
  //          'content-type': 'application/json' },
  //       body:
  //        { username: 'Shane hanks',
  //          password: 'shane',
  //          email: 'shane@accenture.com',
  //          contact_num: 1234 },
  //       json: true };
  //     request(options, function (error, response, body) {
  //       if (error) throw new Error(error);
  //
  //       assert.equal("true", body.success);
  //       done();
  //     });
  //   });
  // });

 });
