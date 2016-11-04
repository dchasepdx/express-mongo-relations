module.exports = function errorHandler(err, req, res, next) {
  const code = err.code || 500;
  const error = code === 500 ? 'Internal server error' : err.message;
  console.error(err.error || err.message);
  res.status(code).send({error});
};

