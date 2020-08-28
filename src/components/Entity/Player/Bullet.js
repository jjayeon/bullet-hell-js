import Entity from "../Entity.js";

function Bullet(canvas, x, y, i, parent, img) {
  Entity.call(this, canvas, x, y, 10, 10, img);
  // some other stuff we need to keep track of.
  // bullet speed.
  this.i = i;
  this.parent = parent;
  this.xvals.v = 40;
}

Bullet.prototype = Object.create(Entity.prototype);

export default Bullet;
