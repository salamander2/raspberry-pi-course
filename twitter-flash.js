// load the config.json file
var config = require('./config');
// get the initial module we are going to use
var gpio = require('pi-gpio');
var Promise = require("native-promise-only");
var Twit = require('twit');
var Emitter = require('events').EventEmitter;
var emitter = new Emitter();
// stat the twit stuff
var T = new Twit({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token: config.access_token,
  access_token_secret: config.access_token_secret
});

// filter the public stream by english tweets containing `#toronto, #ldnont, #BostonStrong`
var stream = T.stream('statuses/filter', {
  track: [
  '#raspberrypi',
  '@raspberry_pi',
  '#nodejs'
  ],
  language: 'en'
});

// this is the pin we are going to use to toggle
var gpioPin = 16;
// the starting state of the light
var on = 1;
// what happens when the tweet event is fired
emitter.on('tweet', function() {
  // toggle the pin
  gpio.write(gpioPin, on, function(){
    on = (on + 1) % 2;
  });
});

stream.on('tweet', function (tweet) {
  console.log("> %s \r", tweet.text);
  emitter.emit('tweet');
});