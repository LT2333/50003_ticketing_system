const REQUESTS = require('../models/REQUESTS.model');
const USER = require('../models/USER_MANAGEMENT.model');
const USERSESSION = require('../models/USER_SESS.model');
var retext = require('retext');
var keywords = require('retext-keywords')
var toString = require('nlcst-to-string')
var Sentiment = require('sentiment');

var Isemail = require('isemail'); // Checks for valid email for users with no account
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

// Packages for uplaoding an image
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );

// Amazon S3 Instantiation
const s3 = new aws.S3({
      accessKeyId: process.env.S3_KEY,
      secretAccessKey: process.env.S3_SECRET,
      Bucket: 'accenture-esc-group9-images'
   });

//Single upload -- Upload only 1 image
const profileImgUpload = multer({
   storage: multerS3({
    s3: s3,
    bucket: 'esc-images-lt',
    acl: 'public-read',
    key: function (req, file, cb) {
     cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
    } // create the filename
   }),
   //limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
   fileFilter: function( req, file, cb ){
    checkFileType( file, cb );
   }
  }).single('profileImage');

/**
* Check File Type
* @param file
* @param cb
* @return {*}
*/
function checkFileType( file, cb ){
   // Allowed ext
   const filetypes = /jpeg|jpg|png|gif/;
   // Check ext
   const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
   // Check mime
   const mimetype = filetypes.test( file.mimetype );
  if( mimetype && extname ){
    return cb( null, true );
   } else {
    cb( 'Error: Images Only!' );
   }
}

exports.imageupload = function ( req, res ){
    profileImgUpload( req, res, ( error ) => {
       console.log( 'error', error );
      if( error ){
       console.log( 'errors', error );
       res.json( { error: error } );
      } else {
       // If File not found
       if( req.file === undefined ){
        console.log( 'Error: No File Selected!' );
        res.json( 'Error: No File Selected' );
       } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
    // Save the file name into database into profile model
    return res.send( {
         image: imageName,
         location: imageLocation
        } );
       }
      }
     });
    }
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
    name,
    title,
    contact_num,
    message,
    imageurl,
    category
  } = body;
  let{ // Need these to check later
    email
  }=body;

    if(!name){
      return res.send({
        success: false,
        error:"name field is blank"
      });
    }

    if(!title){
      return res.send({
        success: false,
        error:"title field is blank"
      });
    }

    if(!message){
      return res.send({
        success: false,
        error:"message field is blank"
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
      res.send({
        success: false,
        message:"Error: Invalid Email"
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
    //console.log(sentiment.analyze(message));
    //console.log(priority);

    let requests = new REQUESTS( // Match the require path
      {
        name: name,
        email: email,
        contact_num: contact_num,
        title:title,
        message: message,
        category: category,
        imageURL:imageurl,
        tags:tags,
        priority: priority
      });

      requests.save(function(err){
        if (err) {
            return next(err);
        }

        const msg = {
          to: "jingqi_chan@mymail.sutd.edu.sg",//email,
          from: 'courier50003esc@courier.com',
          subject: 'Request received',
          text: `
          Dear Sir/Mdm,


          Thanks for your request, we will attend to it shortly.


          Yours sincerely,
          Team Courier
          `
          //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        sgMail.send(msg);

        res.send({
          success: true,
          name: name,
          email: email,
          contact_num: contact_num,
          title:title,
          message: message,
          category: category,
          imageURL:imageurl,
          tags:tags,
          priority: priority
        });
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
      title,
      message,
      category,
      imageurl
    } = body;

    console.log(id);
    if(!id){
      //console.log(req);
      return res.send({
        success:false,
        error:"front-end please send the id"
      });
    }

    if(!title){
      return res.send({
        success: false,
        error:"title field is blank"
      });
    }

    if(!message){
      return res.send({
        success: false,
        error:"message field is blank"
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
    USERSESSION.find({
        _id:id
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id:user_id
    }, (err, users)=>{
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
      const user = users[0]; // users is an array of users that share the same username
      let requests = new REQUESTS( // Match the require path
        {
          username: user.username,
          email: user.email,
          name: user.name,
          contact_num: user.contact_num,
          title: title,
          message: message,
          category: category,
          imageURL:imageurl,
          tags:tags,
          priority: priority
        });

        requests.save(function(err){
          if (err) {
              return next(err);
          }
          res.send({
            success: true,
            username: user.username,
            email: user.email,
            name: user.name,
            contact_num: user.contact_num,
            title: title,
            message: message,
            category: category,
            imageURL:imageurl,
            tags:tags,
            priority: priority
          });
        });
    });
  });
  }

  exports.recommended = function(req,res){
    const{body} = req;
    const{ // Category used to search requests. Then we search by category
      tags, // array of Strings
      category
    } = body;

    if(!category){
      return res.send({
        success: false,
        error:"category is blank"
      });
    }

    // Code for tag length of 1
    if (tags.length == 1){
      REQUESTS.find({
        category:category, status: "finished", tags:tags[0]
      }, function(err, requests) {
        if(err){
          return res.send({
            success: false,
            message: 'Error: Server error, requests collection'
          });
        } else if (!requests) {
          return res.send({
            success: false,
            message: 'No recommendations found'
          });
        } else{
          return res.send({
            success:true,
            requests
          });
        }
      });
    } else if (tags.length == 2) {
      REQUESTS.find({
        category:category, status: "finished", $or: [ { tags: tags[0] }, { tags: tags[1]} ]
      }, function(err, requests) {
        if(err){
          return res.send({
            success: false,
            message: 'Error: Server error, requests collection'
          });
        } else if (!requests) {
          return res.send({
            success: false,
            message: 'No recommendations found'
          });
        } else{
          return res.send({
            success:true,
            requests
          });
        };
      });
    }
    else if (tags.length == 3) {
      REQUESTS.find({
        category:category, status:"finished", $or: [ { tags: tags[0] }, { tags: tags[1]}, {tags: tags[2]} ]
      }, function(err, requests) {
        if(err){
          return res.send({
            success: false,
            message: 'Error: Server error, requests collection'
          });
        } else if (!requests) {
          return res.send({
            success: false,
            message: 'No recommendations found'
          });
        } else{
          return res.send({
            success:true,
            requests
          });
        };
      });
    } else{
      // Limit to 3 tags
      REQUESTS.find({
        category:category, status:"finished", $or: [ { tags: tags[0] }, { tags: tags[1]}, {tags: tags[2]}, {tags: tags[3]} ]
      }, function(err, requests) {
        if(err){
          return res.send({
            success: false,
            message: 'Error: Server error, requests collection'
          });
        } else if (!requests) {
          return res.send({
            success: false,
            message: 'No recommendations found'
          });
        } else{
          return res.send({
            success:true,
            requests
          });
        };
      });
    }
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
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id
    }, (err, users)=> {
      if(err){
        return res.send({
          success: false,
          message: 'Error: First Server error, user collection'
        });
      }
      if(users.length != 1){
        console.log(users);
        return res.send({
          success: false,
          message: 'Error: account does not exist'
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
            return res.send({
              success:true,
              requests
            });
            //res.send(requests);
          });
      } else{
        // Chcek the username
        REQUESTS.find({
          username:username
        }, function(err, requests) {
          return res.send({
            success:true,
            requests
          });
        });
      }

    });
  });
  }

  // Chat function
  // Pre-condition: object id, request id
  // Post condition: Messages are in the form of name and message
  exports.chats = function(req,res){
    const{body} = req;
    const{
      requestor_id,  // Who the admin is
      request_id,  // for us to search the request and update the who field
      conversastion
    } = body;
    if(!requestor_id){
      return res.send({
        success: false,
        message: 'Error: Requestor ID not sent'
      });
    }
    if(!request_id){
      return res.send({
        success: false,
        message: 'Error: Request ID not sent'
      });
    }
    if(!conversastion){
      return res.send({
        success: false,
        message: 'Error: conversastion cannot be blank'
      });
    }
    USERSESSION.find({
        _id:requestor_id
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    // Search for the admin's username
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
                message:'Error: Server error, requests collection'
            });
        }
        console.log(updateRequest);
        return res.send({
          success: true,
          message: 'Chat sent successfully',
          requester_id: requestor_id, // session id
          request_id: request_id
        });
      });
    });
  });
  }

  // Sort by date
  // Pre-condition: Object id (Used to determine admin or user)
  // Post-condition: JSON List of Requests (requests are JSON)
  exports.viewdate = function(req,res){
    const{body} = req;
    const{
      token,  // Who the admin is
      meta  // "own", "team", "all"
    } = body;

    if(!token){
      return res.send({
        success: false,
        message: "No token sent"
      });
    }

    if(!meta){
      return res.send({
        success:false,
        message: "Are you looking for admin, team or all"
      })
    }

    console.log(token);
    console.log(meta);
    // Retrieve the type
    console.log("finding");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      username = user.username;
      console.log(username);
      if(authority == 'admin'){
        if(meta == "own"){
          // Search by username
          REQUESTS.find({who:username}).sort({date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        } else if (meta == "team") {
          REQUESTS.find({team:user.team}).sort({date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        } else{
          REQUESTS.find({}).sort({date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        }
      } else{
        // Chcek the username (THIS IS FOR USERS)
        REQUESTS.find({
          username:username
        }).sort({date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
        }
      });
    });
  }

  // filter by stauts and after that datat
  // Pre-condition: Object id (Used to determine admin or user)
  // Post-condition: JSON List of Requests sorted by status then date (requests are JSON)
  exports.viewstatus = function(req,res){
    const{body} = req;
    const{
      token,  // Who the admin is
      meta  // "own", "team", "all"
    } = body;

    if(!token){
      return res.send({
        success: false,
        message: "No token sent"
      });
    }

    if(!meta){
      return res.send({
        success:false,
        message: "Are you looking for admin, team or all"
      })
    }

    console.log(token);
    console.log(meta);
    // Retrieve the type
    console.log("finding");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      username = user.username;
      console.log(username);
      if(authority == 'admin'){
        if(meta == "own"){
          // Search by username
          REQUESTS.find({who:username}).sort({status:-1, date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        } else if (meta == "team") {
          REQUESTS.find({team:user.team}).sort({status:-1, date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        } else{
          REQUESTS.find({}).sort({status:-1, date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        }
      } else{
        // Chcek the username (THIS IS FOR USERS)
        REQUESTS.find({
          username:username
        }).sort({status:-1, date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
        }
      });
    });
  }

  // filter by who is handling the cases
  // Pre-condition: Object id (used to determine admin or user)
  // Post-condition: JSON list of requests sorted by post conditon
  exports.viewwho = function(req,res){
    const{body} = req;
    const{
      token,  // Who the admin is
      meta  // "own", "team", "all"
    } = body;

    if(!token){
      return res.send({
        success: false,
        message: "No token sent"
      });
    }

    if(!meta){
      return res.send({
        success:false,
        message: "Are you looking for admin, team or all"
      })
    }

    console.log(token);
    console.log(meta);
    // Retrieve the type
    console.log("finding");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      username = user.username;
      console.log(username);
      if(authority == 'admin'){
        if(meta == "own"){
          // Search by username
          REQUESTS.find({who:username}).sort({date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        } else if (meta == "team") {
          REQUESTS.find({team:user.team}).sort({who:-1, date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        } else{
          REQUESTS.find({}).sort({who:-1, date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        }
      } else{
        // Chcek the username (THIS IS FOR USERS)
        REQUESTS.find({
          username:username
        }).sort({who:-1, date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
        }
      });
    });
  }

  // filter by category
  // Pre-condition: Object id (used to determine admin or user)
  // Post-condition: JSON list of requests sorted by post conditon
  exports.viewcategory = function(req,res){
    const{body} = req;
    const{
      token,  // Who the admin is
      meta  // "own", "team", "all"
    } = body;

    if(!token){
      return res.send({
        success: false,
        message: "No token sent"
      });
    }

    if(!meta){
      return res.send({
        success:false,
        message: "Are you looking for admin, team or all"
      })
    }

    console.log(token);
    console.log(meta);
    // Retrieve the type
    console.log("finding");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      username = user.username;
      console.log(username);
      if(authority == 'admin'){
        if(meta == "own"){
          // Search by username
          REQUESTS.find({who:username}).sort({category:-1, date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        } else if (meta == "team") {
          REQUESTS.find({team:user.team}).sort({category:-1, date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        } else{
          REQUESTS.find({}).sort({category:-1, date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        }
      } else{
        // Chcek the username (THIS IS FOR USERS)
        REQUESTS.find({
          username:username
        }).sort({category:-1, date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
        }

      });
    });
  }

  // filter by priority
  // Pre-condition: Object id (used to determine admin or user)
  // Post-condition: JSON list of requests sorted by post conditon
  exports.viewpriority = function(req,res){
    const{body} = req;
    const{
      token,  // Who the admin is
      meta  // "own", "team", "all"
    } = body;

    if(!token){
      return res.send({
        success: false,
        message: "No token sent"
      });
    }

    if(!meta){
      return res.send({
        success:false,
        message: "Are you looking for admin, team or all"
      })
    }

    console.log(token);
    console.log(meta);
    // Retrieve the type
    console.log("finding");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      username = user.username;
      console.log(username);
      if(authority == 'admin'){
        if(meta == "own"){
          REQUESTS.find({who:username}).sort({priority:1, date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        } else if (meta == "team") {
          REQUESTS.find({team:user.team}).sort({priority:1, date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        } else{
          REQUESTS.find({}).sort({priority:1, date:1}).exec(function(err, requests) {
              return res.send({
                success:true,
                requests
              });
            });
        }
      } else{
        // Chcek the username (THIS IS FOR USERS)
        REQUESTS.find({
          username:username
        }).sort({priority:1, date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
        }

      });
    });
  }

  // View a specific requests (The chats)
  // Pre-condition: request_id
  // post-condition: see the full details of a request
  exports.viewreq = function(req,res){
    const { query } = req;
    const { token } = query;
    console.log(token);
    REQUESTS.find({
      _id:token
    }, function(err, requests) {
        if(err){
          return res.send({
            success: false,
            message: 'Error: First Server error, request collection'
          });
        }
        var emptyChat = [];
        if(requests[0]){
          var oneReq = requests[0];
          var chatsOnly = oneReq.chat;
          // return res.send({
          //   success: true,
          //   chatsOnly
          // });
          return res.send(
            chatsOnly
          );
        }
        else{
          return res.send(
            emptyChat
          );
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
        success: false,
        message: 'Error: Admin ID not sent'
      });
    }
    if(!request_id){
      return res.send({
        success: false,
        message:"Error: Requests id not sent"
      });
    }
    USERSESSION.find({
        _id:admin_id
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    // Search for the admin's username
    USER.find({
      _id: user_id,
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
          message: 'Error: account does not exist'
        });
      }
      const user = users[0]; // users is an array of users that share the same username
      username = user.username;  // Then we can change the field name
      team = user.team;
      console.log(username);
      console.log(team);


     // Serach for the specific request
     REQUESTS.findOneAndUpdate({
           _id: request_id,
         }, {
           $set:{
             who:username,
             status:"addressing",
             dateTaken: new Date(),
             team: team
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
             message: 'request is being handled',
             adminHandle: username, // Send back the user id which is used later
             team: team
         });
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
        success: false,
        message: 'Error: Admin ID not sent'
      });
    }
    if(!request_id){
      return res.send({
        success: false,
        message:"Error: Requests id not sent"
      });
    }
    USERSESSION.find({
        _id:admin_id
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search

    // Search for the admin's username
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      username = user.username;  // Then we can change the field name
      console.log(username);


     // Serach for the specific request
     REQUESTS.findOneAndUpdate({
           _id: request_id,
         }, {
           $set:{
             status:"finished",
             dateComplete: new Date()
           }
       }, null,(err,sessions) => {
           if(err){
               console.log(err);
               return res.send({
                   success:false,
                   message:'Error: Server error, requests collection'
               });
           }
         return res.send({
             success: true,
             message: 'request is completed',
             adminComplete: username // Send back the user id which is used later
         });
       });
    });
  });

  }

  // admin archives the solution to the problem
  // Pre-condition: request_id (request that is complete) and solution
  // Post-condition: Update the solution field of the request
  exports.adminarchive = function(req,res){
    // Goal is to update the text
    // we will receive the token in the body
    // The token will be used to change the value
    const{body} = req;
    const{
      request_id,  // for us to search the request and update the who field
      solution
    } = body;

    if(!request_id){
      return res.send({
        success: false,
        message:"Error: Requests id not sent"
      });
    }

     // Serach for the specific request
       REQUESTS.findOneAndUpdate({
             _id: request_id
           }, {
             $set:{solution:solution}
         }, { new: true }, function(err, docs){
           if(docs){
             console.log(docs);
             return res.send({
               success: true,
               tags: docs.tags,
               category: docs.category,
               message: docs.message,
               dateComplete: docs.dateComplete,
               solution: docs.solution
             })
             return res.send(docs);
           }
           else{
             console.log('invalid request id');
             return res.send({
               success: false,
               message: 'Invalid request id sent'
             });
           }
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
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      username = user.username;
      console.log(username);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.find({who:username}).sort({date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
      } else{
        return res.send({
          success: false,
          message: "This is possibly malicious and not an admin"
        });
      }

      });
  });
  }


  // admin view the messages that he has according to their status
  // Pre-condition: admin_id (identify admin)
  // middle: Get the username of the admin and search the who of request
  // Post-condition: Admin gets the messages that are associated with his username and sorted
  exports.adminviewstatus = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      username = user.username;
      console.log(username);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.find({who:username}).sort({status:-1, date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
      } else{
        return res.send({
          success: false,
          message: "This is possibly malicious and not an admin"
        });
      }

      });
  });
  }

  // admin view the messages that he has taken but are not complete only
  // Pre-condition: admin_id (identify admin) SPECIFIC ADMIN
  // middle: Get the username of the admin and search the who of request
  // Post-condition: Admin gets the messages that are associated with his username and status as "addressing"
  exports.adminviewuncompleteonly = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Admin");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      username = user.username;
      console.log(username);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.find({who:username, status: "addressing"}).sort({date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
      } else{
        return res.send({
          success: false,
          message: "This is possibly malicious and not an admin"
        });
      }

      });
  });
  }

  // admin view the messages that he has taken but are completed (Basically a history)
  // Pre-condition: admin_id (identify admin)
  // middle: Get the username of the admin and search the who of request
  // Post-condition: Admin gets the messages that are associated with his username and status as "addressing"
  exports.adminviewcompleteonly = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Admin");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      username = user.username;
      console.log(username);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.find({who:username, status: "finished"}).sort({date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
      } else{
        return res.send({
          success: false,
          message: "This is possibly malicious and not an admin"
        });
      }
      });
  });
  }
  // filter by who is handling the cases
  // Pre-condition: Object id (used to determine admin or user)
  // Post-condition: JSON list of requests sorted by post conditon
  exports.viewallunassigned = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
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
          message: 'Error: account does not exist'
        });
      }
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      username = user.username;
      console.log(username);
      if(authority == 'admin'){
        // Render all images if admin and sort from the earliest at the front of the list
        // Find all unaddressed
        REQUESTS.find({status:"unaddressed"}).sort({date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
      } else{
        // Chcek the username
        REQUESTS.find({username:username, status:"unaddressed"}).sort({date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
        }

      });
    });

  }


  // Pre-condition: Object id (used to determine admin or user)
  // Post-condition: JSON list of requests that are being addressed
  exports.viewalluncomplete = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding unassigned");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
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
          message: 'Error: account does not exist'
        });
      }
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      username = user.username;
      console.log(username);
      if(authority == 'admin'){
        // Render all images if admin and sort from the earliest at the front of the list
        // Find all that are currently being handled
        REQUESTS.find({status:"addressing"}).sort({date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
      } else{
        // Chcek the username
        REQUESTS.find({username:username, status:"addressing"}).sort({who:-1, date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
        }
      });
    });
  }

  // Pre-condition: Object id (used to determine admin or user)
  // Post-condition: JSON list of requests that are completed
  exports.viewallcomplete = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding unassigned");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
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
          message: 'Error: account does not exist'
        });
      }
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      username = user.username;
      console.log(username);
      if(authority == 'admin'){
        // Render all images if admin and sort from the earliest at the front of the list
        // Find all that are currently being handled
        REQUESTS.find({status:"finished"}).sort({date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
      } else{
        // Chcek the username
        REQUESTS.find({username:username, status:"finished"}).sort({who:-1, date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
        }
      });
    });
  }
  // All of the team's messagaes
  // Pre-condition: admin_id (identify admin) used to find team
  // middle: Get the team of the admin and search the status
  // Post-condition: Admin gets the messages that are associated with his team
  exports.teamviewall = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Admin");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      team = user.team;
      console.log(team);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.find({team:team}).sort({date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
      } else{
        return res.send({
          success: false,
          message: "This is possibly malicious and not an admin"
        });
      }
      });
  });
  }

  // Team's messages that are unassigned
  // Pre-condition: admin_id (identify admin) used to find team
  // middle: Get the team of the admin and search the status
  // Post-condition: Admin gets the messages that are associated with his team and status as "unaddressed"
  exports.teamunassigned = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Admin");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      team = user.team;
      console.log(team);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.find({team:team, status: "unaddressed"}).sort({date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
      } else{
        return res.send({
          success: false,
          message: "This is possibly malicious and not an admin"
        });
      }
      });
  });
  }
  // Team's messages that are not complete
  // Pre-condition: admin_id (identify admin) used to find team
  // middle: Get the team of the admin and search the status
  // Post-condition: Admin gets the messages that are associated with his team and status as "addressing"
  exports.teamuncomplete = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Admin");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      team = user.team;
      console.log(team);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.find({team:team, status: "addressing"}).sort({date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
      } else{
        return res.send({
          success: false,
          message: "This is possibly malicious and not an admin"
        });
      }
      });
  });
  }

  // Team's messages that are complete
  // Pre-condition: admin_id (identify admin) used to find team
  // middle: Get the team of the admin and search the status
  // Post-condition: Admin gets the messages that are associated with his team and status as "finished"
  exports.teamcomplete = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Admin");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      console.log(authority);
      team = user.team;
      console.log(team);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.find({team:team, status: "finished"}).sort({date:1}).exec(function(err, requests) {
            return res.send({
              success:true,
              requests
            });
          });
      } else{
        return res.send({
          success: false,
          message: "This is possibly malicious and not an admin"
        });
      }
      });
  });
  }

  // Count the total unassigned tickets of Acnapi or the user
  // Pre-condition: id to differentiate admins and users
  // middle: Get the authority and use it to search
  // Post-condition: Count of all the messages
  exports.countunassigned = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Authority");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      username = user.username;  // used to search for requests by the user
      console.log(authority);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.countDocuments({status:"unaddressed"}, function(err, count){
          return res.send({
            success:true,
            numRequests: count
          });
        });
      } else{
        REQUESTS.countDocuments({username:username, status:"unaddressed"}, function(err, count){
          return res.send({
            success:true,
            numRequests: count
          });
        });
      }
      });
  });
  }

  // Count the total unassigned tickets of Acnapi or the user
  // Pre-condition: id to differentiate admins and users
  // middle: Get the authority and use it to search
  // Post-condition: Count of all the messages
  exports.countuncomplete = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Authority");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      username = user.username;  // used to search for requests by the user
      console.log(authority);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.countDocuments({status:"addressing"}, function(err, count){
          return res.send({
            success:true,
            numRequests: count
          });
        });
      } else{
        REQUESTS.countDocuments({username:username, status:"addressing"}, function(err, count){
          return res.send({
            success:true,
            numRequests: count
          });
        });
      }
      });
  });
  }

  // Count the total completed tickets of Acnapi or the user
  // Pre-condition: id to differentiate admins and users
  // middle: Get the authority and use it to search
  // Post-condition: Count of all the messages
  exports.countcomplete = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Authority");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      username = user.username;  // used to search for requests by the user
      console.log(authority);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.countDocuments({status:"finished"}, function(err, count){
          return res.send({
            success:true,
            numRequests: count
          });
        });
      } else{
        REQUESTS.countDocuments({username:username, status:"finished"}, function(err, count){
          return res.send({
            success:true,
            numRequests: count
          });
        });
      }
      });
  });
  }

  // Count the team's total tickets
  // Pre-condition: id to differentiate admins
  // middle: Get the authority and use it to search
  // Post-condition: Count of all the team's messages
  exports.countteamall = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Authority");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      team = user.team;  // used to search for requests by the user
      console.log(authority);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.countDocuments({team:team}, function(err, count){
          return res.send({
            success:true,
            numRequests: count
          });
        });
      } else{
        return res.send({
          success: false,
          message: "This is possibly malicious and not an admin"
        });
      }
      });
  });
  }

  // Count the team's uncompleted tickets
  // Pre-condition: id to differentiate admins
  // middle: Get the authority and use it to search
  // Post-condition: Count of all the team's messages
  exports.countteamuncomplete = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Authority");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      team = user.team;  // used to search for requests by the user
      console.log(authority);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.countDocuments({team:team, status:"addressing"}, function(err, count){
          return res.send({
            success:true,
            numRequests: count
          });
        });
      } else{
        return res.send({
          success: false,
          message: "This is possibly malicious and not an admin"
        });
      }
      });
  });
  }

  // Count the team's completed tickets
  // Pre-condition: id to differentiate admins
  // middle: Get the authority and use it to search
  // Post-condition: Count of all the team's messages
  exports.countteamcomplete = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Authority");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      team = user.team;  // used to search for requests by the user
      console.log(authority);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.countDocuments({team:team, status:"finished"}, function(err, count){
          return res.send({
            success:true,
            numRequests: count
          });
        });
      } else{
        return res.send({
          success: false,
          message: "This is possibly malicious and not an admin"
        });
      }
      });
  });
  }

  // Count the team's total tickets
  // Pre-condition: id to differentiate admins
  // middle: Get the authority and use it to search
  // Post-condition: Count of all the team's messages
  exports.countteamunassigned = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Authority");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      team = user.team;  // used to search for requests by the user
      console.log(authority);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.countDocuments({team:team, status:"unaddressed"}, function(err, count){
          return res.send({
            success:true,
            numRequests: count
          });
        });
      } else{
        return res.send({
          success: false,
          message: "This is possibly malicious and not an admin"
        });
      }
      });
  });
  }

  // Count the total tickets of Acnapi or the user
  // Pre-condition: id to differentiate admins and users
  // middle: Get the authority and use it to search
  // Post-condition: Count of all the messages
  exports.countall = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Authority");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      username = user.username;  // used to search for requests by the user
      console.log(authority);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.countDocuments({}, function(err, count){
          return res.send({
            success:true,
            numRequests: count
          });
        });
      } else{
        REQUESTS.countDocuments({username:username}, function(err, count){
          return res.send({
            success:true,
            numRequests: count
          });
        });
      }
      });
  });
  }

  // FOR ADMIN
  // COUNT MY uncompleted
  exports.countadminuncomplete = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Authority");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      username = user.username;
      console.log(authority);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.countDocuments({who:username, status:"addressing"}, function(err, count){
          return res.send({
            success:true,
            numRequests: count
          });
        });
      } else{
        return res.send({
          success: false,
          message: "This is possibly malicious and not an admin"
        });
      }
      });
  });
  }
  // COUNT MY COMPLETED
  exports.countadmincomplete = function(req,res){
    const { query } = req;
    // with the token issued at login we will search for the type in User collection
    // Once the user is found we will get the type and the Username
    // type is used to check if admin or user
    // username to render specific messages
    const { token } = query;
    console.log(token);
    // Retrieve the type
    console.log("finding Authority");
    USERSESSION.find({
        _id:token
    }, (err, usersess)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error, usersession collection'
        });
      }
      if(usersess.length != 1){
        return res.send({
          success: false,
          message: 'Error: session does not exist'
        });
      }
      const usersess1 = usersess[0];
      let user_id = usersess1.userId;  // get the user ID to search
    USER.find({
      _id: user_id,
    }, (err, users)=> {
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
      const user = users[0]; // users is an array of users that share the same username
      authority = user.authority;
      username = user.username;
      console.log(authority);
      if(authority == 'admin'){  // Extra verification step
        // Render only requests associated with the admin
        REQUESTS.countDocuments({who:username, status:"finished"}, function(err, count){
          return res.send({
            success:true,
            numRequests: count
          });
        });
      } else{
        return res.send({
          success: false,
          message: "This is possibly malicious and not an admin"
        });
      }
      });
  });
  }



// exports.bot = function(req,res){
//   const talk = req.body.queryResult.queryText;
//   var speech = req.body.queryResult.fulfillmentMessages[0].text.text[0];
//   // The bot response is from req.body.fulfillmentMessages
//   return res.send({
//     test:talk
//   });
// }
// exports.bot = function(req,res){
//   // const movieToSearch = req.body.queryResult.parameters.movies;
//   console.log(req);
//   return res.send({
//     JSON.stringify({"fulfillmentText": chats})
//     //hello: req.body.queryResult.fulfillmentMessages[0].text.text[0];
//     "hello":req.body.queryResult.parameters.movie
//   })
//   //response.send(JSON.stringify({“speech”: chat, “displayText”, chat}));
//   }

/*
"queryResult": {
  "queryText": "heelo",
  "action": "input.unknown",
  "parameters": {},
  "allRequiredParamsPresent": true,
  "fulfillmentText": "I missed what you said. What was that?",
  "fulfillmentMessages": [
    {
      "text": {
        "text": [
          "Can you say that again?"
        ]
      }
    }
  ]
*/


/*
{
  "responseId": "5c42ed59-f3af-4c76-8f4b-e86278d47c30",
  "queryResult": {
    "queryText": "hi",
    "action": "input.welcome",
    "parameters": {},
    "allRequiredParamsPresent": true,
    "fulfillmentText": "Hi! How are you doing?",
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            "Good day! What can I do for you today?"
          ]
        }
      }
    ],
    "intent": {
      "name": "projects/courier-8fd83/agent/intents/edbdd549-333a-42fb-9734-416a255c34ad",
      "displayName": "Default Welcome Intent"
    },
    "intentDetectionConfidence": 1,
    "languageCode": "en"
  },
  "originalDetectIntentRequest": {
    "payload": {}
  },
  "session": "projects/courier-8fd83/agent/sessions/95a30e54-bc1f-2350-4a51-151076d32809"
}
*/
