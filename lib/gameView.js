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
    this.bindKeyHandlers();
    setInterval(function () {
      this.game.moveObjects();
      this.game.checkCollisions();
      this.game.draw(this.ctx);
    }.bind(this), 20)
  };

  // need to figure out how to allow multiple key presses
  GameView.prototype.bindKeyHandlers = function () {
    key("up", function () {
      this.game.ship.power(1, 0);
      if (key.isPressed("space")) fireBullet();
    }.bind(this));
    key("down", function () {
      this.game.ship.power(-1, 0);
      if (key.isPressed("space")) fireBullet();
    }.bind(this));
    key("left", function () {
      this.game.ship.power(0, -1);
      if (key.isPressed("space")) fireBullet();
    }.bind(this));
    key("right", function () {
      this.game.ship.power(0, 1);
      if (key.isPressed("space")) fireBullet();
    }.bind(this));
    key("space", function () {
      fireBullet();
    }.bind(this));

    var that = this
    function fireBullet() {
      that.game.ship.fireBullet();
    }
  };

}());
