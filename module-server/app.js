var express = require('express');
var app = express();
var http = require('http').Server(app);
const PORT = process.env.PORT || 3000;
var redis = require('redis').createClient(6379, '127.0.0.1');

http.listen(PORT, function() {
  console.log('server listening. Port: ' + PORT);
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
