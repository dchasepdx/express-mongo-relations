module.exports = function getEnsureRole(...roles) {
  const lookup = roles.reduce((lookup, role) => {
    lookup[role] = true;
    return lookup;
  }, {});

  return function ensureRole(req, res, next) {
    const userRoles = req.user.roles;

    if(userRoles && userRoles.some(role => lookup[role])){
      next();
    }
    else {
      next({
        code: 400,
        message: 'not authorized'
      });
    }
  };
};