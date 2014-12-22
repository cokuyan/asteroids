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
    this.loadImage();
  }

  Ship.RADIUS = 10;
  Ship.COLOR = "blue";
  Ship.IMPULSE = 1;
  Ship.STEER = Math.PI / 15;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse, dir) {
    this.dir += dir * Ship.STEER;
    if (impulse === 1) {
      this.accelerate();
    } else if (impulse === -1) {
      this.decelerate();
    }
  };

  Ship.prototype.accelerate = function () {
    // based on direction facing, add to velocity vector
    this.vel[0] += Ship.IMPULSE * Math.cos(this.dir);
    this.vel[1] += Ship.IMPULSE * Math.sin(this.dir);
  };

  Ship.prototype.decelerate = function () {
    // based on direction facing, subtract from velocity vector
    this.vel[0] -= Ship.IMPULSE * Math.cos(this.dir);
    this.vel[1] -= Ship.IMPULSE * Math.sin(this.dir);
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

  Ship.prototype.loadImage = function () {
    this.image = new Image();
    this.image.src = './vendor/bakuden.png';
  };

  Ship.prototype.draw = function (ctx) {
    this.rotateShip(this.image, this.pos[0], this.pos[1], this.dir, ctx);
  }

  Ship.prototype.rotateShip = function (image, x, y, angle, context) {

  	// save the current co-ordinate system
  	// before we screw with it
  	context.save();

  	// move to the middle of where we want to draw our image
  	context.translate(x, y);

  	// rotate around that point, converting our
  	// angle from degrees to radians
  	context.rotate(angle + Math.PI / 2);

  	// draw it up and to the left by half the width
  	// and height of the image
  	context.drawImage(
      image,
      -(this.radius),
      -(this.radius),
      2 * this.radius,
      2 * this.radius
    );

  	// and restore the co-ords to how they were when we began
  	context.restore();
  }

}());
