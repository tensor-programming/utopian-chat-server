const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId
// MongoDB model for the Messages.  toGroup exists if the message is meant to be broadcasted to a group.  toUser exists if the message is a direct message. 
let Message = new Schema({
    toGroup: ObjectId,
    from: ObjectId,
    toUser: ObjectId,
    content: String,
    createAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('message', Message)