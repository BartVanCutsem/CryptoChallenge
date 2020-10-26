const sodium = require('libsodium-wrappers');
const Decryptor = require('./Decryptor');
const Encryptor = require('./Encryptor');

module.exports = async (peer) => {
    await sodium.ready;
    const keypair = sodium.crypto_kx_keypair();
    let other_peer, decryptor, encryptor, msg = undefined;

    let obj = Object.freeze({
       publicKey: keypair.publicKey,
       
       encrypt: (msg) => {
            return encryptor.encrypt(msg);
       },
       decrypt: (ciphertext, nonce) => {
            return decryptor.decrypt(ciphertext, nonce);
       },
       send: (msg) => {
            other_peer.setMsg(obj.encrypt(msg));
       },
       receive: () => {
            return obj.decrypt(msg.ciphertext, msg.nonce);
       },
       setMsg: (message) => {
           msg = message;
       },
       connect: async (p_other_peer) => {
        other_peer = p_other_peer;      
        keys = sodium.crypto_kx_server_session_keys(keypair.publicKey, keypair.privateKey, other_peer.publicKey);
        decryptor = await Decryptor(keys.sharedRx);
        encryptor = await Encryptor(keys.sharedTx);
   },
    });

    if (peer) {
        other_peer = peer;
        other_peer.connect(obj);
        key = sodium.crypto_kx_client_session_keys(keypair.publicKey, keypair.privateKey, other_peer.publicKey);
        decryptor = await Decryptor(key.sharedRx);
        encryptor = await Encryptor(key.sharedTx);
    }

    return obj;
}
