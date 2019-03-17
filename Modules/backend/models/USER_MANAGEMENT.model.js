const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserManagementSchema = new Schema({
    username: {type: String}, //, required: true, max: 100},
    password: {type: String}, //, required: true, max: 100},
    email: {type: String}, //, required: true},
    contact_num: {type: Number}, //, require: true},
    authority:{type: String, default: 'user'} // user, admin or superAdmin

});

// Export the model
module.exports = mongoose.model('USER_MANAGEMENT', UserManagementSchema);
