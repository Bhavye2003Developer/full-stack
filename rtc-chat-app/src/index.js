import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io';

const app = express()
app.set('view engine', 'ejs')

const server = createServer(app)
const io = new Server(server);


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log(`message: ${msg}`)
        // socket.broadcast.emit("chat message", msg)
        io.emit("chat message", msg)
    })

});


app.get("/", (req, res) => {
    res.render('index')
})




server.listen(3000, () => {
    console.log("Listening on port 3000")
})