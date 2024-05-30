import CryptoJS from 'crypto-js';

const key = String(process.env.REACT_APP_SECRET_KEY);

export const encryptUser = (user) => {
    return CryptoJS.AES.encrypt(JSON.stringify(user), key).toString();
}

export const decryptUser = (user) => {
    return user ? JSON.parse(CryptoJS.AES.decrypt(user, key).toString(CryptoJS.enc.Utf8)) : {};
}