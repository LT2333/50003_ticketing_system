function  getpassword(username,mydb,mycollection){


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
    
        //Get
       var User_form = client.db(mydb).collection(mycollection);
       User_form.find(username).toArray(function(error, messages){
		if(error)
			console.log("Error: ", error);
		else
		{
			messages.forEach(function(message){
				console.log(message['password']);
			});
		}
	});
       client.close();
       
    });
       }
       //How-to-use:
       //var filter = {username:"Alex" };
       //getpassword(filter,"ACCENTURE_TEST1","USER_INFORMATION"); 

   module.exports.getpassword = getpassword;

    