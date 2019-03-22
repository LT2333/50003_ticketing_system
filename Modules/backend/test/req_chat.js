var request = require("request");
let chai = require("chai");
var assert = chai.assert;
var base_url = "https://courier50003.herokuapp.com"


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
           request_id: '5c94979bd290ed0004afefa7', // change this
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
          request_id: '5c94979bd290ed0004afefa7', // change this
          conversastion: '' },
       json: true };

     request(options, function (error, response, body) {
       if (error) throw new Error(error);

       assert.equal("front-end please send request's id", body.message);
       console.log(body);
       done();
     });
  });
});
});
