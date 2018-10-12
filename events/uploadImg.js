const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

function createNameByBuffer(buffer) {
    return crypto.createHash('md5').update(buffer).digest('hex')
}

module.exports = socket => ({from,data}) => {
    if(!from) {
        socket.emit('uploadImg',{status: 400,msg: 'Missing Parameter'})
    }

    let filename = `temp/${createNameByBuffer(data.file)}.${data.type}`

    let url = path.resolve(process.cwd(),`./static/${filename}`)
    fs.writeFile(url,data.file,err => {
        if(err) {
            return socket.emit('uploadImg',err)
        }

        return socket.emit('uploadImg',{img: `/img/${filename}`})
    })
}