(function() {
  "use strict";

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  Util.inherits = function (Child, Parent) {
    function Surrogate() {};
    Surrogate.prototype = Parent.prototype;
    Child.prototype = new Surrogate();
  };

  Util.randomVec = function (length) {
    var x = Math.floor((Math.random() * 2 - 1) * length + 1);
    var y = Math.floor((Math.random() * 2 - 1) * length + 1);
    return [x, y];
  };

  Util.distance = function (pos1, pos2) {
    var dx = pos1[0] - pos2[0];
    var dy = pos1[1] - pos2[1];
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  };

  Util.norm = function (vector) {
    return Util.distance([0, 0], vector);
  };

  Util.vectorDir = function (vector) {
    return Math.atan2(vector[1], vector[0]);
  };

  Util.vectorByDirAndNorm = function (dir, norm) {
    return [norm * Math.cos(dir), norm * Math.sin(dir)];
  }

}());
