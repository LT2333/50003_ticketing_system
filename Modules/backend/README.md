# 1. Setting up

## 1.1 Init

```
$ npm init
```

- Note: I changed the entry file to app.js

## 1.2 Dependencies used

### 1.2.1 Necessary

```
$ npm install --save express body-parser mongoose
```

- ExpressJS
- Mongoose 
- Body-Parser

```
$ npm install isemail
```

- For email verification. Link: https://www.npmjs.com/package/isemail

### 1.2.2 Optional 

```
$ npm i bcrypt
```

- For encrypting passwords 

```
$ npm i nodemon --save
```

- This means that we dont have to restart the code each time

Run it with 

```
$ nodemon app.js
```

Keyword extraction

```
npm install retext-keywords
https://github.com/retextjs/retext-keywords
npm install retext
https://github.com/retextjs/retext
```



Sentiment analysis 

https://www.npmjs.com/package/sentiment

```
npm install sentiment
```



- https://www.npmjs.com/package/deepai
- https://deepai.org/api-docs/?javascript#sentiment-analysis
- this does not work

```
$ npm install --save deepai
```

Email 

- https://www.w3schools.com/nodejs/nodejs_email.asp

```
$ npm install nodemailer
```



# 2. Running the code

## 2.1 Normal

```
$ node app.js # this is the name of the entry file 
```

## 2.2 Easier start-up (I used this)

```json
{
    "start":"node app.js" // This runs relative to the project root
}
```

# 4. Connecting to DB

## 4.1 URI

Syntax

```
mongodb://[username:password@]host1[:port1][,...hostN[:portN]]][/[database][?options]]
```

Things to change

1. Password: SUTD1111
2. Database: ACCENTURE_TICKETING

```
let dev_db_url = "mongodb+srv://Admin1:SUTD1111@escdb-anq5i.mongodb.net/ACCENTURE_TICKETING?retryWrites=true/";
```

## 5. Debug signin

In the schema the erorr was that I made userId a number but it was actually a string 

```
const UserSessionSchema = new Schema({
    userId:{
        type: String,
        default: -1
    },
```

I also typed the path to the file wrongly 



## 6. Requests

1. Do i want to count a user's requests? Or do I want to find on the database and send it forward? Technically upon login i can ressend the id back which can be used to find the specific user requests 

Overriding key value pairs. Have to use a new key each time 

```javascript
requests.forEach(function(request) {
    reqMap[request._id] = request; // dont do reqMap[request.username] because it will override 
});
```

I am changing the user submit accoount code to make it only take in an id 

```javascript
exports.usersubmitacc = function(req,res){
  const{body} = req;
  const{ // We have all the data in the usermanagement database
    username,  // This is passed on the front-end. Store global var
    message,
    imageURL,
    category
  } = body;

  if(!username){
    return res.send({
      "error":"front-end please send the username"
    });
  }

  if(!message){
    return res.send({
      "error":"You have not typed a message"
    });
  }

  // Extract tags
  var tags = [];
  retext()
    .use(keywords)
    .process(message, done)

  function done(err, file) {
    if (err) throw err

    console.log('Extracting keywords')
    file.data.keywords.forEach(function(keyword) {
      tags.push(toString(keyword.matches[0].node))
    })
  }

  var sentiment = new Sentiment();
  var priority = sentiment.analyze(message).score;

  // Find based on the username/id
  USER.find({
    username:username
  }, (err, users)=>{
    if(err){
      return res.send({
        success: false,
        message: 'Error: First Server error'
      });
    }
    if(users.length != 1){
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    }
    const user = users[0]; // users is an array of users that share the same username
    let requests = new REQUESTS( // Match the require path
      {
        username: username,
        email: user.email,
        contact_num: user.contact_num,
        message: message,
        category: category,
        imageURL:imageURL,
        tags:tags,
        priority: priority
      });

      requests.save(function(err){
        if (err) {
            return next(err);
        }
        res.send(requests);
      });
  });
}
```



# 7. Text stuff

## 7.1 Sentiment analysis

```javascript
const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey('YOUR_API_KEY');

var resp = await deepai.callStandardApi("sentiment-analysis", {
        text: "YOUR_TEXT_HERE",
});
console.log(resp);
```



## 7.2 Text tagging

```javascript
const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey('YOUR_API_KEY');

var resp = await deepai.callStandardApi("text-tagging", {
        text: "YOUR_TEXT_HERE",
});
console.log(resp);
```

# 8. chats

update an array 

https://stackoverflow.com/questions/41501939/how-to-update-a-array-value-in-mongoose



# 9. MongoDB sort by date

https://stackoverflow.com/questions/13847766/how-to-sort-a-collection-by-date-in-mongodb

# 9. Debugging

variables are only local to the find functions that they are in 

https://github.com/expressjs/cors

Add git ignore for node module

Add node version in the package.json file in engine 

bcrypt is a C package that does not work with heroku

Use jeroku CLI to deplioy

use bcryptjs instead 

Enable CORS to let them see the response 