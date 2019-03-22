const REQUESTS = require('../models/REQUESTS.model');
const USER = require('../models/USER_MANAGEMENT.model');
var retext = require('retext');
var keywords = require('retext-keywords')
var toString = require('nlcst-to-string')
var Sentiment = require('sentiment');

var Isemail = require('isemail'); // Checks for valid email for users with no account

//===============//
// User APIs
//===============//
// Just to test that the files are connected
exports.test = function (req, res) {
    res.send('This is the REQUESTS Test controller!');
};

// For users with no account. Username is not required
// Pre-condition: Email, contact number, message
// post-condition: Send a confirmation email and a front end message
exports.usersubmit = function (req, res) {
  const{body} = req;
  const{ // Things that the user keys in on the form
    contact_num,
    message,
    img,
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

    // Extract tags
    var tags = [];
    retext()
      .use(keywords)
      .process(message, done)

    function done(err, file) {
      if (err) throw err

      console.log('Extracting keywords')
      file.data.keywords.forEach(function(keyword) {
        tags.push(toString(keyword.matches[0].node))
      })
    }

    var sentiment = new Sentiment();
    var priority = sentiment.analyze(message).score;
    //console.log(sentiment.analyze(message));
    //console.log(priority);

    let requests = new REQUESTS( // Match the require path
      {
        email: email,
        contact_num: contact_num,
        message: message,
        category: category,
        img:img,
        tags:tags,
        priority: priority
      });

      requests.save(function(err){
        if (err) {
            return next(err);
        }
        res.send(requests);
      });
  }

// For users with account. they will just send the message within the portal.
// username is passed by the front-end via the object_id
// Pre-condition: message
// post-condition: Send a confirmation email and a front end message
exports.usersubmitacc = function(req,res){
  const{body} = req;
  const{ // We have all the data in the usermanagement database
    id,  // This is passed on the front-end. Store global var
    message,
    imageURL,
    category
  } = body;

  if(!id){
    return res.send({
      "error":"front-end please send the id"
    });
  }

  if(!message){
    return res.send({
      "error":"You have not typed a message"
    });
  }

  // Extract tags
  var tags = [];
  retext()
    .use(keywords)
    .process(message, done)

  function done(err, file) {
    if (err) throw err

    console.log('Extracting keywords')
    file.data.keywords.forEach(function(keyword) {
      tags.push(toString(keyword.matches[0].node))
    })
  }

  var sentiment = new Sentiment();
  var priority = sentiment.analyze(message).score;

  // Find based on the username/id
  USER.find({
    _id:id
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
        username: user.username,
        email: user.email,
        contact_num: user.contact_num,
        message: message,
        category: category,
        imageURL:imageURL,
        tags:tags,
        priority: priority
      });

      requests.save(function(err){
        if (err) {
            return next(err);
        }
        res.send(requests);
      });
  });
}

//===============//
// Mutual
//===============//
// Template for viewing messages (Unsorted)
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

// Chat function
// Pre-condition: object id, request id
// Post condition: Messages are in the form of name and message
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

// Sort by date
// Pre-condition: Object id (Used to determine admin or user)
// Post-condition: JSON List of Requests (requests are JSON)
exports.viewdate = function(req,res){
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
      // Render all images if admin and sort from the earliest at the front of the list
      REQUESTS.find({}).sort({date:1}).exec(function(err, requests) {
          return res.send(requests);
        });
    } else{
      // Chcek the username
      REQUESTS.find({
        username:username
      }).sort({date:1}).exec(function(err, requests) {
          return res.send(requests);
        });
      }

    });

}

// filter by stauts and after that datat
// Pre-condition: Object id (Used to determine admin or user)
// Post-condition: JSON List of Requests sorted by status then date (requests are JSON)
exports.viewstatus = function(req,res){
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
      // Render all images if admin and sort from the earliest at the front of the list
      // sort the unaddressed at the top and then sort by date
      REQUESTS.find({}).sort({status:-1, date:1}).exec(function(err, requests) {
          return res.send(requests);
        });
    } else{
      // Chcek the username
      REQUESTS.find({
        username:username
      }).sort({status:-1, date:1}).exec(function(err, requests) {
          return res.send(requests);
        });
      }

    });

}

// filter by who is handling the cases
// Pre-condition: Object id (used to determine admin or user)
// Post-condition: JSON list of requests sorted by post conditon
exports.viewwho = function(req,res){
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
      // Render all images if admin and sort from the earliest at the front of the list
      // sort the unaddressed at the top and then sort by date
      REQUESTS.find({}).sort({who:-1, date:1}).exec(function(err, requests) {
          return res.send(requests);
        });
    } else{
      // Chcek the username
      REQUESTS.find({
        username:username
      }).sort({who:-1, date:1}).exec(function(err, requests) {
          return res.send(requests);
        });
      }

    });

}

// filter by category
// Pre-condition: Object id (used to determine admin or user)
// Post-condition: JSON list of requests sorted by post conditon
exports.viewcategory = function(req,res){
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
      // Render all images if admin and sort from the earliest at the front of the list
      // sort the unaddressed at the top and then sort by date
      REQUESTS.find({}).sort({category:-1, date:1}).exec(function(err, requests) {
          return res.send(requests);
        });
    } else{
      // Chcek the username
      REQUESTS.find({
        username:username
      }).sort({category:-1, date:1}).exec(function(err, requests) {
          return res.send(requests);
        });
      }

    });

}

// filter by priority
// Pre-condition: Object id (used to determine admin or user)
// Post-condition: JSON list of requests sorted by post conditon
exports.viewpriority = function(req,res){
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
      // Render all images if admin and sort from the earliest at the front of the list
      // sort the unaddressed at the top and then sort by date
      REQUESTS.find({}).sort({priority:-1, date:1}).exec(function(err, requests) {
          return res.send(requests);
        });
    } else{
      // Chcek the username
      REQUESTS.find({
        username:username
      }).sort({priority:-1, date:1}).exec(function(err, requests) {
          return res.send(requests);
        });
      }

    });

}

//===============//
// ADMIN APIs
//===============//
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

// admin changes the status of the request to 'finished'
// Pre-condition: admin_id (identify admin), request_id (request that is complete)
// Post-condition: Update the status field of the request
exports.admincomplete = function(req,res){
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
           status:"finished"
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
           adminComplete: username // Send back the user id which is used later
       });
     });
  });

}

// admin views the messages that he has
// Pre-condition: admin_id (identify admin)
// middle: Get the username of the admin and search the who of request
// Post-condition: Admin gets the messages that are associated with his username
exports.adminview = function(req,res){
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
    if(authority == 'admin'){  // Extra verification step
      // Render only requests associated with the admin
      REQUESTS.find({who:username}).sort({date:1}).exec(function(err, requests) {
          return res.send(requests);
        });
    } else{
      return res.send("This is possibly malicious and not an admin")
    }

    });

}
