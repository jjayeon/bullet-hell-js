import Entity from "../Entity.js";

class Bullet extends Entity {
  constructor(canvas, player, img) {
    const x = player.x + player.width;
    const y = player.y + player.height / 2;
    super(
      canvas,
      { last: x, p: x, v: 2 }, // xvals
      { last: y, p: y, v: 2 }, // yvals
      20,
      20,
      img
    );

    this._player = player;
  }

  update(delta) {
    super.update(delta);
    this._yvals.p = this._player.y + this._player.height / 2;
  }
}

export default Bullet;
