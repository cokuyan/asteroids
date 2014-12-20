(function() {
  "use strict";

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (params) {
    params.vel = 0;
    params.dir = this.randomDir();
    params.radius = Ship.RADIUS;
    params.color = Ship.COLOR;
    Asteroids.MovingObject.call(this, params);
  }

  Ship.RADIUS = 10;
  Ship.COLOR = "blue";
  Ship.IMPULSE = 1;
  Ship.STEER = Math.PI / 15;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse, dir) {
    this.dir += dir * Ship.STEER;
    if (impulse < 0 && this.vel === 0) return;
    this.vel += impulse * Ship.IMPULSE;
  };

  Ship.prototype.fireBullet = function () {
    this.game.add(new Asteroids.Bullet({pos: this.pos, dir: this.dir, game: this.game}))
  };

  Ship.prototype.collideWith = function (asteroid) {
    if (asteroid instanceof Asteroids.Asteroid) {
      this.relocate();
    }
  };

  Ship.prototype.relocate = function () {
    this.vel = 0;
    this.dir = this.randomDir();
    this.pos = this.game.randomPos();
  };

}());
