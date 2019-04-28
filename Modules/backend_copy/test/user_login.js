var request = require("request");
let chai = require("chai");
var assert = chai.assert;
var base_url = "https://courier50003.herokuapp.com"

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
        url: 'https://courier50003.herokuapp.com/user/login',
        headers:
         { 'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body: { password: 'test', email: 'rohit@accenture.com' },
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
       url: 'https://courier50003.herokuapp.com/user/login',
       headers:
        { 'cache-control': 'no-cache',
          'content-type': 'application/json' },
       body: { password: 'test', email: '' },
       json: true };

       request(options, function (error, response, body) {
         if (error) throw new Error(error);

         assert.equal('Error: email cannot be blank', body.message);
         console.log(body);
         done();
       });
     });
   });

   // No Password entered
   describe("POST /users/login", function() {
     it("No Password login", function(done) {
      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/user/login',
        headers:
         { 'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body: { password: '', email: 'glenn@gmail.com' },
        json: true };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          assert.equal('Error: password cannot be blank', body.message);
          console.log(body);
          done();
        });
      });
    });

    // Email not in the database
    describe("POST /users/login", function() {
      it("Not registered login", function(done) {
       var options = { method: 'POST',
         url: 'https://courier50003.herokuapp.com/user/login',
         headers:
          { 'cache-control': 'no-cache',
            'content-type': 'application/json' },
         body: { password: 'test', email: 'maxi@gmail.com' },
         json: true };

         request(options, function (error, response, body) {
           if (error) throw new Error(error);

           assert.equal('Error: Invalid too many users or no user', body.message);
           console.log(body);
           done();
         });
       });
     });

     // Invalid Password
     describe("POST /users/login", function() {
       it("Wrong password login", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/user/login',
          headers:
           { 'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body: { password: 'tesssst', email: 'mark@gmail.com' },
          json: true };

          request(options, function (error, response, body) {
            if (error) throw new Error(error);

            assert.equal('error:invalid password', body.message);
            console.log(body);
            done();
          });
        });
      });

});
