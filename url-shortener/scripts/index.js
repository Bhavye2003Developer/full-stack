import express from 'express'
import { UrlDB } from './utils/connectDB.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

const PORT = 3000

const BASE_URL = "http://localhost:3000/"

const urlDB = new UrlDB()


app.get("/short", (req, res) => {
    res.render("short", { shortendUrl: null })
})


app.post('/short', (req, res) => {
    const url = req.body?.url
    console.log(url)
    urlDB.newShortendUrl(url).then(shortendUrl => {
        if (shortendUrl) {
            // url already present in db
            console.log(`shortendUrl: ${shortendUrl}`)
            return res.render("short", { shortendUrl: `${BASE_URL}${shortendUrl}` })
        }
    })
})


app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (email && password) {
        urlDB.authenticateUser(email, password).then(token => {
            if (token) {
                res.status(200).json({
                    token: token,
                    msg: "Login successfull"
                })
            }
            else {
                res.status(401).json({
                    token: null,
                    msg: "Invalid email/password"
                })
            }
        })
    }
    else {
        console.log("email/password not filled")
        res.redirect("/login")
    }
})

app.get("/login", (req, res) => {
    res.render("login")
})


app.get("/signup", (req, res) => {
    res.render("signup")
})

app.post("/signup", (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    if (username && email && password) {
        urlDB.newUser(username, email, password).then(({ msg, statusCode }) => {
            // res.status(201).json({
            //     msg
            // })
            console.log(msg)
            if (statusCode) {
                res.redirect("/login")
            }
            else {
                res.redirect("/signup")
            }
        })
    }
    else {
        res.status(401).json({
            msg: "body is invalid"
        })
    }
})

app.get('/:shortendUrl', (req, res) => {
    const shortendURL = req.params.shortendUrl

    urlDB.getOriginalUrl(shortendURL).then(urlObj => {
        const originalURL = urlObj?.originalURL
        if (originalURL) {
            urlDB.updateClicks(originalURL)
            return res.redirect(originalURL)
        }
        return res.status(404).json({
            msg: `${shortendURL} is not found`
        })
    })
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})