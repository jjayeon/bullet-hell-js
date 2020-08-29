import Entity from "../Entity.js";

function Bullet(canvas, player, img) {
  Entity.call(
    this,
    canvas,
    player.x + player.width,
    player.y + player.height / 2,
    20,
    20,
    img
  );
  // bullet speed.
  this.player = player;
  this.xvals.v = 2;
}

Bullet.prototype = Object.create(Entity.prototype);

Bullet.prototype.update = function (delta) {
  Entity.prototype.update.call(this, delta);
  this.yvals.p = this.player.y + this.player.height / 2;
};

export default Bullet;
