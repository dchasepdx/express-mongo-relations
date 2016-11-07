const jwt = require('jsonwebtoken');
const seed = process.env.APP_SECRET || 'secret-app-stuff';

module.exports = {
  sign(user) {
    return new Promise((resolve, reject) => {
      const payload = {
        id: user._id,
        roles: user.roles
      };
      jwt.sign(payload, seed, null, (err, token) => {
        if (err) return reject(err);
        resolve(token);
      });
    });
  },

  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, seed, (err, payload) => {
        if (err) return reject(err);
        resolve(payload);
      });
    });
  }
};