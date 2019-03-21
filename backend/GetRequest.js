
function GetRequest(username_filter){
    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var uri = "mongodb+srv://Admin1:SUTD1111@escdb-anq5i.mongodb.net/test?retryWrites=true/";
     
    MongoClient.connect(uri, function(err, client) {

        assert.equal(null, err);
        if(err){
        console.log("Error while connecting to database: ", err);}
    
       var User_form = client.db("ACCENTURE_TEST1").collection("USER_INFORMATION");

       User_form.find(username_filter).toArray(function(error, messages){
		if(error){
            console.log("Error: ", error);
        }   
		else
		{
            console.log(messages[0]['type']);
            if (messages[0]['type'] == 'Admin'){
                Admin_get_all_request("ACCENTURE_TEST1","USER_REQUEST_FORM");
            }else if (messages[0]['type'] == 'User'){
                User_get_request(username_filter,"ACCENTURE_TEST1","USER_REQUEST_FORM");
            }else{
                console.log("Error: Neither Admin nor User");
            }
        }

    });
    
       client.close();
       
    });
    
}


//How-to-use
//GetRequest({username:"glenn"});






function  Admin_get_all_request(mydb,mycollection){


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
       User_form.find(null).toArray(function(error, messages){
		if(error)
			console.log("Error: ", error);
		else
		{  
			messages.forEach(function(message){
				console.log(message);
			});
		}
	});
       client.close();
       
    });
       }
//How to use:
//Admin_get_all_request("ACCENTURE_TEST1","USER_REQUEST_FORM");

function  User_get_request(myfilter,mydb,mycollection){


    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var uri = "mongodb+srv://Admin1:SUTD1111@escdb-anq5i.mongodb.net/test?retryWrites=true/";
    
    
    MongoClient.connect(uri, function(err, client) {
    
        //ensure we've connected
        assert.equal(null, err);
        if(err){
        console.log("Error while connecting to database: ", err);}
        
    
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
//How to use:
//var filter = {Name : "Andy"};
//User_get_request(filter,"ACCENTURE_TEST1","USER_REQUEST_FORM");