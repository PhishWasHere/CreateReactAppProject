const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'users', 
  }
);

//password hashing middleware
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this.password, 10);
        this.password = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});

// Encryption middleware
userSchema.pre('save', function (next) {
  if (!this.isModified('encryptedEmail')) {
    return next();
  }

  try {
    const cipher = crypto.createCipher('aes-256-cbc', process.env.SECRET_KEY);
    let encryptedEmail = cipher.update(this.encryptedEmail, 'utf8', 'hex');
    encryptedEmail += cipher.final('hex');
    this.encryptedEmail = encryptedEmail;
    next();
  } catch (error) {
    next(error);
  }
});

// Decryption middleware
userSchema.post('find', function (users) {
  users.forEach((user) => {
    const decipher = crypto.createDecipher('aes-256-cbc', process.env.SECRET_KEY);
    let decryptedEmail = decipher.update(user.encryptedEmail, 'hex', 'utf8');
    decryptedEmail += decipher.final('utf8');
    user.encryptedEmail = decryptedEmail;
  });
});



const User = mongoose.model('User', userSchema);

module.exports = User;
