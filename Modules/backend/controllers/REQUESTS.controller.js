const REQUESTS = require('../models/REQUESTS.model');
const USER = require('../models/USER_MANAGEMENT.model');

var Isemail = require('isemail'); // Checks for valid email for users with no account


////
//User controllers
////
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('This is the REQUESTS Test controller!');
};

// For users with no account. Username is not required
exports.usersubmit = function (req, res) {
  const{body} = req;
  const{ // Things that the user keys in on the form
    contact_num,
    message,
    imageURL,
    category
  } = body;
  let{ // Need these to check later
    email
  }=body;

    if(!message){
      return res.send({
        "error":"You have not typed a message"
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

    let requests = new REQUESTS( // Match the require path
      {
        email: email,
        contact_num: contact_num,
        message: message,
        category: category,
        imageURL:imageURL
      });

      requests.save(function(err){
        if (err) {
            return next(err);
        }
        res.send('post logged');
      });
  }

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
        imageURL:imageURL
      });

      requests.save(function(err){
        if (err) {
            return next(err);
        }
        res.send('post logged');
      });
  });
}


////
//Mutual
///
// Need to pass in the username
exports.viewmessage = function(req,res){
  const { query } = req;
  // with the token issued at login we will search for the type in User collection
  // Once the user is found we will get the type and the Username
  // type is used to check if admin or user
  // username to render specific messages
  const { token } = query;
  console.log(token);
  // Retrieve the type
  console.log("finding");
  USER.find({
    _id: token,
  }, (err, users)=> {
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
    authority = user.authority;
    console.log(authority);
    username = user.username;
    console.log(username);
    if(authority == 'admin'){
      // Render all images if admin
      REQUESTS.find({}, function(err, requests) {
          var reqMap = {};
          requests.forEach(function(request) {
            reqMap[request._id] = request;
          });
          res.send(reqMap);
        });
    } else{
      // Chcek the username
      REQUESTS.find({
        username:username
      }, function(err, requests) {
          var reqMap = {};
          console.log(requests);
          requests.forEach(function(request) {
            reqMap[request._id] = request;
          });
          res.send(reqMap);
        });
      }

    });

}

// Post request. We get the admin id and change the field
// We need the admin_id (Returned when the user sign in)
// We need the object id (Return when we view all messages)
exports.adminhandle = function(req,res){
  // Goal is to update the text
  // we will receive the token in the body
  // The token will be used to change the value
  const{body} = req;
  const{
    admin_id,  // Who the admin is
    request_id  // for us to search the request and update the who field
  } = body;
  if(!admin_id){
    return res.send({
      "error":"front-end please send admin's id"
    });
  }
  if(!request_id){
    return res.send({
      "error":"front-end please send request's id"
    });
  }

  // Search for the admin's username
  USER.find({
    _id: admin_id,
  }, (err, users)=> {
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
    username = user.username;  // Then we can change the field name
    console.log(username);


   // Serach for the specific request
   REQUESTS.findOneAndUpdate({
         _id: request_id,
       }, {
         $set:{
           who:username,
           status:"addressing"
         }
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
           adminHandle: username // Send back the user id which is used later
       });
     });
  });

}

// We will need the object id
// We will also need the request id
// Messages are in the form of name and message
exports.chats = function(req,res){
  const{body} = req;
  const{
    admin_id,  // Who the admin is
    request_id,  // for us to search the request and update the who field
    conversastion
  } = body;
  if(!admin_id){
    return res.send({
      "error":"front-end please send admin's id"
    });
  }
  if(!request_id){
    return res.send({
      "error":"front-end please send request's id"
    });
  }
  if(!conversastion){
    return res.send({
      "error":"front-end please send request's id"
    });
  }

  // Search for the admin's username
  USER.find({
    _id: admin_id,
  }, (err, users)=> {
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
    username = user.username;  // Then we can change the field name
    console.log(username);


   // Serach for the specific request
   REQUESTS.findByIdAndUpdate(request_id,
    { "$push": {
      "chat": {
        name:username,
        message:conversastion
        }
      }
    },
    { "new": true, "upsert": true },
    function (err, updateRequest) {
      if(err){
          console.log(err);
          return res.send({
              success:false,
              message:'Error: Server error'
          });
      }
      console.log(updateRequest);
      return res.send({
        success: true,
        message: 'Chat sent'
      });
    });
});
}
