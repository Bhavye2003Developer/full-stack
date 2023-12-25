const express = require('express')
const mongoose = require('mongoose')


const app = express()

app.use(express.urlencoded({ extended: true }))


const db_url = "mongodb+srv://bhavyedevelopment2003:h7mBOezZIFvWeRAR@cluster0.cuyngcd.mongodb.net/db_users"
mongoose.connect(db_url).then(() => {
    console.log("database connected successfully...")
}).catch((err) => {
    console.log("error: " + err)
})

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const User = mongoose.model('User', UserSchema);



app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    insertUser(username, email, password).then(msg => {
        res.json({
            msg
        })
    })
})



app.listen(3000, () => {
    console.log("Listening on port 3000...")
})




async function insertUser(username, email, password) {
    const userId = await User.findOne({ username }).exec()
    if (!userId) {
        const user1 = new User({
            username, email, password
        })
        return user1.save().then(() => {
            return `user with ${username} inserted successfully`
        })
    }
    else {
        return `user with ${username} already exists`
    }
}