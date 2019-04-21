const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageOverallSchema = new Schema({
    departmentName:{type: String, default: ""},
    teamCount:{ type: number, default: 0},
    unaddressedTickets:{ type: number, default: 0}, // See what is not taken
    unsolvedTickets:{type: number, default: 0}, // See what is taken but unsolved
    teamMembers:{type: [
      {
        username:{type:String},
        userID: {type:String}
      }
    ]}
});

module.exports = mongoose.model('MESSAGE_OVERALL', MessageOverallSchema);
