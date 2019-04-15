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
// For testing of user management LOGIN
//========================//
describe("User Management LOG INS", function() {
  //=========================//
  // TEST OF Login
  //========================//
  // Valid login
  describe("POST /users/login", function() {
    it("Successful login", function(done) {
     var options = { method: 'POST',
       url: base_url + '/user/login',
       headers:
        { 'cache-control': 'no-cache',
          'content-type': 'application/json' },
       body: { password: real_password, email: real_acccount_email },
       json: true };

     request(options, function (error, response, body) {
       if (error) throw new Error(error);

       assert.equal('Valid sign in', body.message);
       console.log(body);
       done();
     });
   });
 });

 // No Email entered
 describe("POST /users/login", function() {
   it("No Email login", function(done) {
    var options = { method: 'POST',
      url: base_url + '/user/login',
      headers:
       { 'cache-control': 'no-cache',
         'content-type': 'application/json' },
      body: { password: fake_password, email: '' },
      json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        assert.equal("Error: email field is empty", body.message);
        console.log(body);
        done();
      });
    });
  });

  // No Password entered
  describe("POST /users/login", function() {
    it("No Password login", function(done) {
     var options = { method: 'POST',
       url: base_url + '/user/login',
       headers:
        { 'cache-control': 'no-cache',
          'content-type': 'application/json' },
       body: { password: '', email: real_acccount_email },
       json: true };

       request(options, function (error, response, body) {
         if (error) throw new Error(error);

         assert.equal('Error: Password field is empty', body.message);
         console.log(body);
         done();
       });
     });
   });

   // Email not in the database
   describe("POST /users/login", function() {
     it("Not registered login", function(done) {
      var options = { method: 'POST',
        url: base_url + '/user/login',
        headers:
         { 'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body: { password: fake_password, email: unique_email },
        json: true };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          assert.equal('Error: account does not exist', body.message);
          console.log(body);
          done();
        });
      });
    });

    // Invalid Password
    describe("POST /users/login", function() {
      it("Wrong password login", function(done) {
       var options = { method: 'POST',
         url: base_url + '/user/login',
         headers:
          { 'cache-control': 'no-cache',
            'content-type': 'application/json' },
         body: { password: fake_password, email: real_acccount_email },
         json: true };

         request(options, function (error, response, body) {
           if (error) throw new Error(error);

           assert.equal('Error:invalid password', body.message);
           console.log(body);
           done();
         });
       });
     });

});
