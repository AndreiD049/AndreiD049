
const jwt = require('jsonwebtoken');

const errorHandler = (err, req, res, next) => {
  console.log(err.name, err.message, err.stack);
  const knownErrors = ['CastError', 'ValidationError', 'Error'];
  if (~knownErrors.indexOf(err.name)) {
    res.status(400).json({ error: err.message });
  }
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ error: 'invalid or correpted token' });
  }
  next();
};

const parseToken = (req, res, next) => {
  const authHeader = req.header('authorization');
  if (authHeader) {
    // verify schema type
    const isSchemaValid = authHeader.slice(0, 7) === 'Bearer ';

    // set the req property
    if (isSchemaValid) {
      req.token = jwt.verify(authHeader.slice(7), process.env.SECRET);
    }
  }

  next();
};

module.exports = {
  errorHandler,
  parseToken,
};
