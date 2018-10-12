const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

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