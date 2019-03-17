const USER = require('../models/USER_MANAGEMENT.model');
var Isemail = require('isemail'); // Checks for valid email

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('This is the USER_MANAGEMENT Test controller!');
};

// User sign-ups
// Helpful link to differentiate users and admin https://www.fiznool.com/blog/2014/04/23/mongoose-validations/
exports.signup = function (req, res) {
  const{body} = req;
  const{
    password,
    contact_num,
    type
  } = body;
  let{
    username,
    email
  }=body;

    if(!username){
      return res.send({
        "error":"Username field is empty"
      });
    }

    if(!password){
      return res.send({
        "error":"Password field is empty"
      });
    }

    if(!email){
      return res.send({
        "error":"email field is empty"
      });
    }

    if(!contact_num){
      return res.send({
        "error":"Contact Number field is empty"
      });
    }

    email = email.toLowerCase();

    if (Isemail.validate(req.body.email) == false){
      res.send({"error":"Invalid Email"});
    }

    // verify that the database does not have that username or email
    USER.find({
      email:email
    }, (err,previousUsers) => {
      if(err){
        return res.send('Error:server')
      } else if (previousUsers.length>0){
        return res.send('Error:Email already used')
      } else {
        USER.find({
          username:username
        }, (error, previousUser1)=>{
          if(error){
            return res.send('Error:server')
          } else if (previousUser1.length>0){
            return res.send('Error:Username already exists')
          }
          if(email.includes("@accenture.com")){
            authority = "admin"
          }
          let user = new USER( // Match the require path
            {
              username: username,
              password: password,
              email: email,
              contact_num: contact_num,
              type: authority
            });
            user.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.send('User Created successfully')
            })
        });
      }
    }); // closes the => and the first find
  }

// User login
exports.login = function (req,res){
  var email = {username:req.params.email};
  var password = {password:req.params.password};
}

// User Delete


// User change password/email/username
