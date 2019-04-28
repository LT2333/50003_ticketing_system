var request = require("request");
let chai = require("chai");
var assert = chai.assert;
var base_url = "https://courier50003.herokuapp.com";

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
        url: 'https://courier50003.herokuapp.com/user/signup',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { username: '',
           name: 'jjjj',
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
           name:"eunice",
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
           name:'tom',
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
           name: 'loo',
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
           name: 'looew',
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
           name:'loosew',
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
  // name blank
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
           name:'',
           password: 'test',
           email: 'rohisst@accenture.com',
           contact_num: 1234 },
        json: true };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.error);
        assert.equal("Name field is empty", body.error);
        done();
      });
    });
  });
  // successful signup
  // describe("POST /users/signup", function() {
  //   it("Successful sign up", function(done) {
  //     var options = { method: 'POST',
  //       url: 'https://courier50003.herokuapp.com/user/signup',
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
  //       assert.equal("false", body.error);
  //       done();
  //     });
  //   });
  // });

 });
