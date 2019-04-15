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
