const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var chatSchema = new Schema(
//   {
//     name: {type: String}, // Who is addressing it
//     message: {type: String} // message content
//   }
// );

let RequestsSchema = new Schema({
    username: {type: String, default:"no account"},// max: 100}, // If the user is signed in then the username is already in the system
    email: {type: String}, //, required: true},
    contact_num: {type: Number}, //require: true},
    date: {type: Date, default:Date.now}, // auto-generated
    message:{type: String}, // user-typed
    imageURL: {type: String, default: ''}, // retrieved from Amazon
    priority:{type: Number, default:-1}, // Calculated between 0-1, accepts floats
    status:{type: String, default:'unaddressed'}, // Unattended, addressing
    who:{type: String, default:'unaddressed'}, // Admin Username. Find a way to link
    tags:{type: [String]}, // Array of tags of String data type
    category:{type: String, default:''}, // selected from a drop-down
    chat:{type: [
      {
        name:{type:String},
        message: {type:String}
      }
    ]} // An array of hashMaps
});


// Export the model
module.exports = mongoose.model('REQUESTS', RequestsSchema);
