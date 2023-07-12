const crypto = require('crypto');

const encrypt = (email, secretKey) => {
    const encryptionKey = Buffer.from(process.env.ENCRYPT_KEY, 'hex');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
    let encryptedEmail = cipher.update(value, 'utf8', 'hex');
    encryptedEmail += cipher.final('hex');
    return iv.toString('hex') + ':' + encryptedEmail.toString('hex');
};

const decrypt = (email, secretKey) => {
    const encryptionKey = Buffer.from(process.env.ENCRYPT_KEY, 'hex');
    const textParts = email.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedEmail = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
    let decryptedEmail = decipher.update(encryptedEmail, 'hex', 'utf8');
    decryptedEmail += decipher.final('utf8');
    return decryptedEmail.toString();
}

module.exports = { encrypt, decrypt };