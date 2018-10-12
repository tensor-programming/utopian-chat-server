const User = require("../models").User

module.exports = socket => ({data}) => {
    User
        .findOne({name: data.name})
        .exec()
        .then(user => {
            if(!user) {
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

