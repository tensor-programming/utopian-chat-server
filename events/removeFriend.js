const User = require("../models").User

// Remove an associated user from the friend list of the user model. 
module.exports = (socket,io) => ({from,friendId}) => {

	// Removes both users from each other's models. 
	Promise.all([
		User.update({_id: from},{$pull: {friends: friendId}}),
		User.update({_id: friendId},{$pull: {friends: from}})
	])
		.then(() => {
			io.sockets.emit('removeFriend',{from,friendId})
		})
		.catch(err => {
			socket.emit('removeFriend',err)
		})

}