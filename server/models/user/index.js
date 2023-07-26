const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const secret = process.env.HASH_SECRET //moved to env, new hash made for prod

const encrypt = (text) => {
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(secret, 'salt', 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

const decrypt = (text) => {
  if (text === null || typeof text === 'undefined') {
    return text;
  }
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(secret, 'salt', 32);
  const [ivHex, encrypted] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxLength: 20,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    hooks: {
    },
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
);

UserSchema.methods.encryptEmail = function () { //fix this crap later
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(secret, 'salt', 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(this.email, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  this.email = iv.toString('hex') + ':' + encrypted;
};

UserSchema.methods.decryptEmail = function () {
  if (this.email === null || typeof this.email === 'undefined') {
    return this.email;
  }
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(secret, 'salt', 32);
  const [ivHex, encrypted] = this.email.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  this.email = decrypted;
};

UserSchema.pre('save', async function (next) { // pre save hook
  if (this.isNew || this.isModified('password')) { // if new user or password is modified then hash password
    const saltRounds = 10; // move to env once done
    this.password = await bcrypt.hash(this.password, saltRounds); 
  }
  next();
});
   
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', UserSchema);


module.exports = User;
