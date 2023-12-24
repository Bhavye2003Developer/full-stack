const express = require('express')
const jwt = require('jsonwebtoken')
const ejs = require('ejs');
const databaseController = require('./databaseController')

const db_blog = new databaseController.BlogDB()

const app = express()
const PORT = 3000

const jwtPassword = "123456" // server password, only the server has it and can verufy the user/token

app.use(express.json())
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))


// app.post('/signin', (req, res) => {
//     const username = req.body.username
//     const password = req.body.password

//     if (!userExists(username, password)) {
//         return res.status(403).json({
//             msg: "User doesn't exists in our memory db."
//         })
//     }
//     // if user exists, then only send this jwt token.
//     let token = jwt.sign({ username }, jwtPassword)
//     res.json({
//         token
//     })
// })


// app.get("/users", (req, res) => {
//     // token -> "Bearer [token]"
//     const token = req.headers.authorization?.split(" ")[1]
//     // console.log(token)
//     try {
//         if (typeof token === "string") {
//             const decoded = jwt.verify(token, jwtPassword)
//             console.log(decoded)

//             const result = []
//             USERS.forEach((user) => {
//                 // @ts-ignore
//                 if (user.name != decoded.username) result.push(user.name)
//             })
//             return res.status(200).json(result)
//         }
//     }
//     catch (err) {
//         console.log(`Error: ${err}`)
//         return res.status(403).json({
//             msg: "Invalid token"
//         })
//     }
// })


app.get('/signup', (req, res) => {
    // create new user
    res.render("signup")
})

app.post('/signup', (req, res) => {
    const data = req.body
    // console.log(data)

    if (data && data.username && data.password && data.email) {

        db_blog.insertUser(data.username, data.password, data.email)
            .then(() => {
                console.log("user created successfully...")
                // user created

                const token = jwt.sign({ username: data.username }, jwtPassword)
                res.status(200).json({
                    token
                })

            }).catch(err => {
                console.log(`Error: ${err}`)
            })
        return
    }
    res.status(403).json({
        msg: "Error occured"
    })

    // res.redirect('/signup')
})


// app.get('/signin', (req, res)=>{

// })








app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})