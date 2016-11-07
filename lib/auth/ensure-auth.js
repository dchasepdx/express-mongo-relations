const tokenSvc = require('./token');

module.exports = function getEnsureAuth() {
  return function ensureAuth(req, res, next) {
    const token = req.headers.token;
    if(!token) {
      return next({
        code: 400,
        message: 'unauthorized, no token provided'
      });
    }
    tokenSvc.verify(token)
      .then(payload => {
        req.user = payload;
        next();
      })
      .catch(err => {
        return next({
          code: 403,
          message: 'unauthorized, invalid token'
        });
      });
  };
};