const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
    userId:{
        type: String,
        default: ''
    },
    timeStamp:{
        type: Date,
        default: Date.now()
    },
    isDeleted:{ // For signouts
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('USER_SESS', UserSessionSchema);
