const sodium = require('libsodium-wrappers');

module.exports = (key) => {
    return Object.freeze({
        verify: (hashedPw , pw)  => {
            let is_correct_password = sodium.crypto_pwhash_str_verify(hashedPw, pw);
            return !!is_correct_password;
        }

    })
}
