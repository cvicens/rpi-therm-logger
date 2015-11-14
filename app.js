var sensor = require('ds18x20');

var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var RestLogger = require('./rest-logger');
var logger = new RestLogger(config);

function sendTempData (sensorId, temp) {
  console.log('[FINEST] sensorId: ' + sensorId + ' temp: ' + temp);
  logger.sendTempData(sensorId, temp, true, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      console.log('[DEBUG] body: ' + JSON.stringify(body));
    } else {
      if (err) {
        console.error('[ERROR] err: ' + err);
      } else {
        console.error('[ERROR] response: ' + response);
      }
    }
  });
}

setInterval(function () {
  sensor.list(function (err, listOfDeviceIds) {
      console.log('[DEBUG] Devices: ' + listOfDeviceIds);
      for (var i = 0; i < listOfDeviceIds.length; i++) {
        var deviceId = listOfDeviceIds[i];
        console.log('[FINE] deviceId: ' + deviceId);
        sensor.get(deviceId, function (err, temp) {
            if (!err) {
              console.log('[FINE] deviceId: ' + deviceId + ' temp: ' + temp);
              sendTempData(deviceId, temp);
            }
        });
      }
  });
}, 1000);
