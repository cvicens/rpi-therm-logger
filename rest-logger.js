var request = require('request');

function RestLogger (config) {
  var self = this;
  self.config = config;

  this.sendTempData = function (sensorId, temp, presence, callback) {
    //console.log('[FINER] config: ' + JSON.stringify(self.config));
    // Get user profile
    var authorization = "Basic " + new Buffer(self.config.user + ":" + self.config.password).toString("base64");

    var url = self.config.TEMPERATURE_SERVICE_URL;
    console.log('url: ' + url);
    url = url.replace(/\:sensorId/g, sensorId);
    console.log('url after 1: ' + url);
    url = url.replace(/\:temp/g, temp);
    console.log('url after 2: ' + url);
    url = url.replace(/\:presence/g, presence);
    console.log('url after 1: ' + url);

    var options = {
      url: url,
      headers: {
        'User-Agent': 'request',
        'Authorization' : authorization
      },
      method : 'GET',
      json : true
    };

    console.log('[FINER] REQUEST: ' + JSON.stringify(options));

    request(options, callback);
  }
}
// properties and methods
RestLogger.prototype = {
  self: this,

};

module.exports = RestLogger;
