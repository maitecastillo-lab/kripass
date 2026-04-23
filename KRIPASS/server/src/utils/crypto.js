const crypto = require('crypto');

// uso la clave del .env o una por defecto si se te olvida ponerla
const SECRET_KEY = process.env.CRYPTO_KEY || 'mi_llave_maestra_de_32_caracteres_'; 
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16; // Vector de inicialización para que sea más seguro

const encrypt = (text) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    //  se guarda el IV junto con el texto encriptado para poder abrirlo luego
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (text) => {
    try {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        return "Error al desencriptar";
    }
};

module.exports = { encrypt, decrypt };