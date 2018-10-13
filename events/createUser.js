const User = require("../models").User

// Creates a user upon sign in.  This module will be changed in the future since the backend already stores the user information. 
module.exports = socket => ({data}) => {
    User
        .findOne({name: data.name})
        .exec()
        .then(user => {
            if(!user) {
                // Create the user avatar based on the user's name. 
                _.assign(data,{avatar: `https://steemitimages.com/u/${data.name.toLowerCase().replace('@','')}/avatar`})
                return User.create(_.pick(data,['name','avatar']))
            }
            return user
        })
        .then(user => {
            socket.emit('createUser',user.toObject())
        })
        .catch(err => {
            socket.emit('createUser',err)
        })
}

