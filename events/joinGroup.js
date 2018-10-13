const User = require("../models").User
const Group = require("../models").Group

// Join an already created group.  
module.exports = socket => ({from,groupId}) => {

	Promise.all([
		// append group to user's model
		User.findByIdAndUpdate(from,{$addToSet: {groups: groupId}}),
		// update group model to include user in the member list. 
		Group.update({_id: groupId},{$addToSet: {member: from}})
	])
		.then((cols) => {
			socket.broadcast.emit(groupId,{
				groupId,
				data: {
					type: 'system',
					name: 'system message',
					content: `${cols[0].name} joined the group`
				}
			})
			socket.emit('joinGroup',{})
		})
		.catch(err => {
			socket.emit('joinGroup',err)
		})

}