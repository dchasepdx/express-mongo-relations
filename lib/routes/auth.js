const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const token = require('../auth/token');
const ensureAuth = require('../auth/ensure-auth')();

router.post('/validate', ensureAuth, (req, res, next) => {
  res.send({valid: true});
});

router.post('/signup', bodyParser, (req, res, next) => {
  const {username, password} = req.body;
  delete req.body.password;

  if(!username || !password) {
    return next({
      code: 400,
      message: 'username and password are required'
    });
  }

  User.find({username})
    .count()
    .then(count => {
      if (count > 0) throw {code: 400, message: `username ${username} already exists`};
      const user = new User(req.body);
      user.generateHash(password);
      return user.save();
    })
    .then(user => token.sign(user))
    .then(token => res.send({token}))
    .catch(next);
});

router.post('/signin', bodyParser, (req, res, next) => {
  const {username, password} = req.body;
  delete req.body.password;

  User.findOne({username})
    .then(user => {
      if (!user || !user.compareHash(password)) {
        throw {code: 400, message: 'invalid username or password'};
      }
      return token.sign(user);
    })
    .then(token => res.send({token}))
    .catch(next);
});

module.exports = router;