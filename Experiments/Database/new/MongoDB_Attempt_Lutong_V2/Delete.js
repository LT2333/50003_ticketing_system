function delete_one_request(myfilter,mydb,mycollection){


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
    
        //Delete
       var User_form = client.db(mydb).collection(mycollection);
       User_form.deleteOne(myfilter, function(error, documents){
		if(error)
			console.log("Error: ", error);
		else
			console.log("The request has been deleted.")
	});
       
       client.close();
       
    });
       }


   module.exports.delete_one_request = delete_one_request;