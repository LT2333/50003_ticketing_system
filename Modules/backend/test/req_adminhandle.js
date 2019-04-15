var request = require("request");
let chai = require("chai");
var assert = chai.assert;
var base_url = "https://courier50003.herokuapp.com";
var admin_id = "5cafe17b64404d000479a29e";
var request_id = "5c94bab2865f15000429d38e";


//=========================//
// For testing of ADMIN HANDLING
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
         { admin_id: admin_id,
           request_id: request_id },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("true",body.success);
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
           request_id: request_id },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("front-end please send admin's id",body.error);
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
         { admin_id: admin_id,
           request_id: "" },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        assert.equal("front-end please send request's id",body.error);
        done();
      });
    });
  });
  // admin id does not exist


 });



 // 
 //
 // //=========================//
 // // For testing of admin handle
 // //========================//
 // describe("Admin handle requests", function() {
 //   //=========================//
 //   // TEST OF BASIC CONNECTION
 //   //========================//
 //   // Successful handling of request
 //   describe("POST /portal/adminhandle", function() {
 //     it("Valid handle", function(done) {
 //       var request = require("request");
 //
 //       var options = { method: 'POST',
 //         url: 'https://courier50003.herokuapp.com/portal/adminhandle',
 //         headers:
 //          {
 //            'cache-control': 'no-cache',
 //            'content-type': 'application/json' },
 //         body:
 //          { admin_id: "5cafe17b64404d000479a29e",
 //            request_id: "5c94bab2865f15000429d38e" },
 //         json: true };
 //
 //       request(options, function (error, response, body) {
 //         if (error) throw new Error(error);
 //
 //         console.log(body);
 //         assert.equal(true,body.success);
 //         done();
 //       });
 //     });
 //   });
 //   // admin id blank
 //   describe("POST /portal/adminhandle", function() {
 //     it("No id handle", function(done) {
 //       var request = require("request");
 //
 //       var options = { method: 'POST',
 //         url: 'https://courier50003.herokuapp.com/portal/adminhandle',
 //         headers:
 //          {
 //            'cache-control': 'no-cache',
 //            'content-type': 'application/json' },
 //         body:
 //          { admin_id: "",
 //            request_id:  "5c94bab2865f15000429d38e" },
 //         json: true };
 //
 //       request(options, function (error, response, body) {
 //         if (error) throw new Error(error);
 //
 //         console.log(body);
 //         assert.equal('Error: Admin ID not sent',body.message);
 //         done();
 //       });
 //     });
 //   });
 //   // request id blank
 //   describe("POST /portal/adminhandle", function() {
 //     it("request id blank handle", function(done) {
 //       var request = require("request");
 //
 //       var options = { method: 'POST',
 //         url: 'https://courier50003.herokuapp.com/portal/adminhandle',
 //         headers:
 //          {
 //            'cache-control': 'no-cache',
 //            'content-type': 'application/json' },
 //         body:
 //          { admin_id: "5cafe17b64404d000479a29e",
 //            request_id: "" },
 //         json: true };
 //
 //       request(options, function (error, response, body) {
 //         if (error) throw new Error(error);
 //
 //         console.log(body);
 //         assert.equal("Error: Requests id not sent",body.message);
 //         done();
 //       });
 //     });
 //   });
 //   // admin id does not exist
 //   describe("POST /portal/adminhandle", function() {
 //     it("admin id does not exist", function(done) {
 //       var request = require("request");
 //
 //       var options = { method: 'POST',
 //         url: 'https://courier50003.herokuapp.com/portal/adminhandle',
 //         headers:
 //          {
 //            'cache-control': 'no-cache',
 //            'content-type': 'application/json' },
 //         body:
 //          { admin_id: "5cafe17b64404d000000029e",
 //            request_id: "5c94bab2865f15000429d38e" },
 //         json: true };
 //
 //       request(options, function (error, response, body) {
 //         if (error) throw new Error(error);
 //
 //         console.log(body);
 //         assert.equal('Error: session does not exist',body.message);
 //         done();
 //       });
 //     });
 //   });
