const express = require('express')
const app = express()
const z = require('zod')

let numberOfRequests = 0;

const schema = z.string().min(5)


app.use((req, res, next) => {
    console.log(`Request hit: ${req.ip}`)
    ++numberOfRequests
    next()
})

app.get("/user", (req, res) => {
    const username = req.query.name

    const valid = schema.safeParse(username)
    if (valid.success) {
        res.send(`<h1>Hi, ${username} welcome to future</h1>`)
    }
    else {
        res.send("Not a valid input - " + valid.error.errors[0].message)
    }
})

app.get("/users", (req, res) => {
    res.send("Hi there")
})


app.get("/track", (req, res) => {
    res.json({
        "number of requests": numberOfRequests
    })
})


app.get("*", (req, res) => {
    res.send("<h2>Invalid route</h2>")
})


// global catches
app.use(function (err, req, res, next) {
    res.json({
        msg: "Error occurred"
    })
})

app.listen(3000, () => {
    console.log("Listening on port 3000...")
})