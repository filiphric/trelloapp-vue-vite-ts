const sendmail = require('sendmail')();
const path = require('path'); // used for file path
const fs = require('fs-extra');
const socket = require('socket.io-client')('http://localhost:3001');

module.exports = (req, res, next) => {

  const { db } = req.app;

  // prevent from caching database.json file
  // this is different from nocache(), which prevents 304 status codes
  db.assign(
    require('import-fresh')('./backend/data/database.json')
  ).write();

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

  next();
};
