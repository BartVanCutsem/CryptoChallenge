const sodium = require('libsodium-wrappers');
module.exports = async(key) => {
    await sodium.ready;

    if(key === null)
    {
        throw 'no key';
    }
    return Object.freeze({
        encrypt: (msg, nonce) => {
            return sodium.crypto_secretbox_easy(msg, nonce, key)
        }
    });
}