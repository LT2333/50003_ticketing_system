# 1. Form post

```javascript
var unirest = require("unirest");

var req = unirest("POST", "http://localhost:3000/form");

req.headers({
  "cache-control": "no-cache",
  "Content-Type": "application/json"
});

req.type("json");
req.send({
  "Username": "CHECKOFF TMR",
  "Email": "eleanerloh@sutd.edu.sg",
  "Contact_Number": "923213124",
  "Topic_Chosen": "the bored ninja",
  "Message": "why api spoil"
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

```

# 2. Get messages

```javascript
var unirest = require("unirest");

var req = unirest("GET", "http://localhost:3000/data/mark");

req.headers({
  "cache-control": "no-cache"
});


req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

```

