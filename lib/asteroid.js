(function() {
  "use strict";

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (params) {
    params.color = Asteroid.COLOR;
    params.radius = Asteroid.RADIUS;
    params.vel = this.randomVel();
    params.dir = this.randomDir();
    Asteroids.MovingObject.call(this, params);
  }

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = "gray";
  Asteroid.RADIUS = 10;

  Asteroid.prototype.randomVel = function () {
    return Math.floor((Math.random() * 2 - 1) * Asteroid.RADIUS);
  };

}());
