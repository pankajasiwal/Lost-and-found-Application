const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving to the database
UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password') || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (err) {
      // res.status(400).json({
      //   status: 'fail',
      //   message: err,
      // });
      next(err);
    }
  } else {
    return next();
  }
});

// Validate the password
UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    // res.status(400).json({
    //   status: 'fail',
    //   message: err,
    // });
    next(err);
  }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
