import { randomId } from './utils/randomId';

const moment = require('moment');
const Busboy = require('busboy');
const os = require('os');
const sendmail = require('sendmail')();
const path = require('path'); // used for file path
const fs = require('fs-extra');
const socket = require('socket.io-client')('http://localhost:3001');

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

  const parseJWT = function() {
    if (
      req.headers.hasOwnProperty('authorization') &&
      req.headers['authorization'].length
    ) {
      const base64Url = req.headers.authorization.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(Buffer.from(base64, 'base64') as unknown as string);
    }

    return false;
  };

  const { db } = req.app;
  const userData = parseJWT();
  const userId = parseInt(userData.sub);

  // create board
  if (req.method === 'POST' && req.path === '/boards') {
    req.body.user = userId || 0;
    req.body.id = randomId()
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
        html:
          'Your account was successfully created!\nIn the meantime, subscribe to my <a href="https://www.youtube.com/channel/UCDOCAVIhSh5VpJMEfdak1OA">YouTube channel for Cypress tips!</a>',
        subject: 'Welcome to Trello app',
        to: req.body.email
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
      lists: [],
      users: []
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

  if (req.method === 'DELETE' && req.path === '/users') {
    db.set('users', []).write();

    return res.sendStatus(204);
  }

  next();
};
