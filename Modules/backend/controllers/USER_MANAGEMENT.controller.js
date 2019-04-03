const USERSESSION =  require('../models/USER_SESS.model');
const USER = require('../models/USER_MANAGEMENT.model');
//const USERSESSION =  require('../models/USER_SESS.model');
var Isemail = require('isemail'); // Checks for valid email
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "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");




//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('This is the USER_MANAGEMENT Test controller!');
    const msg = {
      to: "irene.chiatan@gmail.com",
      from: 'irene.chiatan@gmail.com',
      subject: 'Hello',
      text: `
      See it works
      `
      //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
};

// User sign-ups
// Helpful link to differentiate users and admin https://www.fiznool.com/blog/2014/04/23/mongoose-validations/
exports.signup = function (req, res) {
  const{body} = req;
  const{
    name,
    password,
    contact_num
  } = body;
  let{
    username, // if we want to make it not case sensitive
    email
  }=body;

    if(!name){
      return res.send({
        sucess: false,
        message:"Error: Name field is empty"
      });
    }

    if(!username){
      return res.send({
        success: false,
        message:"Error: Username field is empty"
      });
    }

    if(!password){
      return res.send({
        success: false,
        message:"Error: Password field is empty"
      });
    }

    if(!email){
      return res.send({
        success: false,
        message:"Error: email field is empty"
      });
    }

    if(!contact_num){
      return res.send({
        success:false,
        message:"Error: Contact Number field is empty"
      });
    }

    email = email.toLowerCase();

    if (Isemail.validate(req.body.email) == false){
      return res.send({
        success: false,
        message:"Error: Invalid Email"
      });
    }

    // verify that the database does not have that username or email
    USER.find({
      email:email
    }, (err,previousUsers) => {
      if(err){
        return res.send({
          sucess: false,
          message:'Error: FIRST server error, USER MANAGEMENT COLLECTION EMAIL'
        });
      } else if (previousUsers.length>0){
        return res.send({
          success: false,
          message:"Error: Email already in use"
        });
      } else {
        USER.find({
          username:username
        }, (error, previousUser1)=>{
          if(error){
            return res.send({
              sucess: false,
              message:'Error: server error, USER MANAGEMENT collection USERNAME'
            });
          } else if (previousUser1.length>0){
            return res.send({
              sucess:false,
              message:"Error: Username already in use"
            });
          }
          if(email.includes("@accenture.com")){
            authority = "admin";
          } else{
            authority = "user";
          }
          let user = new USER( // Match the require path
            {
              name:name,
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
                // const msg = {
                //   to: email,
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

                return res.send({
                  success: true,
                  message: 'successful registration',
                  name:name,
                  username: username,
                  email: email,
                  contact_num: contact_num,
                  authority: authority
                });
            });
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
      message: "Error: email field is empty"
    });
  }
  if(!password){
    return res.send({
      success: false,
      message: 'Error: Password field is empty'
    });
  }

  email=email.toLowerCase();

  USER.find({
    email: email
  }, (err, users) => {
    if(err){
      return res.send({
        success: false,
        message: 'Error: First Server error, user collection'
      });
    }
    if(users.length != 1){
      return res.send({
        success: false,
        message: 'Error: account does not exist'
      });
    }
    console.log(users);
    const user = users[0]; // get the username

    if(!user.validPassword(password)){
      return res.send({
        success: false,
        message: 'Error:invalid password'
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
          message: 'Error: Second Server error, user session collection'
        });
      }
      return res.send({
        success:true,
        message: 'Valid sign in',
        token: user._id, // this is the real ID upon creation
        //token: doc._id, // points back to the user id which is the token
        authority: user.authority //
        // username: user.username
      });
    });
  });
}

// User Delete from session logout
exports.logout = function(req,res){
  const { query } = req;
  const { token } = query;

  USERSESSION.findOneAndUpdate({
        userId: token,
        isDeleted: false
      }, {
        $set:{isDeleted:true}
    }, null,(err,sessions) => {
        if(err){
            console.log(err);
            return res.send({
                success:false,
                message:'Error: First Server error, user session collection'
            });
        }
      return res.send({
          success: true,
          message: 'successful logout',
      });
    });
}



// User change password/email/username
