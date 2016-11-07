const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Team = require('../models/team');
const ensureRole = require('../auth/ensure-role');

router
  .get('/', (req, res, next) => {
    const query = {};
    if(req.query.teamName) query.teamName = req.query.teamName;

    Team.find(query)
      .populate({path: 'regionId', select: 'region'})
      .lean()
      .then(team => res.send(team))
      .catch(() => next({code: 400, message: 'Bad request'}));
  })

  .get('/:id', (req, res, next) => {
    Team.findById(req.params.id)
      .populate({path: 'regionId', select: 'region'})
      .lean()
      .then(team => res.send(team))
      .catch(() => next({code: 404, message: 'Resource not found'}));
  })

  .post('/', bodyParser, (req, res, next) => {
    new Team(req.body).save()
      .then(saved => res.send(saved))
      .catch(() => next({code: 400, message: 'Bad request'}));
  })

  .put('/:id', bodyParser, ensureRole('admin'), (req, res, next) => {
    Team.findById(req.params.id)
      .then(team => {
        team.update(req.body)
        .then(updated => res.send(updated))
        .catch(() => next({code:400, message: 'Bad request'}));
      })
      .catch(() => next({code: 404, message: 'Resource not found'}));
  })

  .delete('/:id', ensureRole('admin'),(req, res, next) => {
    Team.findByIdAndRemove(req.params.id)
      .then(deleted => {
        res.send(`Resource ${deleted.id} was deleted`);
      })
      .catch(() => next({code: 404, message: 'Resource not found'}));
  });

module.exports = router;