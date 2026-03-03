const jsonServer = require('json-server');
const app = jsonServer.create();

app.post('/', (req, res, next) => {
  next()
})

export default app;