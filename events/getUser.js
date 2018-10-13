const User = require("../models").User

// Get a single user based on the from information.  
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