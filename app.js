global._ = require("lodash")
global.Promise = require("bluebird")

const http = require('http')
const fs = require('fs')

// Types of images that can be uploaded. 
let types = {
    'jpg': 'image/jpeg',
    'gif': 'image/gif',
    'png': 'image/png'
}

// create the server and serve the static data. 
let server = http.createServer((req,res) => {
    let url = req.url
    if(/^\/img\//.test(url)) {
        let ext = url.substring(url.lastIndexOf('.'))
        res.writeHead(200,{'content-type': types[ext]})
        fs.createReadStream(`./static/${url.replace('/img/','')}`).pipe(res)
    }
})

// spin up the websockets using socket.io
let io = require('socket.io')(server);
// connect the events to a map. 
let eventsMap = require("./eventsMap")('./events')

server.listen(3002,() => {
    console.log(`server listening on ${server.address().port}`)
});
// deploy the mapped events to their websockets. 
io.on('connection',function(socket) {
    eventsMap(socket,io)
});
