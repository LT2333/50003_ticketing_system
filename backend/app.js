const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usermng = require("./routes/usermng.route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', usermng);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Example app listening on port ${PORT}!`))

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });



	//Delete a user request accroding to the user's name
	//var filter1 = { username:"Alex" };
//	Delete.delete_one_request(filter1,"ACCENTURE_TEST1","USER_INFORMATION");
