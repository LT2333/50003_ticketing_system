
function post_new_request(mydocument,mydb,mycollection){


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var uri = "mongodb+srv://Admin1:SUTD1111@escdb-anq5i.mongodb.net/test?retryWrites=true/";


MongoClient.connect(uri, function(err, client) {

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
   
   client.close();
   
});
   }



   module.exports.post_new_request = post_new_request;