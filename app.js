var sensor = require('ds18x20');

sensor.list(function (err, listOfDeviceIds) {
    console.log(listOfDeviceIds);
});

sensor.getAll(function (err, tempObj) {
    console.log(JSON.stringify(tempObj));
});
