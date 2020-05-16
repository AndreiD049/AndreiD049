const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

let initialValues = [
  {
    'title': 'dummy1',
    'author': 'dummy',
    'url': 'www.dummy.com',
    'likes': 12
  },
  {
    'title': 'dummy2',
    'author': 'dummy',
    'url': 'www.dummy.com',
    'likes': 12
  },
  {
    'title': 'dummy3',
    'author': 'dummy',
    'url': 'www.dummy.com',
    'likes': 12
  }
];

let initialUsers = [
  {
    'username': 'root',
    'name': 'root groot',
    'password': '01234566789'
  },
  {
    'username': 'admin',
    'name': 'root groot',
    'password': 'adminpassword'
  },
  {
    'username': 'user',
    'name': 'simple user',
    'password': 'mydogsname'
  }
];

const getAll = async () => {
  const results = await Blog.find({});
  return results.map((res) => res.toJSON());
};

const getAllUsers = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const getInexistentId = async () => {
  const user = await User.findOne({}); 
  const newPost = {
    'title': 'dummy35',
    'author': 'dummy',
    'url': 'www.dummy.com',
    'likes': 12,
    'user': user._id,
  };

  const result = await (new Blog(newPost)).save();
  const id = result.toJSON().id;
  await Blog.findByIdAndDelete(id);
  return id;
};

const getToken = async (username) => {
  const user = await User.findOne({ username });

  if (!user) return null;

  const tokenData = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(tokenData, process.env.SECRET);

  return token;
};

module.exports = {
  initialValues,
  initialUsers,
  getAll,
  getInexistentId,
  getAllUsers,
  getToken,
};
