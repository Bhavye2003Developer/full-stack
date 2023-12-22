const http = require('http')
const fs = require('fs')
const utils = require('./utils')


const server = http.createServer((req, res) => {
    const route = req.url
    console.log(`route -> ${route}`)

    if (req.url == "/favicon.ico") {
        res.end("")
    }

    if (route?.split("?")[1]?.split("=")[0] == "id") {
        const id = route?.split("?")[1]?.split("=")[1]
        res.end(`id: ${id}`)
    }
    else {
        res.end("<h2>Invalid route!!!</h2>")
    }

    utils.log(new Date(), req.headers['user-agent'], req.socket.remoteAddress, req.url, req.method, res.statusCode)
})

server.listen(3000, () => {
    console.log("Listening...")
})