const db = require("../models")

// Push a message to the server from the frontend.  
// Sorts messages via DM or Group. 
module.exports = (socket,io) => ({from,friendId,groupId,data}) => {

    if(!data.content || !from) {
        socket.emit('pushMsg',{status: 400,msg: 'missing parameters'})
        return
    }

    if(groupId) {
        createMsg({
            toGroup: groupId,
            from: from,
            content: data.content
        }).then(message => {
            io.sockets.emit(groupId,{
                from,
                data: message
            })
        })
    } else if(friendId) {
        createMsg({
            toUser: friendId,
            from: from,
            content: data.content
        }).then(message => {
            io.sockets.emit(friendId,{
                from,
                data: message
            })
        })
    } else {
        socket.emit('pushMsg',{status: 400,msg: 'missing parameters'})
    }
}

// Creates a new message using the data sent in from the client. 
function createMsg(data) {
    return db.Message
        .create(data)
        .then(msg => {
            msg = msg.toObject();
            return db.User
                .findById(msg.from)
                .select('_id name avatar')
                .exec()
                .then(user => {
                    msg.from = user
                    return msg
                })
        })
}