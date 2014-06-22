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
// open the pin we are going to use
gpio.open(gpioPin, "output", function(err){
  // if there was an error let us know
  if (err) {
    throw err;
    // turn the pin off and close it, just in case
    gpio.write(gpioPin, 0, function(){
      gpio.close(gpioPin);
      process.exit(0);
    });
  }
});
// what happens when the tweet event is fired
emitter.on('tweet', function() {
  gpio.open(gpioPin, "output", function(err){
    // turn on the pin
    gpio.write(gpioPin, 1, function(){
      // start a timer that lasts 40 milliseconds
      setTimeout(function(){
        // turn the pin off
        gpio.write(gpioPin, 0);
      }, 40);
    });
  });
});

stream.on('tweet', function (tweet) {
  // put the tweet in the console
  console.log("> %s \r", tweet.text);
  // let the program know a tweet happened
  emitter.emit('tweet');
});

// start a 10 second timer for this little app
setTimeout(function() {
  gpio.write(gpioPin, 0, function(){
    gpio.close(gpioPin);
    // close this program
    process.exit(0);
  });
}, 10000);