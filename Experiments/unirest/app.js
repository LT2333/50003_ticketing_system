var unirest = require("unirest");

var req = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login");

req.query({
  "username": "good",
  "password": "p_n7!-e8"
});

req.headers({
  "cache-control": "no-cache",
  "content-type": "application/json",
  "server-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJtcmlac1RrRFFTdXBDeG9HeDhiZEdocDRUMFFMZGJ6QUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI3MjgsImV4cCI6MTU1MjU0NDcyOCwiYXpwIjoibXJpWnNUa0RRU3VwQ3hvR3g4YmRHaHA0VDBRTGRiekEiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.z1jKmmePUGifu9NYNIfYQTKl4hAGEPlY4B7QXKSjn2mFgvIz6ncLGxqg4EMf9DmtDKYciA4ssUEeY4wRqJZL66XMJtRznhOoVUkZzEmVMK_5WuS8eoM59BFxO-vaqfgs00heNW9jiJmhl4DuVc5uBY-QTvqzBz-7ahdNgSE47dEje0djpoDfFAXo7F211HXGTC8YfR2zwf3eyhFVAyvRvNrMfDbUGnzlRESL-Qm9kWS55svGC6gAnz_0LURNDrM_ctqbiPGVrUBCajkzSOW33YF5oTJsnD5lqwaET5dqogyT6To5jp9e7Nu5Kf6aTNPRy4KGsVF2dFDr0lvExTj0Qg"
});


req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});
