(function() {
  "use strict";

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (params) {
    params.radius = Bullet.RADIUS;
    params.color = Bullet.COLOR;
    Asteroids.MovingObject.call(this, params);
  }

  Bullet.SPEED = 10;
  Bullet.RADIUS = 5;
  Bullet.COLOR = "red";

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (asteroid) {
    if (asteroid instanceof Asteroids.Asteroid) {
      this.game.remove(this);
      asteroid.breakApartOrRemove();
    }
  }

  Bullet.prototype.wrappable = function () {
    return false;
  };

}());
