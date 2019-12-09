//      
"use strict";


let huejay = require('huejay');
const fs = require('fs');


let client = new huejay.Client({
  host: '192.168.1.19',
  username: process.env.HUE_USERNAME,

});

const getTemperature = (id        )                  => {
  return client.sensors.getById(id)
    .then(sensor => {
      return sensor.state.attributes.attributes.temperature / 100;
    })
    .catch(error => {
      console.log('Could not find sensor');
      console.log(error.stack);
    });
}

const init = () => {
  let text         = Date.now() + ",";
  getTemperature(41).then(res => {
    text += res + ",";
    getTemperature(46).then(res2 => {
      text += res2;
      console.log(text);
      fs.appendFile("temperature.csv", text + '\n', function (err) {
        if (err) {
          return console.log(err);
        }
      });
    })
  })
}

init();
setInterval(() => {
  init();
}, 1000 * 60 * 15)