(function() {
  "use strict";

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.bullets = [];
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship( { pos: this.randomPos(), game: this } );
  };

  Game.DIM_X = window.innerWidth - 100;
  Game.DIM_Y = window.innerHeight - 100;
  Game.NUM_ASTEROIDS = 10;

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({pos: this.randomPos(), game: this}));
    }
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship).concat(this.bullets);
  }

  Game.prototype.randomPos = function () {
    var x = Math.floor(Math.random() * Game.DIM_X);
    var y = Math.floor(Math.random() * Game.DIM_Y);
    return [x, y];
  };

  Game.prototype.moveObjects = function () {
    var allObjs = this.allObjects();
    for (var i = 0; i < allObjs.length; i++) {
      allObjs[i].pos = allObjs[i].move();
      if (!allObjs[i].wrappable() && this.isOutOfBounds(allObjs[i].pos)) {
        this.remove(allObjs[i]);
      }
    }
  };

  Game.prototype.wrap = function (pos) {
    var wrapped = pos.slice();
    var radius = Asteroids.Asteroid.RADIUS;

    if (pos[0] < 0 - radius) {
      wrapped[0] += Game.DIM_X + radius;
    } else if (pos[0] > Game.DIM_X + radius) {
      wrapped[0] -= Game.DIM_X + radius;
    }

    if (pos[1] < 0 - radius) {
      wrapped[1] += Game.DIM_Y + radius;
    } else if (pos[1] > Game.DIM_Y + radius) {
      wrapped[1] -= Game.DIM_Y + radius;
    }

    return wrapped;
  }

  Game.prototype.draw = function (ctx) {
    var allObjs = this.allObjects();
    // ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y)
    for (var i = 0; i < allObjs.length; i++) {
      allObjs[i].draw(ctx);
    }
  };

  Game.prototype.checkCollisions = function () {
    var asteroids = this.asteroids.slice();
    for (var i = 0; i < asteroids.length; i++) {
      if (this.ship.isCollidedWith(asteroids[i])) {
        this.ship.collideWith(asteroids[i]);
      }
      for (var j = 0; j < this.bullets.length; j++) {
        if (this.bullets[j].isCollidedWith(asteroids[i])) {
          this.bullets[j].collideWith(asteroids[i]);
        }
      }
    }
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    } else if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    }
  }

  Game.prototype.remove = function (obj) {
    if (obj instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(obj), 1);
    } else if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(obj), 1);
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return pos[0] < 0 || pos[1] < 0 || pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y;
  };

}());
