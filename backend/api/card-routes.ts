import { cardValidation } from '../validators';
import { randomId } from '../utils/randomId'

const moment = require('moment');

const jsonServer = require('json-server');
const app = jsonServer.create();

app.post('/', cardValidation, ({ body }, res, next) => { 
 // data generation
 body.id = randomId();
 body.created = moment().format('YYYY-MM-DD');
 body.deadline = moment()
   .add(3, 'days')
   .format('YYYY-MM-DD');
 body.description = '';
 body.completed = false;

 // stream message
//  socket.emit('cardCreated', body.listId, body);

  next()
});

app.delete('/', ({ app: { parent: { db } } }, res) => { 

  db.set('cards', []).write();

  res.sendStatus(204);

})

export default app;