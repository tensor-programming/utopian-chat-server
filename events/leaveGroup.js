const User = require("../models").User
const Group = require("../models").Group

module.exports = socket => ({from,groupId}) => {

	Promise.all([
		User.findByIdAndUpdate(from,{$pull: {groups: groupId}}).exec(),
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