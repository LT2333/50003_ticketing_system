let express = require('express');
let router = express.Router();

var username = "glenn";
var password = "test";
var dict = {
  "username":username,
  "password":password
}

router.get("/login", (req,res)=>{
    res.send(dict)
})

// Params property on the request object
// localhost:3000/person/thomas
router.post("/login", (req,res)=>{
    res.send(dict)
})

module.exports = router
