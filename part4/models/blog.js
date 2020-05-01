const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  author: {
    type: String,
    minLength: 4
  },
  url: {
    type: String,
    match: /^(www\.)?\w*\.\w{2,10}/i,
  },
  likes: Number
});

blogSchema.plugin(mongooseUniqueValidator);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;