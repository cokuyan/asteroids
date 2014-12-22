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

  GameView.MAPPINGS = {
    // space
    32: function fireBullet() {
      this.game.ship.fireBullet();
    },
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

  GameView.prototype.bindKeyHandlers = function () {
    var view = this;
    key("up, down, left, right, space", function () {
      key.getPressedKeyCodes().forEach(function (key) {
        (GameView.MAPPINGS[key].bind(view))();
      });
    });
  };

}());
