
const errorHandler = (err, req, res, next) => {
  const knownErrors = ['CastError', 'ValidationError', 'Error'];
  if (~knownErrors.indexOf(err.name)) {
    res.status(400).json({ error: err.message });
  }
  next();
};

module.exports = {
  errorHandler,
};
