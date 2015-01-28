(function() {
  "use strict";

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.level = 1;
    this.bullets = [];
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship( { pos: this.randomPos(), game: this } );
  };

  Game.DIM_X = window.innerWidth - 100;
  Game.DIM_Y = window.innerHeight - 100;
  Game.NUM_ASTEROIDS = 5;

  Game.prototype.maybeLevelUp = function () {
    if (this.asteroids.length > 0) return;
    this.level++;
    this.addAsteroids();
  };

  Game.prototype.addAsteroids = function () {
    var numAsteroids = Game.NUM_ASTEROIDS * this.level;
    for (var i = 0; i < numAsteroids; i++) {
      this.add(new Asteroids.Asteroid({ pos: this.randomPos(), game: this }));
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
    for (var i = 0, l = allObjs.length; i < l; i++) {
      allObjs[i].pos = allObjs[i].move();
      if (!allObjs[i].wrappable() && this.isOutOfBounds(allObjs[i].pos)) {
        this.remove(allObjs[i]);
      }
    }
  };

  Game.prototype.wrap = function (pos, radius) {
    var wrapped = pos.slice();

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
    for (var i = 0, l = allObjs.length; i < l; i++) {
      allObjs[i].draw(ctx);
    }
  };

  // BOTTLENECK
  Game.prototype.checkCollisions = function () {
    var asteroids = this.asteroids.slice(),
        bullets = this.bullets.slice();

    for (var i = 0, l = asteroids.length; i < l; i++) {
      if (this.ship.isCollidedWith(asteroids[i])) {
        this.ship.collideWith(asteroids[i]);
      }
      for (var j = 0, b = bullets.length; j < b; j++) {
        if (bullets[j].isCollidedWith(asteroids[i])) {
          bullets[j].collideWith(asteroids[i]);
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
