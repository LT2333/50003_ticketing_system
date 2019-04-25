const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
    userId:{
        type: String,
        default: ''
    },
    timeStamp:{
        type: Date,
        default: new Date()
    },
    isDeleted:{ // For signouts
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('USER_SESS2', UserSessionSchema);
