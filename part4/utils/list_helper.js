const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.sort((a, b) => {
    return b.likes - a.likes;
  })[0] || {};
};

const mostBlogs = (blogs) => {
  return (_.maxBy(_.toPairs(_.groupBy(blogs, 'author')), (blog) => blog[1].length) || [''])[0];
};

const mostLikes = (blogs) => {
  const mostLikesAuthors = _.orderBy(_.toPairs(_.mapValues(_.groupBy(blogs, 'author'), (value) => {
    return _.sumBy(value, (o) => o.likes);
  })), (o) => o[1], 'desc');
  return mostLikesAuthors.length === 0
    ? {}
    : { 'author': mostLikesAuthors[0][0], 'likes': mostLikesAuthors[0][1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};