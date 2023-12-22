const Cryptography = require("./crypto")
const { program } = require('commander');


const crypto = new Cryptography()

const cipher = crypto.encrypt("Hello Bhavye")
console.log(cipher.encrypted.toHex())
console.log(crypto.decrypt(cipher))

program.command("encrypt")
    .description("encrypts the given message")
    .argument("<string>", "message to encrypt")
    .action((message, option) => {
        const cipher = crypto.encrypt(message)
        console.log(`Original message: ${message}\n\nEncrypted message: ${cipher.encrypted.toHex()}\n\nKey: ${cipher.key}\n\niv: ${cipher.iv}`)
    })

program.parse()