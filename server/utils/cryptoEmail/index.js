const crypto = require('crypto');

const secret = Buffer.from(process.env.SECRET, 'hex');
const algorithm = 'aes-256-cbc'; // You can choose a different algorithm if needed
 
function encrypt(email) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secret), iv);
    let encrypted = cipher.update(email, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

function decrypt(encrypted) {
    console.log(encrypted);
    const [ivHex, encryptedHex] = encrypted.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secret), iv);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

function compareEmails(email, encryptedEmail) {
    const decryptedEmail = decrypt(encryptedEmail);
    return email === decryptedEmail;
}

module.exports = { encrypt, decrypt, compareEmails };