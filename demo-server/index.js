const express = require('express')
const app = express()

const port = 3000

app.use(express.json())

app.get("/demo", (req, res) => {
    const name = req.query.name
    if (name) {
        res.send(`Hi, ${name}`)
    }
    else {
        res.send("No name specified!")
    }
})


app.get("/demo/:name/:age/:subject", (req, res) => {
    const { name, age, subject } = req.params
    if (name && age && subject) {
        res.send(`Hi, ${name}\nYour age: ${age}\nSubject you are studying: ${subject}`)
    }
    else {
        res.send("No name or age or subject specified!")
    }
})


app.get("/demo2", (req, res) => {
    const { age, name, subject } = req.query
    if (name && age && subject) {
        res.send(`Hi, ${name}\nYour age: ${age}\nSubject you are studying: ${subject}`)
    }
    else {
        res.send("No name or age or subject specified!")
    }
})

app.post("/demo", (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}...`)
})