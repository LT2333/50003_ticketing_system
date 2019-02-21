# 0. Pre-requisites

Using Unirest 

```
$ npm install unirest
```

# 1. Register users 

Native NodeJS

```javascript
var http = require("https");

var options = {
  "method": "POST",
  "hostname": "ug-api.acnapiv3.io",
  "port": null,
  "path": "/swivel/acnapi-common-services/common/users",
  "headers": {
    "server-token": "CHANGE THIS VALUE",
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "9d830840-1f04-83b1-951c-1947dcfd5a91"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ username: 'c',
  password: 'p_n7!-e8',
  phone: '415-392-0202',
  gogo: 'lala2' }));
req.end();
```

NodeJS Request 

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users',
  headers: 
   { 'postman-token': '4b842382-f02a-e03f-bf50-e83acfe76e3f',
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
  "postman-token": "d2abafc7-df71-f06f-be1e-b2dd9d5ac950",
  "cache-control": "no-cache",
  "content-type": "application/json",
  "server-token": "CHANGE THIS"
});

req.type("json");
req.send({
  "username": "c",
  "password": "p_n7!-e8",
  "phone": "415-392-0202",
  "gogo": "lala2"
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

```



# 2. Login

nativeNodeJS

```javascript
var http = require("https");

var options = {
  "method": "GET",
  "hostname": "ug-api.acnapiv3.io",
  "port": null,
  "path": "/swivel/acnapi-common-services/common/login?username=good&password=p_n7!-e8",
  "headers": {
    "server-token": "CHANGE THIS",
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "e6036cb6-6a2f-b920-7aed-45c88f81d0f0"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
```

NodeJS Request

```javascript
var request = require("request");

var options = { method: 'GET',
  url: 'https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login',
  qs: { username: 'good', password: 'p_n7!-e8' },
  headers: 
   { 'postman-token': 'dd919c9b-70f2-1126-ce0d-819dba3548d1',
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
  "postman-token": "ee332d1a-4bc1-359c-2aad-c21d452e9bed",
  "cache-control": "no-cache",
  "content-type": "application/json",
  "server-token": "CHANGE THIS"
});


req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

```

