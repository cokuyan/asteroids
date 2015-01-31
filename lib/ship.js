(function() {
  "use strict";

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (params) {
    params.vel = [0, 0];
    params.radius = Ship.RADIUS;
    Asteroids.MovingObject.call(this, params);
    this.dir = this.randomDir();
    this.loadImage();
    this.lives = Ship.LIVES;
    this.isDead = false;
    // this.isHit = false; // not sure how to use this since ship will be relocated
    // this.particles = []; // for explosion animation
  }

  Ship.RADIUS = Asteroids.Game.DIM_X/75;
  Ship.IMPULSE = 0.5;
  Ship.STEER = Math.PI / 30;
  Ship.MAX_VEL = 7;
  Ship.LIVES = 5; // decrement on getting hit

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.angleRight = function () {
    this.dir += Ship.STEER;
  };

  Ship.prototype.angleLeft = function () {
    this.dir -= Ship.STEER;
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

  Ship.prototype.resetSpeedToMax = function () {
    this.vel = Asteroids.Util.vectorByDirAndNorm(this.dir, Ship.MAX_VEL);
  };

  Ship.prototype.randomDir = function () {
    return Math.random() * 2 * Math.PI;
  };

  Ship.prototype.fireBullet = function () {
    var bulletVel = Asteroids.Util.vectorByDirAndNorm(
      this.dir,
      Asteroids.Bullet.SPEED
    );

    var bulletPos = [
      this.pos[0] + this.radius * Math.cos(this.dir),
      this.pos[1] + this.radius * Math.sin(this.dir)
    ];

    this.game.add(new Asteroids.Bullet({
      pos: bulletPos,
      vel: bulletVel,
      game: this.game
    }));
  };

  Ship.prototype.collideWith = function (asteroid) {
    if (asteroid instanceof Asteroids.Asteroid && this.lives !== 0) {
      this.lives--;
      this.relocate();
    } else {
      this.isDead = true;
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
    if (this.isDead) return;
    this.rotateShip(this.image, this.pos[0], this.pos[1], this.dir, ctx);
  };

  Ship.prototype.rotateShip = function (image, x, y, angle, context) {

  	// save the current co-ordinate system
  	context.save();

  	// move to the middle of image
  	context.translate(x, y);

  	// rotate around that point
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

  	// and restore the co-ords
  	context.restore();
  };

}());
