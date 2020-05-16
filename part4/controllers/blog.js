const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);

  // not authenticated or invalid token send 401
  if (!req.token || !req.token.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  // find the user in the database
  const user = await User.findById(req.token.id);
  // add the user id to the blog
  blog.user = user.toJSON().id;
  const result = await blog.save();

  // add the blog to the user
  user.blogs = user.blogs.concat(result.toJSON().id);
  await user.save();

  res.status(201).json(result);
});

blogRouter.delete('/:id', async (req, res) => {
  if (!req.token) {
    return res.status(401).json({ error: 'Only logged in users can delete blogs' });
  }
  const user = await User.findById(req.token.id);

  const blogToDelete = await Blog.findById(req.params.id);

  if (!blogToDelete) return res.status(404).end();

  // trying to delete someone else's blog?
  if (blogToDelete.user && blogToDelete.user.toString() !== user.toJSON().id) {
    return res.status(401).json({ error: 'You cannot delete someone else\'s blogs' });
  }

  const result = await blogToDelete.remove();

  if (result !== null) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

blogRouter.put('/:id', async (req, res) => {
  const body = req.body;
  const oldPost = await Blog.findById(req.params.id);

  if (oldPost) {
    const newPost = {
      title: body.title || oldPost.title,
      author: body.author || oldPost.author,
      url: body.url || oldPost.url,
      likes: body.likes || oldPost.likes,
    };

    const result = await Blog.findByIdAndUpdate(req.params.id, newPost, { new: true });

    res.status(200).json(result.toJSON());
  } else {
    res.status(404).end();
  }
});

module.exports = blogRouter;