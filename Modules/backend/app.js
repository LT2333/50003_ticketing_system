const express = require('express');
const bodyParser = require('body-parser');
const USER_MAN = require('./routes/USER_MANAGEMENT.route'); // Imports routes for the USER_MANAGEMENT
const REQUESTS = require('./routes/REQUESTS.route'); // Imports routes for the REQUESTS
var fs = require('fs'); // for image
var cors = require('cors');

var request = require('request');
var cheerio = require('cheerio');

let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');

const app = express();
app.use(cors());



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


app.get('/', function(req, res) {
//   const msg = {
//   to: 'glenn_chia@mymail.sutd.edu.sg',
//   from: 'test@example.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);
// const msg = {
//   to: "xiaoyue_tang@mymail.sutd.edu.sg",
//   from: 'courier50003esc@courier.com',
//   subject: 'Thanks for signing up with Courier',
//   text: `
//   Dear Sir/Mdm,
//
//
//   Thanks for signing up with Courier. We look forward to serving you on our brand new platform.
//
//
//   Yours sincerely,
//   Team Courier
//   `
//   //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);
// request('http://www.google.com/', function(err, resp, html) {
//       if (!err){
//         const $ = cheerio.load(html);
//         console.log(html);
//     }
// });

    return res.send("Hello");
});
// For user management
// To test just use localhost:1234/user/test
app.use('/user', middleware.checkToken, USER_MAN);

// For requests
// To test just use localhost:1234/portal/test
app.use('/portal', REQUESTS)

// For heroku
const host = '0.0.0.0';
const port = process.env.PORT || 1234;

app.listen(port, host, function() {
  console.log("Server started on port" +port);
});
