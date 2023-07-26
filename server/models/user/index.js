const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {encrypt, decrypt} = require('../../utils/cryptoEmail');

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

// UserSchema.virtual('originalEmail').get(function () {
//   return this.email;
// });

UserSchema.pre('save', async function (next) { // pre save hook
  if (this.isNew || this.isModified('password')) { // if new user or password is modified then hash password
    const saltRounds = 10; // move to env once done
    this.password = await bcrypt.hash(this.password, saltRounds); 
  }

  // if (this.isModified('email')) {
  //   this.email = encrypt(this.email);
  // } 
  next();
});
   
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', UserSchema);


module.exports = User;
