# 0. Pre-requisites

Using Unirest 

```
$ npm install unirest
```

Note 

1. Delete: the line containing "postman-token"

# 1. Register users 

NodeJS Request 

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users',
  headers: 
   { 
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     'server-token': 'CHANGE THIS' },
  body: 
   { username: 'c',
     password: 'p_n7!-e8',
     phone: '415-392-0202',
     gogo: 'lala2' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```

NodeJS Unirest

```javascript
var unirest = require("unirest");

var req = unirest("POST", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users");

req.headers({
  "cache-control": "no-cache",
  "content-type": "application/json",
  "server-token": "CHANGE THIS"
});

req.type("json");
req.send({
  "username": "c",
  "password": "p_n7!-e8",
  "email": "415-392-0202",
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

```



# 2. Login

NodeJS Request

```javascript
var request = require("request");

var options = { method: 'GET',
  url: 'https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login',
  qs: { username: 'good', password: 'p_n7!-e8' },
  headers: 
   { 
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     'server-token': 'CHANGE THIS' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```

NodeJS Unirest

```javascript
var unirest = require("unirest");

var req = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login");

req.query({
  "username": "good",
  "password": "p_n7!-e8"
});

req.headers({
  "cache-control": "no-cache",
  "content-type": "application/json",
  "server-token": "CHANGE THIS"
});


req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

```

