const nacl = require('libsodium-wrappers');
const Decryptor = require('./Decryptor.js')
const Encryptor = require('./Encryptor.js')

module.exports = async (peer) => {

    await nacl.ready;

    Object.freeze({
        keys : nacl.crypto_secretbox_keygen(),
        publicKey : keys["publicKey"]

    })

}