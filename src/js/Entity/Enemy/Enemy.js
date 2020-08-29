import Entity from "../Entity.js";

function Enemy(canvas, x, y, img) {
  Entity.call(this, canvas, x, y, 50, 50, img);

  this.xvals.a = 0.0001;
  this.yvals.a = 0.0001;

  this.xvals.max = 0.1;
  this.yvals.max = 0.3;
}

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function (delta) {
  if (this.x <= 0 || this.x >= this.xvals.end || Math.random() < 0.01) {
    this.xvals.a *= -1;
  }

  if (this.y <= 0 || this.y >= this.yvals.end || Math.random() < 0.01) {
    this.yvals.a *= -1;
  }

  Entity.prototype.update.call(this, delta);
};

export default Enemy;
