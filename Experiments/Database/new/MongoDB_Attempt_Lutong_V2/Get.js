
function  get_information(myfilter,mydb,mycollection){


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
       User_form.find(myfilter).toArray(function(error, messages){
		if(error)
			console.log("Error: ", error);
		else
		{
            console.log('yes!');
			messages.forEach(function(message){
				console.log(message);
			});
		}
	});
       client.close();
       
    });
       }



   module.exports.get_information = get_information;
   