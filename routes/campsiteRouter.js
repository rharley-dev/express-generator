const express = require('express');
const bodyParser = require('body-parser');
const Campsite = require('../models/campsite');

const campsiteRouter = express.Router();

// since this is a express application .use is for attaching middleware (e.g. bodyParser)
campsiteRouter.use(bodyParser.json());

campsiteRouter
  .route('/')
  .get((req, res, next) => {
    Campsite.find()
      .then(campsites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsites); // send json data to client and close res stream
      })
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    Campsite.create(req.body) // auto saves doc and creates a promise, (req.body) body parcer middleware
      .then(campsite => {
        console.log('Campsite Created ', campsite);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
      })
      .catch(err => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
  })
  .delete((req, res, next) => {
    Campsite.deleteMany()
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });
// Adding a route param to the end of the path (allows to store what the client sends as a part of the path as a route param)
campsiteRouter
  .route('/:campsiteId')
  .get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
      })
      .catch(err => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /campsites/${req.params.campsiteId}`
    );
  })
  .put((req, res, next) => {
    Campsite.findByIdAndUpdate(
      req.params.campsiteId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
      })
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Campsite.findByIdAndDelete(req.params.campsiteId)
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });

module.exports = campsiteRouter;
