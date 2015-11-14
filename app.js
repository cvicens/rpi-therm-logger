var sensor = require('ds18x20');

var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var RestLogger = require('./rest-logger');
var logger = new RestLogger(config);

function sendTempData (sensorId, temp) {
  logger.sendTempData(sensorId, temp, true, function (err, response, body) {
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
}

setInterval(function () {
  sensor.list(function (err, listOfDeviceIds) {
      console.log('[DEBUG] Devices: ' + listOfDeviceIds);
      for (var i = 0; i < listOfDeviceIds.length; i++) {
        console.log('[FINE] deviceId: ' + listOfDeviceIds[i]);
        sensor.get(listOfDeviceIds[i], function (err, temp) {
            if (!err) {
              sendTempData(listOfDeviceIds[i], temp);
            }
        });
      }
  });


}, 1000);
