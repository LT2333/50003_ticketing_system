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
