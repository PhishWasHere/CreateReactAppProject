const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const secret = '0118cd50c2a840d7a47e85528442f384b1bf722a171ac46bbf9b4d335f311091' //move to env once done

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
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      // match: [/.+@.+\..+/],
      lowercase: true,
      trim: true,
      // set: encrypt,
      // get: decrypt
    },
    password: {
      type: String,
      required: true, 
      minlength: 8,
      maxLength: 20,
    },
    // chat: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Chat',
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    hooks: {
    
    },
    // collection: 'users', 
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
);

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});
   
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
// userSchema.virtual('chat_history').get(function () {
//   return this.friends.length;
// });
// UserSchema.path('email').set(encrypt).get(decrypt); fix later

const User = mongoose.model('User', UserSchema);


module.exports = User;
