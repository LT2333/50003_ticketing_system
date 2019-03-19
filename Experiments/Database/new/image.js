var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uri = "mongodb+srv://Admin1:SUTD1111@escdb-anq5i.mongodb.net/test?retryWrites=true/";
var ImageDb = "ImageTesting";
var ImagePath = "./pic.jpg";

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

//Connect to db
mongoose.connect(uri,{useNewUrlParser:true},function(err,client) {
    
    if(err)
    console.log("Error while connecting to database: ", err);
    else{
    console.log("Connection established successfully");}
    client.close();
  })

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define image shema
const ImageSchema = mongoose.Schema({
    type: String,
    data: Buffer
},{ collection: ImageDb }); //----collection name here

//Compile model from schema

var Image =mongoose.model("Image",ImageSchema);

const myImage = new Image({
    type:"image/jpg",
    data: fs.readFileSync(ImagePath)
});


myImage.save(function(err){
    if(err) throw err;
    console.log("Picture have been successfully uploaded!");
    });


//Display
//Fetch models
let User = require('../models/user');

//Retrive avatar and display when html img src points to this route
router.get('/:username', (req,res)=>
{
    User.findOne({
        username: req.params.username
    }, (err, user) => {

    let img = new Buffer(user.displayPicture.data, 'base64');
    res.writeHead(200, {
        'Content-Type':user.displayPicture.contentType,
        'Content-Length': img.length
      });
      res.end(img);
    });
}); 

//Store or Update image with this route
router.post('/set',upload.single('avatar') ,(req,res)=>
{

    if(!req.user)     //Making sure user is authenticated
        return res.redirect("/users/login");

    User.findOne({_id:req.user._id},(err,user)=>{
        user.displayPicture.data = fs.readFileSync(req.file.path);  //using fs to access multer json image object stored temporarily in /uploads
        user.displayPicture.contentType = req.file.mimetype;         //set meme type
        fs.unlinkSync(req.file.path);                                     //Delete item form uplaods folder
        User.update({
            _id: req.user._id
        }, user, (err) => {
            if (err) {
              console.log(err);
            } else {
                console.log("success");
                return res.redirect('/users/profile/'+user.username);
            }
        });
    });
}); 
module.exports = router;

//Front-end 

   /**
 *View template (Jade)

     
//To display image
img(id="userDP" width="150", height="150" src="/avatars/"+curUser.username)

//Form to store image 
 form(method='post',enctype="multipart/form-data" , action='/avatars/set')
  input(type='file', name='avatar')
  input(type='submit')
 */

       

   








   