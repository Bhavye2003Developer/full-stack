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