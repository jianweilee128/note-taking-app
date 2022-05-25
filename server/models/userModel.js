const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter your username'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

userSchema.methods.checkCorrectPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
