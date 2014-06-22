// test to see if the LED will work

// get the module
var gpio = require("pi-gpio");

// open the pin for output
gpio.open(16, "output", function(err) {
  // turn the pin on, 1 == true
  gpio.write(16, 1, function() {
    // create a timer
    setTimeout(function(){
      // turn the pin off, 0 == false
      gpio.write(16, 0, function() {
        // we are done with this pin, so close it
        gpio.close(16);
      });
    }, 1000); // 1000 milliseconds == 1 second
  });
});