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
      beforeCreate: async function (next) {
        try {
          if (this.isModified('password')) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
          }
          next();
        } catch (err) {
          next(err);
        }
      },
    },
    collection: 'users', 
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
);

UserSchema.pre('save', function(next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) { //set rounds to env variable
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  }); 
});
   
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

// userSchema.virtual('chat_history').get(function () {
//   return this.friends.length;
// });
UserSchema.path('email').set(encrypt).get(decrypt);

const User = mongoose.model('User', UserSchema);


module.exports = User;
