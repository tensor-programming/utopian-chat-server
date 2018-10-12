const User = require("../models").User

module.exports = socket => ({from}) => {
    User
        .findById(from)
        .exec()
        .then(user => {
            if(!user) {
                return Promise.reject({status: 404,msg: 'This user does not exist'})
            } else {
                socket.emit('getUser',user.toObject())
            }
        })
        .catch(err => {
            socket.emit('getUser',err)
        })
}