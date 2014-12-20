(function() {
  "use strict";

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (params) {
    params.color = Asteroid.COLOR;
    params.radius = Asteroid.RADIUS;
    params.vel = Asteroids.Util.randomVec(Asteroid.RADIUS);
    Asteroids.MovingObject.call(this, params);
  }

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = "gray";
  Asteroid.RADIUS = 10;

}());
