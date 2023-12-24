import mongoose from 'mongoose';
import shortner from './shortner.js'
import 'dotenv/config'

const UrlSchema = new mongoose.Schema({
    originalURL: String,
    shortendURL: String
})

const Url = mongoose.model('Url', UrlSchema)


// create .env file in root directory and specify DB_PATH="YOUR_DB_PATH"
const DB_PATH = process.env.DB_PATH || "YOUR_DB_PATH"

class UrlDB {
    constructor() {
        mongoose.connect(DB_PATH).then(() => {
            console.log("db connected successfully...")
        }).catch((err) => {
            console.log(`Error: ${err}`)
        })
    }

    async newShortendUrl(originalURL) {
        const resp = await Url.exists({ originalURL })
        if (resp) {
            // if url exists in db

            const urlObj = await Url.findById(resp._id).exec()

            console.log("shortend url already created")
            return urlObj?.shortendURL
        }
        else {
            const shortendURL = this.generateShortUrl(originalURL)
            // async 
            new Url({
                originalURL, shortendURL: shortendURL
            }).save().then(() => {
                console.log("new shortend url created... ")
            })
            return shortendURL
        }
    }

    async getOriginalUrl(shortendURL) {
        return await Url.findOne({
            shortendURL
        }).exec()
    }



    generateShortUrl(originalURL) {
        const shortendUrl = shortner.generateShortUrl(originalURL)
        return shortendUrl()
    }
}


export { UrlDB }