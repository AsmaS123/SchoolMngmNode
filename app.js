const express = require('express');
var http = require('http');
const app = express();
var events = require('events');
var eventEmitter = new events.EventEmitter();

app.get('/', (req, res) => {
  const obj = {
    "name":'asma'
  }
  res.send(obj);
});

app.listen(3005, () => {
  console.log('Server is running on port 3005');
});

