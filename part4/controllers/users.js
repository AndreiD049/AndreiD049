const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  res.json(users.map((user) => user.toJSON()));
});

userRouter.post('/', async (req, res) => {
  const body = req.body;

  if (!body.password) {
    // no password sent
    return res.status(400).json({ 'error': 'Password was not provided' });
  } else {
    // check if password is valid
    const PW_VALID_RULES = /^[a-zA-Z1-9]{5,20}$/;
    if (!PW_VALID_RULES.test(body.password)) {
      return res.status(400).json({ 'error': 'Password is not in correct format. Only alphanumeric characters can be used' });
    }
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash: hashedPassword,
  });

  const createdUser = await newUser.save();

  res.status(200).json(createdUser.toJSON());
});

module.exports = userRouter;