// import the language driver
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URI for cloud mongodb server
var uri = "mongodb+srv://Admin1:SUTD1111@escdb-anq5i.mongodb.net/test?retryWrites=true/";

// Use connect method to connect to the Server
MongoClient.connect(uri, function(err, client) {

	//ensure we've connected
	assert.equal(null, err);
	if(err)
    console.log("Error while connecting to database: ", err);
    else
	console.log("Connection established successfully");

	//Now connect to the collection of user request form ^^
   var User_form = client.db("ACCENTURE_TEST1").collection("USER_REQUEST_FORM");
   
   //Get the messages from a particular user
    var filter = {Name:"Alex" };

	User_form.find(filter).toArray(function(error, messages){
    if(error)
        console.log("Error: ", error);
    else
    {
        messages.forEach(function(message){
            console.log(message);
        });
    }
});
   

	//Post-insert a single document (Here is insert one user request)
	var new_request = {
		Name:"Andy",
		Email:"Andy@gmail.com",
		Contact_Number: 87766777,
		Topic_Chosen: "API Devops",
		Message:"Hi! May I ask how do you charge for your XXX API service specifically?"
	}

	
	User_form.insertOne(new_request,function(error, result){
		if(error)
			console.log("Error: ",error);
		else
			console.log("New user request has been inserted.");
	})


	//Delete a user request accroding to the user's name
	var filter = { Name:"Andy" };
	User_form.deleteOne(filter, function(error, documents){
    if(error)
        console.log("Error: ", error);
    else
        console.log("The request has been deleted.")
});






   client.close();
});



