const User = require("../models").User
const Group = require("../models").Group

module.exports = socket => ({from,groupId}) => {

	Promise.all([
		User.findByIdAndUpdate(from,{$addToSet: {groups: groupId}}),
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