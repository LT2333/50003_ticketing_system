var request = require("request");
let chai = require("chai");
var assert = chai.assert;
var base_url = "https://courier50003.herokuapp.com"


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



//=========================//
//For testing of requests user submits form
//========================//
describe("Request testing", function() {
  // Just the status code which is 200
  describe("GET /portal/test", function() {
    it("returns status code 200", function(done) {
      request.get(base_url+'/portal/test', function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
  });
  // Check for the body if it is equals
  describe("Request testing", function() {
    it("returns the sample string", function(done) {
      request.get(base_url+'/portal/test', function(error, response, body) {
        assert.equal(200, response.statusCode);
        assert.equal("This is the REQUESTS Test controller!", body)
        done();
      });
    });
  });
  // User sumbits form with no account
  describe("GET /portal/usersubmit", function(){
    it("Successful Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { email: 'helllo@accenture.com',
             contact_num: 1234,
             message: 'this is infuriating',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.username);
        assert.equal("no account", body.username);
        done();
      });
    });
  });
  // User submits form with no account, blank message
  describe("GET /portal/usersubmit", function(){
    it("No message Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { email: 'helllo@accenture.com',
             contact_num: 1234,
             message: '',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("You have not typed a message", body.error);
        done();
      });
    });
  });
  // User submits form with no account, blank email
  describe("GET /portal/usersubmit", function(){
    it("No email Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { email: '',
             contact_num: 1234,
             message: 'hello',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("email field is empty", body.error);
        done();
      });
    });
  });
  // User submits form with no account, blank email
  describe("GET /portal/usersubmit", function(){
    it("No contact num Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { email: 'helllo@accenture.com',
             contact_num: "",
             message: 'hello',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("Contact Number field is empty", body.error);
        done();
      });
    });
  });
  // User submits form with no account, invalid email
  describe("GET /portal/usersubmit", function(){
    it("No email Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { email: 'hellloacm',
             contact_num: 1234,
             message: 'hello',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("Invalid Email", body.error);
        done();
      });
    });
  });
});

// =========================//
// For testing of requests user submits form with account
// ========================//
describe("Request testing with account", function() {
  // User sumbits form with account
  describe("GET /portal/usersubmitacc", function(){
    it("Successful Submission", function(done) {
      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/usersubmitacc',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { id: '5c9464b3471b590004e5fd04',
           message: 'this service could be much better than it currently is',
           category: 'test' },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("eunice", body.username);
        done();
      });
    });
  });
  //User dpes not fill in a message
  describe("GET /portal/usersubmitacc", function(){
    it("Submit without a message Submission", function(done) {
      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/usersubmitacc',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { id: '5c9464a2471b590004e5fd02',
           message: '',
           category: 'test' },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("You have not typed a message", body.error);
        done();
      });
    });
  });
});



//=========================//
// For testing of sending chats
//========================//
describe("Request send chats", function() {
  // Valid chat sent
  describe("POST /portal/chats", function() {
    it("Successful chat sent", function(done) {
      var request = require("request");

      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/chats',
        headers:
         { 'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { admin_id: '5c94643a471b590004e5fd00',
           request_id: '5c94a2370c04570004482ed7', // change this
           conversastion: 'Great' },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        assert.equal('Chat sent', body.message);
        console.log(body);
        done();
      });
   });
 });

 // Nothing typed into conversation
 describe("POST /portal/chats", function() {
   it("Chat message empty", function(done) {
     var request = require("request");

     var options = { method: 'POST',
       url: 'https://courier50003.herokuapp.com/portal/chats',
       headers:
        { 'cache-control': 'no-cache',
          'content-type': 'application/json' },
       body:
        { admin_id: '5c94643a471b590004e5fd00',
          request_id: '5c94a2370c04570004482ed7', // change this
          conversastion: '' },
       json: true };

     request(options, function (error, response, body) {
       if (error) throw new Error(error);

       console.log(body);
       assert.equal("front-end please send request's id", body.error);
       done();
     });
  });
});
});
