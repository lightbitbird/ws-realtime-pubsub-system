var express = require('express');
var module = require('./client/module-api');
var app = express();
const config = { pingTimeout: 60000 };
var http = require('http').Server(app);
const io = require('socket.io', config)(http);
const host = process.env.ENV_HOST || '127.0.0.1';
const port = process.env.SYNC_PORT || 7000;
const redis_port = process.env.REDIS_PORT || 6379;
var subscriber = require('redis').createClient(redis_port, host);
var serverErrorKey = 'error';

http.listen(port, function() {
  console.log('server listening. Port: ' + port);
});

const listen = () => {
  io.on('connection', function(socket) {
    console.log('connected');

    console.log('socket.query = ', socket.handshake.query);
    const serviceCd = `${socket.handshake.query.serviceCd}`;
    const roomId = `${socket.handshake.query.roomId}`;
    const accountId = `${socket.handshake.query.accountId}`;
    const channel = `${serviceCd}${roomId}${accountId}`;
    subscriber.subscribe(channel);

    console.log('channel= ', channel);
    socket.join(channel, () => {
      console.log(`${channel} joined!`);
      io.to(socket.id).emit(channel, `${channel} joined!`);
      requestStart(module.startStreaming(serviceCd, roomId, accountId));
    });

    // Send messages to a redis subscriber
    // subscriber.on('pmessage', function(pattern, chan, msg) {
    subscriber.on('message', function(chan, msg) {
      console.log(`message: ${msg} by ${chan}`);
      socket.emit(chan, msg);
    });

    socket.on(serverErrorKey, reason => {
      io.emit('error: ' + reason);
    });

    socket.on('disconnect', reason => {
      console.log('server disconnected!!!');
      subscriber.unsubscribe(channel);
      io.emit('disconnected: ' + reason);
    });

    var requestStart = promise => {
      promise
        .then(res => {
          console.log(
            'success request to the module: ',
            res.statusCode,
            res.body
          );
        })
        .catch(e => {
          console.log(e);
          io.to(socket.id).emit(serverErrorKey, `Server Error!`);
          // io.to('error').emit(channel, `Server Error!`);
          // socket.disconnect();
        });
    };
  });
};

listen();

app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/static/html/index.html`);
});
