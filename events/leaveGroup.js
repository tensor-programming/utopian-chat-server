const User = require("../models").User
const Group = require("../models").Group

// remove a user from a group. 
module.exports = socket => ({from,groupId}) => {

	Promise.all([
		// find the specific user and remove the group from the groups field. 
		User.findByIdAndUpdate(from,{$pull: {groups: groupId}}).exec(),
		// update the group nodel to remove the user. 
		Group.update({_id: groupId},{$pull: {member: from}})
	])
		.then((cols) => {
			socket.broadcast.emit(groupId,{
				groupId,
				data: {
					type: 'system',
					name: 'system message',
					content: `${cols[0].name} left the Group`
				}
			})
			socket.emit('leaveGroup',{})
		})
		.catch(err => {
			socket.emit('leaveGroup',err)
		})

}