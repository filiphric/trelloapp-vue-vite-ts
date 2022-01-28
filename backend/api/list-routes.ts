import { validate } from '../utils/validate';
import { randomId } from '../utils/randomId'

const moment = require('moment');

const jsonServer = require('json-server');
const app = jsonServer.create();

app.post('/', ({ body }, res, next) => { 

  validate(['boardId'], body, res)

  // data generation
  body.id = randomId();
  body.created = moment().format('YYYY-MM-DD');

  // stream message
  // socket.emit('listCreated', req.body.boardId, req.body);  

  next()

});

app.delete('/', ({ app: { parent: { db } } }, res) => { 

  db.set('lists', []).write();
  db.set('cards', []).write();

  return res.status(204).end();

})

export default app;
