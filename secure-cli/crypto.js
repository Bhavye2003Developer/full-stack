var forge = require('node-forge');

class Cryptography {
    constructor() {
        this.key = forge.random.getBytesSync(16);
        this.iv = forge.random.getBytesSync(16);
    }

    // generate a random key and IV
    // Note: a key size of 16 bytes will use AES-128, 24 => AES-192, 32 => AES-256


    encrypt(/** @type {string | forge.util.ByteStringBuffer | ArrayBuffer | forge.util.ArrayBufferView} */ message) {
        var key = this.key
        var iv = this.iv
        // encrypt some bytes using CBC mode
        // (other modes include: ECB, CFB, OFB, CTR, and GCM)
        // Note: CBC and ECB modes use PKCS#7 padding as default
        var cipher = forge.cipher.createCipher('AES-CBC', key);
        cipher.start({ iv: iv });
        cipher.update(forge.util.createBuffer(message));
        cipher.finish();
        var encrypted = cipher.output;
        // outputs encrypted hex
        // console.log(encrypted.toHex());
        return { key, iv, "encrypted": encrypted }
    }

    decrypt({ key, iv, encrypted }) {

        const encryptedObject = new forge.util.ByteStringBuffer(encrypted)

        var decipher = forge.cipher.createDecipher('AES-CBC', key);
        decipher.start({ iv: iv });
        decipher.update(encryptedObject);
        var result = decipher.finish(); // check 'result' for true/false
        // outputs decrypted hex
        return decipher.output.toString()
    }

}

module.exports = Cryptography