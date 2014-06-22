// get the initial module we are going to use
var gpio = require('pi-gpio');

// set up a few starting variables
var intervalId;
var  durationId;
// this is the pin we are going to use to toggle
var gpioPin = 16;

// open our pin for output
gpio.open(gpioPin, "output", function(err){
  var on = 1;
  // let us know what we are doing
  console.log('GPIO pin ' + gpioPin + '');
  // create a function that runs every 100ms
  intervalId = setInterval(function(){
    // toggle the pin. if it is 1 make it 0 and if its 0 make it 1
    gpio.write(gpioPin, on, function(){
      on = (on + 1) % 2;
    });
  }, 100); // 100 milliseconds
});

// how long is the while thing going to run? 10 seconds, or 10,000 milliseconds
durationId = setTimeout(function(){
  // clear the old timer because we dont want it to run anymore
  clearInterval(intervalId);
  // let us know what is happening
  console.log('10 seconds blinking completed');
  // turn off the pin
  gpio.write(gpioPin, 0, function(){
    // close the pin completely
    gpio.close(gpioPin);
    // close node and end this program
    process.exit(0);
  });
}, 10000); // 100000 milliseconds is 10 seconds
