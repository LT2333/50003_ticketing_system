const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usermng = require("./routes/usermng.route"); // Link to login file
const mongoose = require('mongoose');

let dev_db_url ="mongodb+srv://Admin1:SUTD1111@escdb-anq5i.mongodb.net/test?retryWrites=true/";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true }, function (err, db) {
 if (err) {
   console.log('Unable to connect to the mongoDB server. Error:', err);
 } else {
   console.log('Connection established to', dev_db_url);
 }
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', usermng);

//let loginRoute = require('./routes/login.')
//app.use(loginRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Example app listening on port ${PORT}!`))
