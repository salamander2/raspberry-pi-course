// use this file to turn off the LED if something goes wrong

// load up the module we need
var gpio = require("pi-gpio");

// open the pin
gpio.open(16, "output", function(err) {
  // turn the pin off, 0 == false
  gpio.write(16, 0, function() {
    // close this pin
    gpio.close(16);
  });
});