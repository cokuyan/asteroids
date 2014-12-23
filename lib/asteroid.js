(function() {
  "use strict";

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (params) {
    params.radius = this.randomRadius();
    params.vel = Asteroids.Util.randomVec(5);
    Asteroids.MovingObject.call(this, params);
    this.tick = 0; // increase tick by 1 each time draw is called
    this.loadImage();
  }

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.RADIUS = 40;
  Asteroid.RADII = [20, 30, 40, 50, 60, 70];

  Asteroid.prototype.draw = function (ctx) {
    this.animateAsteroid(ctx);
    this.tick++;
  };

  Asteroid.prototype.randomRadius = function () {
    return Asteroid.RADII[Math.floor(Math.random() * 6)];
  }

  Asteroid.prototype.animateAsteroid = function (ctx) {
    var frame = this.tick % 19;
    var x = (frame % 5) * 72;
    var y = Math.floor(frame / 5) * 72;
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.drawImage(
      this.image,
      x, y, 72, 72,
      -(this.radius), -(this.radius), 2 * this.radius, 2 * this.radius
    );
    ctx.restore();
  };

  Asteroid.prototype.loadImage = function () {
    this.image = new Image();
    this.image.src = './vendor/asteroid1.png';
  };

}());
