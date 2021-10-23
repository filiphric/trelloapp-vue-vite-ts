const moment = require('moment');
const Busboy = require('busboy');
const os = require('os');
const sendmail = require('sendmail')();
const path = require('path'); // used for file path
const fs = require('fs-extra');
const socket = require('socket.io-client')('http://localhost:3001');

function randomId() {
  return Math.floor(100000 * Math.random() * 900000);
}

module.exports = (req, res, next) => {
  const unauthorized = function() {
    return res.status(403).jsonp({
      error: 'User not authorized to access resource'
    });
  };

  const userNotFound = function() {
    return res.status(404).jsonp({
      error: 'User not found'
    });
  };

  const badRequest = function(param) {
    return res.status(400).jsonp({
      error: `Bad request. ${param} is required.`
    });
  };

  const parseJWT = function() {
    if (
      req.headers.hasOwnProperty('authorization') &&
      req.headers['authorization'].length
    ) {
      const base64Url = req.headers.authorization.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(Buffer.from(base64, 'base64'));
    }

    return false;
  };

  const { db } = req.app;
  const userData = parseJWT();
  const userId = parseInt(userData.sub);

  db.assign(
    require('require-uncached')('./backend/data/database.json')
  ).write();

  // create board
  if (req.method === 'POST' && req.path === '/boards') {
    req.body.user = userId || 0;
    req.body.id = randomId();
    req.body.starred = false;
    req.body.created = moment().format('YYYY-MM-DD');
    socket.emit('boardCreated', req.body);
  }

  if (req.method === 'GET' && req.url === '/boards') {

    const publicBoards = db
      .get('boards')
      .filter({ user: 0 })
      .value();
    const boards = db
      .get('boards')
      .filter({ user: userId })
      .value();

    const result = [...publicBoards, ...boards];

    const response = res.status(200).jsonp(result);

    return response;
  }

  if (req.method === 'GET' && req.url === '/boards?starred=true') {

    const publicBoards = db
      .get('boards')
      .filter({ user: 0 })
      .filter({ starred: true })
      .value();
    const boards = db
      .get('boards')
      .filter({ user: userId })
      .filter({ starred: true })
      .value();

    const result = [...publicBoards, ...boards];

    const response = res.status(200).jsonp(result);

    return response;
  }

  if (req.method === 'DELETE' && req.path.match(/\/boards\/\d*/g)) {
    const id = parseInt(req.path.replace('/boards/', ''));

    socket.emit('boardDeleted', id);
  }

  if (req.method === 'PATCH' && req.path.match(/\/boards\/\d*/g)) {
    const id = parseInt(req.path.replace('/boards/', ''));

    socket.emit('boardUpdate', id, req.body);
  }

  if (req.method === 'POST' && req.path === '/lists') {
    // validation
    if (req.body.boardId === undefined) return badRequest('boardId');

    // data generation
    req.body.id = randomId();
    req.body.created = moment().format('YYYY-MM-DD');

    // stream message
    socket.emit('listCreated', req.body.boardId, req.body);
  }

  if (req.method === 'PATCH' && req.path.match(/\/lists\/\d*/g)) {
    const id = parseInt(req.path.replace('/lists/', ''));
    socket.emit('listUpdated', id, req.body);
  }

  if (req.method === 'DELETE' && req.path.match(/\/lists\/\d*/g)) {
    const id = parseInt(req.path.replace('/lists/', ''));
    socket.emit('listDeleted', id);
  }

  if (req.method === 'POST' && req.path === '/cards') {
    // validation
    if (req.body.boardId === undefined) return badRequest('boardId');
    if (req.body.listId === undefined) return badRequest('listId');

    // data generation
    req.body.id = randomId();
    req.body.created = moment().format('YYYY-MM-DD');
    req.body.deadline = moment()
      .add(3, 'days')
      .format('YYYY-MM-DD');
    req.body.description = '';
    req.body.completed = false;

    // stream message
    socket.emit('cardCreated', req.body.listId, req.body);
  }

  if (req.method === 'PATCH' && req.path.match(/\/cards\/\d*/g)) {
    // stream message
    const id = parseInt(req.path.replace('/cards/', ''));
    const card = db
      .get('cards')
      .find({ id })
      .value();
    socket.emit('cardUpdated', id, { ...card, ...req.body });
  }

  if (req.method === 'DELETE' && req.path.match(/\/cards\/\d*/g)) {
    // stream message
    const id = parseInt(req.path.replace('/cards/', ''));
    const card = db
      .get('cards')
      .find({ id })
      .value();
    socket.emit('cardDeleted', id, { ...card, ...req.body });
  }

  if (req.method === 'POST' && req.path === '/upload') {
    const cardid = req.headers.cardid;

    let fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', (fieldname, file, filename) => {
      fstream = fs.createWriteStream(
        `${__dirname}/data/uploaded/${cardid}_${filename}`
      );
      file.pipe(fstream);
      fstream.on('close', () => {
        res
          .status(201)
          .jsonp({ path: `/data/uploaded/${cardid}_${filename}` });
      });
    });

    return;
  }

  if (req.method === 'GET' && req.path === '/users') {
    if (!userData) return unauthorized();

    const user = db
      .get('users')
      .find({ id: userId })
      .value();
    const result = { user };

    if (!user) return userNotFound();

    const response = res.status(200).jsonp(result);

    return response;
  }

  if (req.method === 'POST' && req.path === '/welcomeemail') {
    // send welcome email if header is true
    sendmail(
      {
        from: 'trelloapp@filiphric.sk',
        to: req.body.email,
        subject: 'Welcome to Trello app',
        html:
          'Your account was successfully created!\nIn the meantime, subscribe to my <a href="https://www.youtube.com/channel/UCDOCAVIhSh5VpJMEfdak1OA">YouTube channel for Cypress tips!</a>'
      },
      function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
      }
    );

    let response = res.status(201).jsonp(req.body);
    return response;
  }

  // cleanup methods
  if (req.method === 'POST' && req.path === '/reset') {
    db.setState({
      boards: [],
      cards: [],
      users: [],
      lists: []
    }).write();

    socket.emit('boardsState', []);

    return res.sendStatus(204);
  }

  if (req.method === 'DELETE' && req.path === '/boards') {
    db.set('boards', []).write();
    db.set('lists', []).write();
    db.set('cards', []).write();

    return res.sendStatus(204);
  }

  if (req.method === 'DELETE' && req.path === '/lists') {
    db.set('lists', []).write();
    db.set('cards', []).write();

    return res.sendStatus(204);
  }

  if (req.method === 'DELETE' && req.path === '/cards') {
    db.set('cards', []).write();

    return res.sendStatus(204);
  }

  if (req.method === 'DELETE' && req.path === '/users') {
    db.set('users', []).write();

    return res.sendStatus(204);
  }

  next();
};
