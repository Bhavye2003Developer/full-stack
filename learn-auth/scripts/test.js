const jwt = require('jsonwebtoken')


// const obj = {
//     name: "Bhavye",
//     age: 20
// }


// const token = jwt.sign(obj, "secret")

// console.log(token)


const token = jwt.sign({
    "name": "Bhavye",
    "age": 20,
}, "don't know")

const token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmhhdnllIiwiYWdlIjoyMCwiaWF0IjoxNzAzNDg2MzY1fQ.hjdhjhd"
// console.log(token)

console.log(jwt.decode(token2))