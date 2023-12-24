const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String
});

const User = mongoose.model('users', userSchema);

class BlogDB {
    constructor() {
        mongoose.connect("mongodb+srv://bhavyedevelopment2003:h7mBOezZIFvWeRAR@cluster0.cuyngcd.mongodb.net/db_blog").then(() => {
            console.log("db connected successfully...")
        }).catch(err => {
            console.log(`Error: ${err}`)
        })
    }

    // eg - db_blog.insertUser("BhavyeTheGod", "root@123", "bhavyedevelopment2004@gmail.com")
    insertUser(username, password, email) {
        const user = new User({
            username: username,
            password: password,
            email: email
        })
        return user.save()
    }
}

module.exports = { BlogDB }