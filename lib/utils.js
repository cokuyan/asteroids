(function() {
  "use strict";

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Util = {};

  Asteroids.Util.inherits = function (Child, Parent) {
    function Surrogate() {};
    Surrogate.prototype = Parent.prototype;
    Child.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function (length) {
    var x = Math.floor((Math.random() * 2 - 1) * length + 1);
    var y = Math.floor((Math.random() * 2 - 1) * length + 1);
    return [x, y];
  }

}());
