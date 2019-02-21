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
  "server-token": ""
});


req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});
