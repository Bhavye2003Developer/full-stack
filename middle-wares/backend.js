const express = require('express')
const app = express()

let numberOfRequests = 0;


app.get("/", (req, res) => {
    if (numberOfRequests < 10) {
        return res.send("hello world")
    }
    res.send("greater")
})


app.listen(3000, () => {
    console.log("Listening on port 3000...")
})