const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId
// MongoDB model for Group Chat Rooms. 
let Group = new Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
    },
    avatar: {
        type: String,
    },
    member: [ObjectId],
    createAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('group', Group)