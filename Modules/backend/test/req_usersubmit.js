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
