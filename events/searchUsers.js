const User = require("../models").User

// Find a user from all the users in the database.  
// TODO: add the ability to differentiate between logged in users and logged out users. 
module.exports = socket => ({from,keyword}) => {
    User
        .find({
            name: {$regex: new RegExp(keyword)}
        })
        .limit(5)
        .select('_id name avatar')
        .exec()
        .then(users => {
            if(!users) return []
            return users.filter(item => item._id.toString() !== from)
        })
        .then(list => {
            socket.emit('searchUsers',list)
        })
        .catch(err => {
            socket.emit('searchUsers',err)
        })
}