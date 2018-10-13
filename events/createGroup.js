const User = require("../models").User
const Group = require("../models").Group

module.exports = socket => ({from,data}) => {
    // create the group by taking the user and the name being passed in.  User is automatically added as a member upon creation. 
    // TODO: add the ability to timeout the group after a specific amount of inactivity. 

    Group
        .create({
            name: data.name,
            member: [from]
        })
        .then(group => {
            return User
                .update({_id: from},{$addToSet: {groups: group._id}})
                .then(() => group._id)
        })
        .then(groupId => {
            socket.emit('createGroup',{groupId})
        })
        .catch(err => {
            socket.emit('createGroup',err)
        })
}