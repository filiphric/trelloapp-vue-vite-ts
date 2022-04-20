const jsonServer = require('json-server');
const app = jsonServer.create();
const moment = require('moment');
import { getUserId } from '../utils/getUserId'

app.get('/', ({ app: { parent: { db } }, headers, query }, res) => { 

  if (query?.starred === 'true') {
    query.starred = true
  }
  if (query?.starred === 'false') {
    query.starred = false
  }

  const publicBoards = db
    .get('boards')
    .filter({ user: 0, ...query })
    .value();
  const privateBoards = db
    .get('boards')
    .filter({ user: getUserId(headers), ...query })
    .value();

  const result = [...publicBoards, ...privateBoards];

  const response = res.status(200).jsonp(result);

  return response;

})

app.post('/', ({ headers, body }, res, next) => {

  body.user = getUserId(headers) || 0;
  body.starred = false;
  body.created = moment().format('YYYY-MM-DD');
  
  // socket.emit('boardCreated', req.body);

  next()

})

app.delete('/', ({ app: { parent: { db } } }, res) => { 

    db.set('boards', []).write();
    db.set('lists', []).write();
    db.set('cards', []).write();

    return res.status(204).end();

})

export default app;