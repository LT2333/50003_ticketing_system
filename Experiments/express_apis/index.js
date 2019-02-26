const express = require('express');
const app = express();

// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
//
// // Connection URI for cloud mongodb server
// var uri = "mongodb+srv://Admin1:SUTD1111@escdb-anq5i.mongodb.net/test?retryWrites=true/";
//
// // Use connect method to connect to the Server
// MongoClient.connect(uri, function(err, client) {
//
// 	//ensure we've connected
// 	assert.equal(null, err);
// 	if(err){
//     console.log("Error while connecting to database: ", err);
//   }
//   else{
//     console.log("Connection established successfully");
//   }
// }
//   var User_form = client.db("ACCENTURE_TEST1").collection("USER_REQUEST_FORM");

let loginRoute = require('./routes/login')
app.use(loginRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Example app listening on port ${PORT}!`))
