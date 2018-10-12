const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")
mongoose.connect('mongodb://localhost:27017/u-chat')

module.exports = {
    User: require("./user"),
    Group: require("./group"),
    Message: require("./message")
}