"use strict"
const sodium = require('libsodium-wrappers');

module.exports = async(key) => {
    await sodium.ready;
    if(key === null)
    {
        throw 'no key';
    }
    return Object.freeze({
        decrypt: (ciphertext, nonce) => {
            return sodium.crypto_secretbox_open_easy(ciphertext, nonce)
        }
    });
}