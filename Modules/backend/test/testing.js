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
var fake_session_id = "5c9999999990ed0004afef9a"
var real_session_id = "5c948b54d290ed0004afef9a";


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


//=========================//
// For testing of user management LOGOUTS
//========================//
describe("User Management LOG OUTS", function() {
  //=========================//
  // TEST OF Logout
  //========================//
  // Valid logout
  describe("GET /users/logout", function() {
    it("Successful logout", function(done) {
       var options = { method: 'GET',
          url: 'https://courier50003.herokuapp.com/user/logout',
          qs: { '5c948b54d290ed0004afef9a': '' },
          headers:
           {
             'cache-control': 'no-cache' } };

          request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
            console.log(typeof body);
            //console.log(body.message);
            console.log("test");
            assert.equal('{"success":true,"message":"valid logout"}', body);
            done();
          });
     });
   });

   // Invalid logout
   // describe("GET /users/logout", function() {
   //   it("Invalid logout", function(done) {
   //      var options = { method: 'GET',
   //         url: 'https://courier50003.herokuapp.com/user/logout',
   //         qs: { '5c948b54d290dd0aa4afef9a': '' },
   //         headers:
   //          {
   //            'cache-control': 'no-cache' } };
   //
   //         request(options, function (error, response, body) {
   //           if (error) throw new Error(error);
   //
   //           console.log(body);
   //           console.log(typeof body);
   //           //console.log(body.message);
   //           console.log("test");
   //           assert.equal('{"success":false,"message":"Invalid token used"}', body);
   //           done();
   //         });
   //    });
   //  });
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
  describe("GET /portal/test", function() {
    it("returns the sample string", function(done) {
      request.get(base_url+'/portal/test', function(error, response, body) {
        assert.equal(200, response.statusCode);
        assert.equal("This is the REQUESTS Test controller!", body)
        done();
      });
    });
  });
  // User SUCCESSFULLY form with no account
  // describe("POST /portal/usersubmit", function(){
  //   it("Successful Submission", function(done) {
  //       var options = { method: 'POST',
  //         url: 'https://courier50003.herokuapp.com/portal/usersubmit',
  //         headers:
  //          {
  //            'cache-control': 'no-cache',
  //            'content-type': 'application/json' },
  //         body:
  //          { name: 'yer',
  //            email: 'helllo@yahoo.com',
  //            contact_num: 1234,
  //            title:"testerday",
  //            message: 'this is frustrating',
  //            category: 'test' },
  //         json: true };
  //
  //     request(options, function (error, response, body) {
  //       if (error) throw new Error(error);
  //
  //       console.log(body);
  //       console.log(body.name);
  //       assert.equal("yer", body.name);
  //       done();
  //     });
  //   });
  // });
  // User SUCCESSFULLY form with no account
  describe("POST /portal/usersubmit", function(){
    it("Successful Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { name: 'yer',
             email: 'helllo@yahoo.com',
             contact_num: 1234,
             title:"testerday",
             message: 'print "<html>"\n print "Latest comment:"\n print database.latestComment\nprint "</html>"',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.name);
        assert.equal("yer", body.name);
        done();
      });
    });
  });

  // User SUCCESSFULLY form with no account
  describe("POST /portal/usersubmit", function(){
    it("Successful Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { name: 'yer',
             email: 'helllo@yahoo.com',
             contact_num: 1234,
             title:"testerday",
             message: 'print "<html>"\n print "Latest comment:"\n print database.latestComment\n print <script><a href="https://www.w3schools.com/" target="_blank">Visit W3Schools!</a></script>\nprint "</html>"',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.name);
        assert.equal("yer", body.name);
        done();
      });
    });
  });

  // User submits form with no account, blank message
  describe("POST /portal/usersubmit", function(){
    it("No message Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { email: 'helllo@accenture.com',
           name:"terf",
             contact_num: 1234,
             message: '',
             title:'testeray',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("message field is blank", body.error);
        done();
      });
    });
  });
  // User submits form with no account, blank email
  describe("POST /portal/usersubmit", function(){
    it("No email Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { email: '',
           name:"terf",
             contact_num: 1234,
             message: 'hello',
             title:"yelps",
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("Error: email field is empty", body.message);
        done();
      });
    });
  });
  // User submits form with no account, contact  num
  describe("POST /portal/usersubmit", function(){
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
             name:"terf",
             title:"test",
             message: 'hello',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("Error: Contact Number field is empty", body.message);
        done();
      });
    });
  });

  describe("POST /portal/usersubmit", function(){
    it("No Name Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { email: 'helllo@accenture.com',
             contact_num: 1234,
             title:"test",
             message: 'hello',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal('name field is blank', body.error);
        done();
      });
    });
  });
  // User submits form with no account, invalid email
  describe("POST /portal/usersubmit", function(){
    it("FAKE email Submission", function(done) {
        var options = { method: 'POST',
          url: 'https://courier50003.herokuapp.com/portal/usersubmit',
          headers:
           {
             'cache-control': 'no-cache',
             'content-type': 'application/json' },
          body:
           { email: 'hellloacm',
             contact_num: 1234,
             name:"terf",
             title:"testas",
             message: 'hello',
             category: 'test' },
          json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("Error: Invalid Email", body.message);
        done();
      });
    });
  });
});

// =========================//
// For testing of requests user submits form with account
// ========================//
describe("Request testing WITH ACCOUNT", function() {
  // User sumbits form with account
  // describe("POST /portal/usersubmitacc", function(){
  //   it("Successful Submission", function(done) {
  //     var options = { method: 'POST',
  //       url: 'https://courier50003.herokuapp.com/portal/usersubmitacc',
  //       headers:
  //        {
  //          'cache-control': 'no-cache',
  //          'content-type': 'application/json' },
  //       body:
  //        { id: '5c948b54d290ed0004afef9a',
  //           title:"tester",
  //           imageurl: "",
  //          message: 'this service could be much better than it currently is',
  //          category: 'test' },
  //       json: true };
  //
  //     request(options, function (error, response, body) {
  //       if (error) throw new Error(error);
  //
  //       console.log(body);
  //       assert.equal("test", body.category);
  //       done();
  //     });
  //   });
  // });
  //User dpes not fill in a message
  describe("POST /portal/usersubmitacc", function(){
    it("Submit without a message Submission", function(done) {
      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/usersubmitacc',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { id: '5c948b54d290ed0004afef9a',
         title:"tester",
         imageurl:"",
           message: '',
           category: 'test' },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("message field is blank", body.error);
        done();
      });
    });
  });
  // User does not fill in the title
  describe("POST /portal/usersubmitacc", function(){
    it("Submit without a title Submission", function(done) {
      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/usersubmitacc',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { id: '5c948b54d290ed0004afef9a',
         title:"",
         imageurl:"",
           message: 'hello i am groot',
           category: 'test' },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("title field is blank", body.error);
        done();
      });
    });
  });

  describe("POST /portal/usersubmitacc", function(){
    it("Submit without a valid account", function(done) {
      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/usersubmitacc',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { id: '5c948b54d290ed000000009a',
         title:"valid title",
         imageurl:"",
           message: 'hello i am groot',
           category: 'test' },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal('Error: session does not exist', body.message);
        done();
      });
    });
  });
});



//=========================//
// For testing of sending chats
//========================//
describe("Request send chats", function() {
 //  // Valid chat sent
 //  describe("POST /portal/chats", function() {
 //    it("Successful chat sent", function(done) {
 //      var request = require("request");
 //
 //      var options = { method: 'POST',
 //        url: 'https://courier50003.herokuapp.com/portal/chats',
 //        headers:
 //         { 'cache-control': 'no-cache',
 //           'content-type': 'application/json' },
 //        body:
 //         { requestor_id: '5c948b54d290ed0004afef9a',
 //           request_id: '5c94bab2865f15000429d38e', // change this
 //           conversastion: 'Great' },
 //        json: true };
 //
 //      request(options, function (error, response, body) {
 //        if (error) throw new Error(error);
 //
 //        assert.equal('Chat sent successfully', body.message);
 //        console.log(body);
 //        done();
 //      });
 //   });
 // });

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
        {requestor_id: '5c948b54d290ed0004afef9a',
          request_id: '5c94bab2865f15000429d38e', // change this
          conversastion: '' },
       json: true };

     request(options, function (error, response, body) {
       if (error) throw new Error(error);

       console.log(body);
       assert.equal('Error: conversastion cannot be blank', body.message);
       done();
     });
  });
});

// NO Requestor ID sent
describe("POST /portal/chats", function() {
  it("Requestor ID not sent", function(done) {
    var request = require("request");

    var options = { method: 'POST',
      url: 'https://courier50003.herokuapp.com/portal/chats',
      headers:
       { 'cache-control': 'no-cache',
         'content-type': 'application/json' },
      body:
       {requestor_id: '',
         request_id: '5c94bab2865f15000429d38e', // change this
         conversastion: 'yelps' },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
      assert.equal('Error: Requestor ID not sent', body.message);
      done();
    });
 });
});

// NO Request ID sent
describe("POST /portal/chats", function() {
  it("Request ID not sent", function(done) {
    var request = require("request");

    var options = { method: 'POST',
      url: 'https://courier50003.herokuapp.com/portal/chats',
      headers:
       { 'cache-control': 'no-cache',
         'content-type': 'application/json' },
      body:
       {requestor_id: '5c948b54d290ed0004afef9a',
         request_id: '', // change this
         conversastion: 'yelps' },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
      assert.equal('Error: Request ID not sent', body.message);
      done();
    });
 });
});

// Invalid user ID
describe("POST /portal/chats", function() {
  it("Invalid Requestor ID", function(done) {
    var request = require("request");

    var options = { method: 'POST',
      url: 'https://courier50003.herokuapp.com/portal/chats',
      headers:
       { 'cache-control': 'no-cache',
         'content-type': 'application/json' },
      body:
       {requestor_id: '5c948b54d290ed0000000f9a',
         request_id: '5c94bab2865f15000429d38e', // change this
         conversastion: 'yelps' },
      json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal('Error: session does not exist', body.message);
        done();
      });
   });
  });
});

//=========================//
// For testing of admin handle
//========================//
describe("Admin handle requests", function() {
  //=========================//
  // TEST OF BASIC CONNECTION
  //========================//
  // Successful handling of request
  describe("POST /portal/adminhandle", function() {
    it("Valid handle", function(done) {
      var request = require("request");

      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/adminhandle',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { admin_id: "5cafe17b64404d000479a29e",
           request_id: "5c94bab2865f15000429d38e" },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal(true,body.success);
        done();
      });
    });
  });
  // admin id blank
  describe("POST /portal/adminhandle", function() {
    it("No id handle", function(done) {
      var request = require("request");

      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/adminhandle',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { admin_id: "",
           request_id:  "5c94bab2865f15000429d38e" },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal('Error: Admin ID not sent',body.message);
        done();
      });
    });
  });
  // request id blank
  describe("POST /portal/adminhandle", function() {
    it("request id blank handle", function(done) {
      var request = require("request");

      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/adminhandle',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { admin_id: "5cafe17b64404d000479a29e",
           request_id: "" },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("Error: Requests id not sent",body.message);
        done();
      });
    });
  });
  // admin id does not exist
  describe("POST /portal/adminhandle", function() {
    it("admin id does not exist", function(done) {
      var request = require("request");

      var options = { method: 'POST',
        url: 'https://courier50003.herokuapp.com/portal/adminhandle',
        headers:
         {
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body:
         { admin_id: "5cafe17b64404d000000029e",
           request_id: "5c94bab2865f15000429d38e" },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal('Error: session does not exist',body.message);
        done();
      });
    });
  });

 });

 //=========================//
 // For testing of admin complete
 //========================//
 describe("Admin complete requests", function() {
   //=========================//
   // TEST OF BASIC CONNECTION
   //========================//
   // Successful handling of request
   describe("POST /portal/admincomplete", function() {
     it("Valid complete", function(done) {
       var request = require("request");

       var options = { method: 'POST',
         url: 'https://courier50003.herokuapp.com/portal/admincomplete',
         headers:
          {
            'cache-control': 'no-cache',
            'content-type': 'application/json' },
         body:
          { admin_id: "5cafe17b64404d000479a29e",
            request_id: "5c94bab2865f15000429d38e" },
         json: true };

       request(options, function (error, response, body) {
         if (error) throw new Error(error);

         console.log(body);
         assert.equal(true,body.success);
         done();
       });
     });
   });
   // admin id blank
   describe("POST /portal/admincomplete", function() {
     it("No id handle", function(done) {
       var request = require("request");

       var options = { method: 'POST',
         url: 'https://courier50003.herokuapp.com/portal/admincomplete',
         headers:
          {
            'cache-control': 'no-cache',
            'content-type': 'application/json' },
         body:
          { admin_id: "",
            request_id:  "5c94bab2865f15000429d38e" },
         json: true };

       request(options, function (error, response, body) {
         if (error) throw new Error(error);

         console.log(body);
         assert.equal('Error: Admin ID not sent',body.message);
         done();
       });
     });
   });
   // request id blank
   describe("POST /portal/admincomplete", function() {
     it("request id blank handle", function(done) {
       var request = require("request");

       var options = { method: 'POST',
         url: 'https://courier50003.herokuapp.com/portal/admincomplete',
         headers:
          {
            'cache-control': 'no-cache',
            'content-type': 'application/json' },
         body:
          { admin_id: "5cafe17b64404d000479a29e",
            request_id: "" },
         json: true };

       request(options, function (error, response, body) {
         if (error) throw new Error(error);

         console.log(body);
         assert.equal("Error: Requests id not sent",body.message);
         done();
       });
     });
   });
   // admin id does not exist
   describe("POST /portal/admincomplete", function() {
     it("admin id does not exist", function(done) {
       var request = require("request");

       var options = { method: 'POST',
         url: 'https://courier50003.herokuapp.com/portal/admincomplete',
         headers:
          {
            'cache-control': 'no-cache',
            'content-type': 'application/json' },
         body:
          { admin_id: "5cafe17b64404d000000029e",
            request_id: "5c94bab2865f15000429d38e" },
         json: true };

       request(options, function (error, response, body) {
         if (error) throw new Error(error);

         console.log(body);
         assert.equal('Error: session does not exist',body.message);
         done();
       });
     });
   });

  });

  //=========================//
  // For testing of user management REQUESTS
  //========================//
  describe("View requests by token", function() {
    //test to see a blank chat
    describe("GET /portal/viewreq", function() {
      it("NO chat", function(done) {
        var options = { method: 'GET',
          url: 'https://courier50003.herokuapp.com/portal/viewreq',
          qs: { token: '5caf4572efcba700046783a0' },
          headers:
           {
             'cache-control': 'no-cache' } };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);
          console.log(typeof(body));
          var emptyChat = '[]';
          assert.equal(emptyChat, body);
          done();
        });
      });
    });

    // //test to see a valid chat
    // describe("GET /portal/viewreq", function() {
    //   it("NO chat", function(done) {
    //     var options = { method: 'GET',
    //       url: 'https://courier50003.herokuapp.com/portal/viewreq',
    //       qs: { token: '5c9464d4471b590004e5fd05' },
    //       headers:
    //        {
    //          'cache-control': 'no-cache' } };
    //
    //     request(options, function (error, response, body) {
    //       if (error) throw new Error(error);
    //
    //       console.log(body);
    //       var emptyChat = [];
    //       assert.equal(Object, typeof(body));
    //     });
    //   });
    // });

    // blank request id
    describe("GET /portal/viewreq", function() {
      it("BLANK REQ ID", function(done) {
        var options = { method: 'GET',
          url: 'https://courier50003.herokuapp.com/portal/viewreq',
          qs: { token: '' },
          headers:
           {
             'cache-control': 'no-cache' } };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);
          assert.equal("string", typeof(body));
          done();
        });
      });
    });

    // // blank request id
    // describe("GET /portal/viewreq", function() {
    //   it("Get a valid request. Array of chats", function(done) {
    //     var options = { method: 'GET',
    //       url: 'https://courier50003.herokuapp.com/portal/viewreq',
    //       qs: { token: '5c9464d4471b590004e5fd05' },
    //       headers:
    //        {
    //          'cache-control': 'no-cache' } };
    //
    //     request(options, function (error, response, body) {
    //       if (error) throw new Error(error);
    //
    //       console.log(typeof(body));
    //       assert.equal("string", typeof(body));
    //     });
    //   });
    // });
   });
