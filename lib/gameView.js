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

  GameView.prototype.bindKeyHandlers = function () {
    key("up", function (){
      this.game.ship.power([0, -1]);
    }.bind(this));
    key("down", function (){
      this.game.ship.power([0, 1]);
    }.bind(this));
    key("left", function (){
      this.game.ship.power([-1, 0]);
    }.bind(this));
    key("right", function (){
      this.game.ship.power([1, 0]);
    }.bind(this));
  };

}());
