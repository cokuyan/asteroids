(function() {
  "use strict";

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
  };

  Game.DIM_X = window.innerWidth - 100;
  Game.DIM_Y = window.innerHeight - 100;
  Game.NUM_ASTEROIDS = 10;

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid({pos: this.randomPos(), game: this}));
    }
  };

  Game.prototype.randomPos = function () {
    var x = Math.floor(Math.random() * Game.DIM_X);
    var y = Math.floor(Math.random() * Game.DIM_Y);
    return [x, y];
  };

  Game.prototype.moveObjects = function () {
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].pos = this.asteroids[i].move();
    }
  };

  Game.prototype.wrap = function (pos) {
    var wrapped = pos.slice();
    var radius = Asteroids.Asteroid.RADIUS;

    if (pos[0] < 0 - radius) {
      wrapped[0] += Game.DIM_X + radius;
    } else if (pos[0] > Game.DIM_X + radius) {
      wrapped[0] -= Game.DIM_X - radius;
    }

    if (pos[1] < 0 - radius) {
      wrapped[1] += Game.DIM_Y + radius;
    } else if (pos[1] > Game.DIM_Y + radius) {
      wrapped[1] -= Game.DIM_Y - radius;
    }

    return wrapped;
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y)
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(ctx);
    }
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.asteroids.length; i++) {
      for (var j = i + 1; j < this.asteroids.length; j++) {
        if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          this.asteroids[i].collideWith(this.asteroids[j]);
        };
      }
    }
  };

  Game.prototype.remove = function (obj) {
    this.asteroids.splice(this.asteroids.indexOf(obj), 1);
  };

}());
