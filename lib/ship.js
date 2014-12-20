(function() {
  "use strict";

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (params) {
    params.vel = [0, 0];
    params.radius = Ship.RADIUS;
    params.color = Ship.COLOR;
    Asteroids.MovingObject.call(this, params);
    this.dir = this.randomDir();
  }

  Ship.RADIUS = 10;
  Ship.COLOR = "blue";
  Ship.IMPULSE = 1;
  Ship.STEER = Math.PI / 15;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  // need to figure out how to deal with deceleration
  // need to not completely reassign velocity
  Ship.prototype.power = function (impulse, dir) {
    var velDir = Math.atan2(this.vel[1], this.vel[0]);
    var norm = Asteroids.Util.norm(this.vel);

    this.dir += dir * Ship.STEER;
    if (!impulse) return;
    norm += impulse * Ship.IMPULSE;
    this.vel[0] = norm * Math.cos(this.dir);
    this.vel[1] = norm * Math.sin(this.dir);
    if (impulse < 0) console.log(this.vel);
  };

  Ship.prototype.randomDir = function () {
    return Math.random() * 2 * Math.PI;
  };

  Ship.prototype.fireBullet = function () {
    var velDir = Math.atan2(this.vel[1], this.vel[0]);
    var bulletVel = [];
    bulletVel[0] = Asteroids.Bullet.SPEED * Math.cos(this.dir);
    bulletVel[1] = Asteroids.Bullet.SPEED * Math.sin(this.dir);
    this.game.add(new Asteroids.Bullet({pos: this.pos, vel: bulletVel, game: this.game}))
  };

  Ship.prototype.collideWith = function (asteroid) {
    if (asteroid instanceof Asteroids.Asteroid) {
      this.relocate();
    }
  };

  Ship.prototype.relocate = function () {
    this.vel = [0, 0];
    this.dir = this.randomDir();
    this.pos = this.game.randomPos();
  };

  // need to figure out how to make draw function nice
  Ship.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, (this.dir - Ship.STEER)%(2*Math.PI), false);
    ctx.fill();
  }

}());
