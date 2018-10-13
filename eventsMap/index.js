const fs = require("fs")
const path = require("path")

module.exports = function(dir) {
    let map = {}
    let eventNames = fs.readdirSync(dir).map(item => item.replace(/\.js$/, ''))

    // push each event into the map object.  
    eventNames.forEach(event => {
        let filePath = path.resolve(dir, event)
        let fn = require(filePath)
        if (typeof fn !== 'function') fn = () => () => {}
        map[event] = fn
    })
    // create and serve all of the events as websockets.  
    return (socket, io) => {
        _.forEach(map, (fn, eventName) => {
            socket.on(eventName, fn(socket, io))
        })
    }
}