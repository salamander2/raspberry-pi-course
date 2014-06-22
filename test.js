var gpio = require("pi-gpio");

gpio.open(16, "output", function(err) {
  gpio.write(16, 1, function() {
    gpio.close(16);
  });
  setTimeout(function(){
    gpio.open(16, "output", function(err) {
      gpio.write(16, 0, function() {
        gpio.close(16);
      });
    });
  }, 1000);
});