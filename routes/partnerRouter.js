const express = require("express");
const bodyParser = require("body-parser");

const partnerRouter = express.Router();

// since this is a express application .use is for attaching middleware
partnerRouter.use(bodyParser.json());

partnerRouter
  .route("/")
  //chaining methods to the root path
  // Routing method catch-all for HTTP verbs
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next(); // Passes control of routing to the next relevent method below
  })
  .get((req, res) => {
    res.end("Will send all the partners to you");
  })
  .post((req, res) => {
    res.end(
      `Will add the campsite: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /partners");
  })
  .delete((req, res) => {
    res.end("Deleting all partners");
  });
// Adding a route param to the end of the path (allows to store what the client sends as a part of the path as a route param)
partnerRouter
  .route("/:partnerId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next(); // Passes control of routing to the next relevent method below
  })
  .get((req, res) => {
    res.end(`Will send details of the partner: ${req.params.partnerId} to you`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /partners/${req.params.partnerId}`
    );
  })
  .put((req, res) => {
    res.write(`Updating the partner: ${req.params.partnerId}\n`);
    res.end(`Will update the partner: ${req.body.name}
      with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end(`Deleting partner: ${req.params.partnerId}`);
  });

module.exports = partnerRouter;
