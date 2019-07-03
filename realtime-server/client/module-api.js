var RestClient = require('node-rest-client').Client;
var client = new RestClient();
var host = 'localhost';
var port = 3000;
var endpoint = `http://${host}:${port}`;

module.exports.startStreaming = (_svcCd, _roomId, _accountId) => {
  return new Promise((resolve, reject) => {
    client.get(
      endpoint,
      {
        headers: {
          'Content-type': 'application/json'
        },
        parameters: {
          serviceCd: _svcCd,
          roomId: _roomId,
          accountId: _accountId
        }
      },
      function(data, res) {
        console.log(
          'callback: ',
          res.statusCode,
          res.body,
          res.result,
          res.message
        );
        if (res.statusCode == 200) {
          if (data) {
            res.body = data;
          }
          resolve(res);
        } else {
          reject(res);
        }
      }
    );
  });
};
