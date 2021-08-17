import { PluginOption } from "vite";

export const startServer = (): PluginOption => {
  
  const jsonServer = require('json-server');
  const auth = require('json-server-auth');
  const nocache = require('nocache')

  const server = jsonServer.create();

  const defaults = jsonServer.defaults({ static: '.' });
  const busboy = require('connect-busboy');
  const history = require('connect-history-api-fallback');
  const middleware = require('./middleware');

  const router = jsonServer.router('./data/database.json');

  server.db = router.db;
  server.use(history());
  server.use(defaults);
  server.use(nocache());
  server.use(busboy());
  server.use(jsonServer.rewriter({
    '/users/*': '/600/users/$1',
  }));
  server.use(auth);
  server.use(jsonServer.bodyParser);
  server.use(middleware);

  server.use(router);
  const app = server.listen(3001);

  const io = require('socket.io')(app);

  io.on('connection', (socket) => {
    socket.on('boardCreated', (message) => {
      io.emit('boardCreated', message);
    });
    socket.on('boardsState', (message) => {
      io.emit('boardsState', message);
    });
    socket.on('boardDeleted', (id) => {
      io.emit('boardDeleted', id);
    });
    socket.on('boardUpdate', (id, message) => {
      io.emit('boardUpdate', id, message);
    });
    socket.on('listCreated', (boardId, message) => {
      io.emit('listCreated', boardId, message);
    });
    socket.on('listUpdated', (id, message) => {
      io.emit('listUpdated', id, message);
    });
    socket.on('listDeleted', (id) => {
      io.emit('listDeleted', id);
    });
    socket.on('cardCreated', (listId, message) => {
      io.emit('cardCreated', listId, message);
    });
    socket.on('cardUpdated', (id, message) => {
      io.emit('cardUpdated', id, message);
    });
    socket.on('cardDeleted', (id, message) => {
      io.emit('cardDeleted', id, message);
    });

  });
  return null;
}

export const createServer = (): PluginOption => {
  return startServer()
}