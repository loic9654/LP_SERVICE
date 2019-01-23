const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');
const router = require('./router.js');
const morgan = require('morgan');
const database = require('./database.js');
const bodyParser = require('../node_modules/body-parser');


let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();

    app.use(morgan('combined'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.use((req,res,next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'origin,X-Requested-With,Content-Type,accept, Authorization');
    });
    if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE,GET');
      return res.status(200).json();
    }

    app.use('/api', router);

    //require('./router/index')(app);

    httpServer = http.createServer(app);
    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);

        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;
