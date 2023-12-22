const utils = require('./utils')
const express = require('express')
const app = express()
const port = 3000

function calculateSum(n) {
    let sum = 0;
    for (let i = 1; i <= n; ++i) {
        sum += i;
    }
    return sum;
}

app.get('/calculate', (req, res) => {
    const n = req.query.n
    utils.log(new Date(), req.headers['user-agent'], req.socket.remoteAddress, req.url, req.method, req.statusCode)
    if (n) {
        const sum = calculateSum(n)
        res.send(`<h1>sum: ${sum}</h1>`)
    }
})

const users = [{
    id: 1,
    num_kidneys: 2,
    kidney_health_1: 90,
    kidney_health_2: 75
}, {
    id: 2,
    num_kidneys: 1,
    kidney_health_1: 68,
    kidney_health_2: null
}]

app.get('/', (req, res) => {
    const userId = req.query.id
    if (userId) {
        const user = users.filter((u) => u.id == +userId)
        if (user) {
            res.json(user)
        }
        else {
            res.send("User not found")
        }
    }
    else {
        res.send('userId not provided')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}...`)
})