const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var chatSchema = new Schema(
  {
    name: {type: String}, // Who is addressing it
    body: {type: String} // message content
  }
);

let RequestsSchema = new Schema({
    username: {type: String, required: true, max: 100}, // If the user is signed in then the username is already in the system
    email: {
    type: String,
    required: true,
    validate: function(email) {
      return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    },
    contact_num: {type: Number, require: true},
    date: {type: Date, default:Date.now}, // auto-generated
    body:{type: String}, // user-typed
    imageURL: {type: String}, // retrieved from Amazon
    priority:{type: Number}, // Calculated between 0-1, accepts floats
    status:{type: String}, // Unattended, addressing
    who:{type: String}, // Admin Username. Find a way to link
    tags:{type: [String]}, // Array of tags of String data type
    category:{type: String},
    chat:{type: [chatSchema]} // An array of hashMaps
});


// Export the model
module.exports = mongoose.model('REQUESTS', RequestsSchema);
