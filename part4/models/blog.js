const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  author: {
    type: String,
    minLength: 4
  },
  url: {
    type: String,
    match: /^(www\.)?\w*\.\w{2,10}/i,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

blogSchema.plugin(mongooseUniqueValidator);

blogSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;