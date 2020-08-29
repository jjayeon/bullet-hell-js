import Entity from "../Entity.js";
import Bullet from "./Bullet.js";

// constructor function for the player.
function Player(canvas, x, y, playerimg, bulletimg) {
  Entity.call(this, canvas, x, y, 25, 25, playerimg);
  this.bulletimg = bulletimg;

  this.accel = 0.1;
  this.fric = 0.038;

  this.xvals.max = 0.6;
  this.yvals.max = 0.6;

  this.up = false;
  this.down = false;
  this.left = false;
  this.right = false;

  this.cd = { cur: 0, max: 500 };
  this.bullets = [];
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.fire = function () {
  if (this.cd.cur <= 0) {
    this.bullets.push(new Bullet(this.canvas, this, this.bulletimg));
    this.cd.cur = this.cd.max;
  }
};

Player.prototype.update = function (delta) {
  this.xvals.a = -(this.left && this.accel) + (this.right && this.accel);
  this.yvals.a = -(this.up && this.accel) + (this.down && this.accel);

  this.bullets.forEach(function (item) {
    item.update(delta);
  });

  for (var i = 0; i < this.bullets.length; i++) {
    const bullet = this.bullets[i];
    if (bullet.x >= bullet.xvals.end) {
      this.bullets.splice(i--, 1);
    }
  }

  if (this.cd.cur > 0) {
    this.cd.cur -= delta;
  }

  Entity.prototype.update.call(this, delta);
};

Player.prototype.draw = function (interp) {
  const ctx = this.canvas.getContext("2d");

  // draw a laser sight.
  ctx.beginPath();
  ctx.strokeStyle = "#f88";
  ctx.lineWidth = 1;
  ctx.moveTo(this.x + this.width, this.y + this.height / 2);
  ctx.lineTo(this.canvas.width, this.y + this.height / 2);
  ctx.stroke();

  this.bullets.forEach(function (item) {
    item.draw(interp);
  });

  Entity.prototype.draw.call(this, interp);
};

export default Player;
