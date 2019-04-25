const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

let UserManagementSchema = new Schema({
    username: {type: String}, //, required: true, max: 100},
    //name:{type: String},
    password: {type: String}, //, required: true, max: 100},
    email: {type: String}, //, required: true},
    contact_num: {type: Number}, //, require: true},
    authority:{type: String, default: 'user'}, // user, admin or superAdmin
    team:{type: String, default:''},  // Example: API Dev Ops, Aesop, Digital Butler
    //myUnsolvedTickets:{type: Number, default:0}
    notifications:{type: [
      {
        message: {type:String},
        date:{type: Date, default:new Date()}
      }
    ]},


});

UserManagementSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
UserManagementSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

// Export the model
module.exports = mongoose.model('USER_MANAGEMENT2', UserManagementSchema);
