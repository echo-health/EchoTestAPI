const restify = require('restify');
const server = restify.createServer();
const utils = require('./utils');

const isAuthorized = (req, res, next) => {
  if (/^\/(patients|version|reduce)/.test(req.path())) {
    next();
  } else {
    res.send('Unauthorised');
  }
}

server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(isAuthorized);

server.get('/version', (req, res) =>
  res.send('OK')
);

server.post('/reduce', (req, res) => {
  res.send(JSON.stringify(utils.reduce(req.params.reduce)));
});

server.get('/secret', (req, res) => {
  res.send({secret: 1234567890});
});

server.listen(5000), () => {
  console.log('server listening');
};