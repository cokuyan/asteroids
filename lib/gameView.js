(function() {
  "use strict";

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    this.loadBackground();
    this.img.onload = function () {
      this.ctx.drawImage(
        this.img, 0, 0, 600, 375,
        0, 0, Asteroids.Game.DIM_X, Asteroids.Game.DIM_Y
      );
    }.bind(this);
    this.tick = 0;

    setInterval(function () {
      this.game.moveObjects();
      this.game.checkCollisions();
      this.img.onload();
      this.game.draw(this.ctx);
      if (this.game.ship.isDead) return;
      this.bindKeyHandlers();
      this.tick++;
    }.bind(this), 20)
  };

  GameView.MAPPINGS = {
    // left
    37: function angleLeft() {
      this.game.ship.power(0, -1)
    },
    // up
    38: function accelerate() {
      this.game.ship.power(1, 0)
    },
    // right
    39: function angleRight() {
      this.game.ship.power(0, 1)
    },
    // down
    40: function decelerate() {
      this.game.ship.power(-1, 0)
    }
  };

  GameView.prototype.loadBackground = function () {
    this.img = new Image();
    this.img.src = './vendor/Asteroid.jpg';
  };

  GameView.prototype.bindKeyHandlers = function () {
    if (this.tick % 4 !== 0) return;

    var view = this;
    key.getPressedKeyCodes().forEach(function (key) {
      GameView.MAPPINGS[key] && GameView.MAPPINGS[key].call(view);
    });

    if (key.isPressed("space") && this.game.bullets.length < 10) {
      this.game.ship.fireBullet();
    }
  };

}());
