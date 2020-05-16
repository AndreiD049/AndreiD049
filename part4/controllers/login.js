const loginRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

loginRouter.post('/', async (req, res) => {
  // first, we need to validate the request
  const body = req.body;

  if (!body.username || !body.password) {
    throw new Error('No username or password found');
  }

  // check if the user exists in the database
  const user = await User.findOne({ username: body.username });
  // check password validity
  if (user && await bcrypt.compare(body.password, user.passwordHash)) {
    const tokenData = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET);
    // send the response and the token
    res
      .status(200)
      .json({ token, username: user.username, name: user.name });
  }
});

module.exports = loginRouter;