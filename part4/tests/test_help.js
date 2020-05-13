const Blog = require('../models/blog');

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

const getAll = async () => {
  const results = await Blog.find({});
  return results.map((res) => res.toJSON());
};

module.exports = {
  initialValues,
  getAll,
};
