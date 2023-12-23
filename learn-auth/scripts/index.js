const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
const PORT = 3000

const jwtPassword = "123456" // server password, only the server has it and can verufy the user/token

app.use(express.json())


const USERS = [
    {
        name: "Bhavye",
        password: "123abc"
    },
    {
        name: "Sam",
        password: "89328bhavy"
    },
    {
        name: "Cyrus",
        password: "27162bhe"
    }
]


function userExists(username, password) {
    if (USERS.find(user => user.name == username && user.password == password)) return true
    return false
}


app.post('/signin', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: "User doesn't exists in our memory db."
        })
    }
    // if user exists, then only send this jwt token.
    let token = jwt.sign({ username }, jwtPassword)
    res.json({
        token
    })
})


app.get("/users", (req, res) => {
    // token -> "Bearer [token]"
    const token = req.headers.authorization?.split(" ")[1]
    // console.log(token)
    try {
        if (typeof token === "string") {
            const decoded = jwt.verify(token, jwtPassword)
            console.log(decoded)

            const result = []
            USERS.forEach((user) => {
                // @ts-ignore
                if (user.name != decoded.username) result.push(user.name)
            })
            return res.status(200).json(result)
        }
    }
    catch (err) {
        console.log(`Error: ${err}`)
        return res.status(403).json({
            msg: "Invalid token"
        })
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})