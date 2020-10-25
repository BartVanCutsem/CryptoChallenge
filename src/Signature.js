"use strict"
const sodium = require("libsodium-wrappers")

class verify {

    constructor() {
        this.verifyingKey = sodium.crypto_sign_keypair()
        this._privateKey = this.verifyingKey["privateKey"]
        this.verifyingKey = this.verifyingKey["publicKey"]
    }
    sign (msg) {
        return sodium.crypto_sign(msg, this._privateKey )
    }
}

module.exports = async () => {
    await sodium.ready
    return Object.freeze(new verify)
}
