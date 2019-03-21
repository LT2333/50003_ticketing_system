const express = require('express');
const bodyParser = require('body-parser');
const USER_MAN = require('./routes/USER_MANAGEMENT.route'); // Imports routes for the USER_MANAGEMENT
const REQUESTS = require('./routes/REQUESTS.route'); // Imports routes for the REQUESTS
var fs = require('fs'); // for image

const app = express();

const mongoose = require('mongoose');
let dev_db_url = "mongodb+srv://Admin1:SUTD1111@escdb-anq5i.mongodb.net/ACCENTURE_TICKETING?retryWrites=true/";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware that all requests go through first
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// For user management
// To test just use localhost:1234/user/test
app.use('/user', USER_MAN);

// For requests
// To test just use localhost:1234/portal/test
app.use('/portal', REQUESTS)



let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
