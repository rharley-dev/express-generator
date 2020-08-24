const cors = require('cors');

// whitelist means a list of specified origins to be used
const whitelist = ['http://localhost:3000', 'https://localhost:3443'];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  console.log(req.header('Origin'));
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

// calling cors func which returns a middleware func configuring to set a cors header (Access-Control-Allow-Origin) with a * as its value
exports.cors = cors();
// setting cors header with the specified whitelisted items as its value
exports.corsWithOptions = cors(corsOptionsDelegate);
