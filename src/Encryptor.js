const sodium = require('libsodium-wrappers');
module.exports = async(key) => {
    await sodium.ready;

    if(key === null)
    {
        throw 'no key';
    }
    return Object.freeze({
        encrypt: (msg) => {
            let nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
            return {
            ciphertext : sodium.crypto_secretbox_easy(msg, nonce, key), 
            nonce
            }
        }
    });
}