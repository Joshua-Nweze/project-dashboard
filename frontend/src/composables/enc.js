import CryptoJS, { AES } from 'crypto-js'

function encrypt(text) {
    const encrypted = CryptoJS.AES.encrypt(text, process.env.VUE_APP_CRYPTO_KEY).toString();
    const encodedEncrypted = encodeURIComponent(encrypted);

    return encodedEncrypted;
}

 function decrypt(encodedEncryptedText) {
    const decodedEncrypted = decodeURIComponent(encodedEncryptedText);
    const decrypted = CryptoJS.AES.decrypt(decodedEncrypted, process.env.VUE_APP_CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
    
    return decrypted;
}

export {
    encrypt,
    decrypt
}