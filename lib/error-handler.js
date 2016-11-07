module.exports = function errorHandler(err, req, res, next) {
  const code = err.code || 500;
  const error = code === 500 ? 'Internal server error' : err.message;
  console.error(err.message || err.error);
  res.status(code).send({error});
};

