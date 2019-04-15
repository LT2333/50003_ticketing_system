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
        assert.equal('Error: account does not exist', body.message);
        done();
      });
    });
  });
});
