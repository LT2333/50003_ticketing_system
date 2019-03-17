const USERSESSION =  require('../models/USER_SESS.model');
const USER = require('../models/USER_MANAGEMENT.model');
//const USERSESSION =  require('../models/USER_SESS.model');
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
    username, // if we want to make it not case sensitive
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
            authority = "admin";
          } else{
            authority = "user";
          }
          let user = new USER( // Match the require path
            {
              username: username,
              email: email,
              contact_num: contact_num,
              authority: authority
            });
            user.password = user.generateHash(password);
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
  const{body} = req;
  const{
    password
  } = body;
  let {
    email
  } = body;

  email=email.toLowerCase();

  if(!email){
    return res.send({
      success: false,
      message: 'Error: email cannot be blank'
    });
  }
  if(!password){
    return res.send({
      success: false,
      message: 'Error: password cannot be blank'
    });
  }

  email=email.toLowerCase();

  USER.find({
    email: email
  }, (err, users) => {
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
    console.log(users);
    const user = users[0]; // get the username

    if(!user.validPassword(password)){
      return res.send({
        success: false,
        message: 'error:invalid'
      });
    }
    //const userSession = new USERSESSION();
    let userSession = new USERSESSION( // Match the require path
      {
        userId: user._id
      });
    console.log(user._id);
    console.log(userSession.userId);
    userSession.save((err, doc) =>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Second Server error'
        });
      }
      return res.send({
        success:true,
        message: 'Valid sign in',
        token: doc._id // points back to the user id
        // username: doc.username
      });
    });
  });
}

// User Delete from session logout
exports.logout = function(req,res){
  const { query } = req;
  const { token } = query;

  USERSESSION.findOneAndUpdate({
        _id: token,
        isDeleted: false
      }, {
        $set:{isDeleted:true}
    }, null,(err,sessions) => {
        if(err){
            console.log(err);
            return res.send({
                success:false,
                message:'Error: Server error'
            });
        }
      return res.send({
          success: true,
          message: 'done',
          id: _id // Send back the user id which is used later 
      });
    });
}



// User change password/email/username
