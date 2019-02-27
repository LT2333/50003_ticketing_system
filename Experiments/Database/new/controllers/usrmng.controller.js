//const User = require('../models/user.model');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var uri = "mongodb+srv://Admin1:SUTD1111@escdb-anq5i.mongodb.net/test?retryWrites=true/";
const mydb = "ACCENTURE_TEST1";
const mycollection = "USER_INFORMATION";

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// Code for the POST request to create a user
exports.user_create = function (req, res) {
  var testi = req.body.username;
  var mydocument = {
    "username":req.body.username,
    "password":req.body.password,
    "email":req.body.email
  };
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
  	//ensure we've connected
  	assert.equal(null, err);
  	if(err)
      console.log("Error while connecting to database: ", err);
      else
  	console.log("Connection established successfully");

  	//Post
     var User_form = client.db(mydb).collection(mycollection);
     User_form.insertOne(mydocument,function(error, result){
      if(error)
          console.log("Error: ",error);
      else
          console.log("New user request has been inserted.");
  })
     res.end(testi);
     client.close();
  });
};

// Code for the get request
exports.user_verify = function (req, res) {
      var user = {username:req.params.username};
      console.log(user);
      console.log(typeof user);
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
    //ensure we've connected
    assert.equal(null, err);
    if(err)
      console.log("Error while connecting to database: ", err);
    else
      console.log("Connection established successfully");

    //Get
    var User_form = client.db(mydb).collection(mycollection);
    User_form.find(user).toArray(function(error, messages){
		if(error)
			console.log("Error: ", error);
		else
		{
            console.log('yes!');
			messages.forEach(function(message){
				console.log(message);
        console.log(typeof message);
        res.end(message.password);
			});
		}
	});

       client.close();
  });

}

// Code for the delete user
exports.user_delete = function (req, res) {
      var user_del = req.params.username
      var user = {username:req.params.username};
      console.log(user);
      console.log(typeof user);
      MongoClient.connect(uri, function(err, client) {

            //ensure we've connected
            assert.equal(null, err);
            if(err)
            console.log("Error while connecting to database: ", err);
            else
            console.log("Connection established successfully");

            //Delete
           var User_form = client.db(mydb).collection(mycollection);
           User_form.deleteOne(user, function(error, documents){
    		if(error)
    			console.log("Error: ", error);
    		else
    			console.log("The request has been deleted.")
          res.send("Deleted" + user_del)
    	});

           client.close();

        });

}
