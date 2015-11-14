var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var RestLogger = require('./rest-logger');
var logger = new RestLogger(config);


setInterval(function () {
  var tempObj = {"28-000006432129":23.3};
  logger.sendTempData(tempObj[0], tempObj[1], true, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      console.log('body: ' + JSON.stringify(body));
    } else {
      if (err) {
        console.error('err: ' + err);
      } else {
        console.error('err response: ' + response);
      }
    }
  });
}, 1000);
