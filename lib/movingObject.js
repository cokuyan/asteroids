(function() {
  "use strict";

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (params) {
    this.pos = params.pos;
    this.vel = params.vel;
    this.radius = params.radius;
    this.color = params.color;
    this.game = params.game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  MovingObject.prototype.move = function () {
    var movePos = this.pos.slice();
    movePos[0] += this.vel[0];
    movePos[1] += this.vel[1];
    movePos = this.game.wrap(movePos);
    return movePos;
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var dx = this.pos[0] - otherObject.pos[0];
    var dy = this.pos[1] - otherObject.pos[1];
    var radii = this.radius + otherObject.radius;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) <= radii;
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    this.game.remove(this);
    this.game.remove(otherObject);
  };

}());
