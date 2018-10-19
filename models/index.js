const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")
// Connect to mongo using a set url 
mongoose.connect('mongodb://localhost:27017/u-chat')
// Export the models to the rest of the backend. 
module.exports = {
    User: require("./user"),
    Group: require("./group"),
    Message: require("./message")
}