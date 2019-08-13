var express = require('express');
var app = express();
var http = require('http').Server(app);
const host = process.env.ENV_HOST || '127.0.0.1';
const port = process.env.MODULE_PORT || 3000;
const redis_port = process.env.REDIS_PORT || 6379;
var redis = require('redis').createClient(redis_port, host);

http.listen(port, function() {
  console.log('server listening. Port: ' + port);
});

app.get('/', function(req, res) {
  const msg = 'hello world from module';
  const serviceCd = 'svc';
  setTimeout(() => {
    console.log('publishing...');
    let count = 1;
    var id = setInterval(() => {
      const channel = `${req.query.serviceCd}${req.query.roomId}${req.query.accountId}`;
      console.log('channel= ', channel);
      redis.publish(channel, `channel${req.query.accountId} - ${msg}`);
      if (count > 7) {
        clearInterval(id);
      }
      count++;
    }, 500);
    console.log('msg= ', msg);
    // res.statusCode = 500;
    res.send({ result: msg });
  }, 1000);
});
