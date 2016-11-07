const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Region = require('../models/region');
const ensureRole = require('../auth/ensure-role');

router
  .get('/', (req, res, next) => {
    const query = {};
    if (req.query.region) query.region = req.query.region;
    Region.find(query)
      .then(region => res.send(region))
      .catch(() => next ({code: 400, message: 'Bad request'}));
  })

    .get('/:id', (req, res, next) => {
      Region.findById(req.params.id)
        .then(region => res.send(region))
        .catch(() => net({code:400, message: 'Bad request'}));
    })

    .post('/', bodyParser, (req, res, next) => {
      new Region(req.body).save()
        .then(saved => res.send(saved))
        .catch(() => next({code:400, message: 'Bad request'}));
    })

    .put('/:id', bodyParser, ensureRole('admin'), (req, res, next) => {
      Region.findById(req.params.id)
        .then(region => {
          region.update(req.body)
          .then(updated => res.send(updated))
          .catch(() => next ({code:400, message: 'Bad request'}));
        })
          .catch(() => next({code:404, message: 'Resource not found'}));
    })

    .delete('/:id', ensureRole('admin'), (req, res, next) => {
      Region.findByIdAndRemove(req.params.id)
        .then(deleted => {
          res.send(`Resource ${deleted.id} was deleted`);
        })
        .catch(() => next({code:404, message: 'Resource not found'}));
    });

module.exports = router;

