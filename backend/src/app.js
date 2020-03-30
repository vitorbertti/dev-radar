const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const { setupWebSocket } = require('./websocket');
require('dotenv/config');

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
const server = http.Server(app);

setupWebSocket(server);

mongoose
   .connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => console.log('Connected'))
   .catch(err => console.log('Error', err.stack));

module.exports = server;
