import mongoose, { mongo } from 'mongoose';
import shortner from './shortner.js'
import { getToken } from './utils.js'
import 'dotenv/config'

const UrlSchema = new mongoose.Schema({
    originalURL: String,
    shortendURL: String,
    numberOfClicks: { type: Number, default: 0 }
})

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const Url = mongoose.model('Url', UrlSchema)
const User = mongoose.model('User', UserSchema)

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

    async updateClicks(originalURL) {
        const urlObj = await Url.findOne({
            originalURL
        }).exec()
        if (urlObj) {
            const numberOfClicks = urlObj?.numberOfClicks + 1
            await Url.findOneAndUpdate({ originalURL }, { numberOfClicks })
        }
    }

    generateShortUrl(originalURL) {
        const shortendUrl = shortner.generateShortUrl(originalURL)
        return shortendUrl()
    }

    // user collection
    async newUser(username, email, password) {
        const isUserExists = await this.isUserExists(email)
        if (!isUserExists) {
            return new User({
                username, email, password
            }).save().then(() => {
                return {
                    statusCode: 1,
                    msg: "user created successfully..."
                }
            })
        }
        else {
            return {
                statusCode: 0,
                msg: "email already exists!"
            }
        }
    }

    async isUserExists(email) {
        const user = await User.findOne({ email }).exec()
        if (user) return true
        return false
    }


    async authenticateUser(email, password) {
        const user = await User.findOne({ email, password }).exec()
        if (user) {
            console.log("Login successfull")
            const token = getToken({ email })
            return token
        }
        return null
    }
}


export { UrlDB }