const crypto = require('crypto');

// Tomamos la clave del .env. Si no existe, cortamos la app (mejor fallar rápido)
const RAW_KEY = process.env.CRYPTO_KEY;
if (!RAW_KEY) {
  throw new Error('CRYPTO_KEY no está definida en el archivo .env');
}

// Garantizamos que la clave siempre sea de 32 bytes exactos (AES-256)
const SECRET_KEY = crypto.createHash('sha256').update(RAW_KEY).digest();
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

console.log('Clave de encriptación cargada correctamente');

const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  let encrypted = cipher.update(String(text), 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (text) => {
  try {
    if (!text || typeof text !== 'string' || !text.includes(':')) {
      return text;
    }
    const [ivHex, encryptedHex] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString('utf8');
  } catch (error) {
    console.error('Error al desencriptar:', error.message);
    return '[Error al desencriptar]';
  }
};

module.exports = { encrypt, decrypt };