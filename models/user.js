const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

// User model for MongoDB.  List of groups are the groups that the user is subscribed to.  List of friends are the friends that the user wants to be able to DM. 
let User = new Schema({
    name: {
        type: String,
        lowercase: true,
    },
    friends: [ObjectId],
    groups: [ObjectId],
    createAt: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String
    }
})


module.exports = mongoose.model('user', User)