const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    }
  ],
});

userSchema.plugin(mongooseUniqueValidator);

userSchema.set('toJSON', {
  transform: (doc, returnedDoc) => {
    returnedDoc.id = returnedDoc._id.toString();
    delete returnedDoc._id;
    delete returnedDoc.__v;
    // we don't want the password to be send
    delete returnedDoc.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

