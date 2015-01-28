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
    if (this.wrappable()) movePos = this.game.wrap(movePos, this.radius);
    return movePos;
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var dist = Asteroids.Util.distance(this.pos, otherObject.pos)
    var radii = this.radius + otherObject.radius;
    return dist <= radii;
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    this.game.remove(this);
    this.game.remove(otherObject);
  };

  MovingObject.prototype.wrappable = function () {
    return true;
  };

}());
