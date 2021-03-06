//const User = require('../models/user.model');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var uri = "mongodb+srv://Admin1:SUTD1111@escdb-anq5i.mongodb.net/test?retryWrites=true/";
const mydb = "ACCENTURE_TEST1";
const mycollection = "USER_INFORMATION";
const msgcollection = "USER_REQUEST_FORM";
//const { check } = require('express-validator/check');
var Isemail = require('isemail');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// Code for the POST request to create a user
exports.user_create = function (req, res) {
  var testi = req.body.username;
  if (Isemail.validate(req.body.email) == false){
    res.send({"error":"Invalid Email"});
  } else if (req.body.password.length==0){
    res.send({"error":"Password has no length"});
  } else if (req.body.username.length==0){
    res.send({"error":"Username field is empty"});
  }   else{
  var mydocument = {
    "username":req.body.username,
    "password":req.body.password,
    "email":req.body.email,
    "time": new Date(),
    "type": "User"
  };
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
  	//ensure we've connected
  	assert.equal(null, err);
  	if(err){
      console.log("Error while connecting to database: ", err);
    }
    else{
      console.log("Connection established successfully");
    }

  	//Post
     var User_form = client.db(mydb).collection(mycollection);
     if (User_form.find({"username":req.body.username}) == null) {
       res.send({"error":"Username is being used"}); // this has to be changed next time
     } else{
     //console.log(User_form.find(req.body.username));
     User_form.insertOne(mydocument,function(error, result){
      if(error)
          console.log("Error: ",error);
      else
          console.log("New user request has been inserted.");
        });
     res.send({"objectID":testi});
     client.close();
   }
  });
}
};

// Code for the user login get requet
exports.user_verify = function (req, res) {
      var user = {username:req.params.username};
      var pass = {password:req.params.password};
      console.log(user);
      console.log(typeof user);
      if (pass==0){
        res.send({"error":"Password has no length"});
      } else if (user==0){
        res.send({"error":"Username field is empty"});
      } else{
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
    //ensure we've connected
    assert.equal(null, err);
    if(err)
      console.log("Error while connecting to database: ", err);
    else
      console.log("Connection established successfully");

    //Get

    var User_form = client.db(mydb).collection(mycollection);
    if (typeof User_form.find(user) == undefined) {
      res.send({"error":"Wrong username"});
      console.log("FALLLLL");
    } else{
    User_form.find(user).toArray(function(error, messages){
		if(error)
			console.log("Error: ", error);
		else
		{
				console.log(messages[0]);
        if(messages[0].password == pass.password){
          res.send({"objectId":"successful login"});
        } else{
          res.send({"error":"passwords do not match"});
        }
        //console.log(typeof message[0]);

		}
	});
}

       client.close();
  });
}
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

// Code for getting the messages based on username (ADMINS AND USERS)
exports.get_data = function (req, res) {
  var user = {"username":req.params.username};
  MongoClient.connect(uri, function(err, client) {

        //ensure we've connected
        assert.equal(null, err);
        if(err)
        console.log("Error while connecting to database: ", err);
        else
        console.log("Connection established successfully");

        //Get
       var User_form = client.db(mydb).collection(msgcollection);
       User_form.find(null).toArray(function(error, messages){
		if(error)
			console.log("Error: ", error);
		else
		{
      console.log(messages);
      res.send(messages);
		}
	});
       client.close();

    });
  }

exports.send_form = function (req, res) {
  var testi = req.body.Username;
  if (Isemail.validate(req.body.Email) == false){
    res.send({"error":"Invalid Email"});
  } else if (req.body.Username.length==0){
    res.send({"error":"Username field is empty"});
  }  else if (req.body.Contact_Number.length==0){
    res.send({"error":"contact number field is empty"});
  } else if (req.body.Message.length==0){
    res.send({"error":"message field is empty"});
  }
  else{
  var mydocument = {
    "Username":req.body.Username,
    "Email":req.body.Email,
    "Contact_Number":req.body.Contact_Number,
    "Topic_Chosen": req.body.Topic_Chosen,
    "Message": req.body.Message,
    "Who":"",
    "Status":"",
    "Date": new Date()
  };
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
  	//ensure we've connected
  	assert.equal(null, err);
  	if(err){
      console.log("Error while connecting to database: ", err);
    }
    else{
      console.log("Connection established successfully");
    }

  	//Post
     var User_form = client.db(mydb).collection(msgcollection);
     User_form.insertOne(mydocument,function(error, result){
      if(error)
          console.log("Error: ",error);
      else
          console.log("New message request has been inserted.");
        });
     res.send({"success":"Successfully sent message"});
     client.close();
   });
}
};
// Code for getting the messages based on username (ADMINS AND USERS)
// exports.get_data = function (req, res) {
//   var user = {"username":req.params.username};
//
//   MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
//   	//ensure we've connected
//   	assert.equal(null, err);
//   	if(err){
//       console.log("Error while connecting to database: ", err);
//     }
//     else{
//       console.log("Connection established successfully");
//     }
//
//      var User_form = client.db(mydb).collection(mycollection);
//
//      User_form.find(user).toArray(function(error, messages){
// 		if(error){
//             console.log("Error: ", error);
//         } else
// 		{
//             console.log(messages[0]['type']);
//             if (messages[0]['type'] == 'Admin'){
//               var Next_form = client.db(mydb).collection(msgcollection);
//               Next_form.find(null).toArray(function(error, messages){
//                 if(error)
//                 console.log("Error: ", error);
//                 else
//                 {
//                   messages.forEach(function(message){
//                     console.log(message);
//                   });
//                 }
// });
//             }else if (messages[0]['type'] == 'User'){
//                 User_get_request(username_filter,"ACCENTURE_TEST1","USER_REQUEST_FORM");
//             }else{
//                 console.log("Error: Neither Admin nor User");
//             }
//         }
//
//     });
//
//        client.close();
//
//     });
//
// }
//
//
//      if (User_form.find({"username":req.body.username}) != null) {
//        res.send({"error":"Username is being used"});
//      } else{
//      //console.log(User_form.find(req.body.username));
//      User_form.insertOne(mydocument,function(error, result){
//       if(error)
//           console.log("Error: ",error);
//       else
//           console.log("New user request has been inserted.");
//         });
//      res.send({"objectID":testi});
//      client.close();
//    }
//   });
// }
// };
