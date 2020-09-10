import Entity from "../Entity.js";

class Enemy extends Entity {
  constructor(canvas, x, y, img) {
    const a = 0.0001;
    super(
      canvas,
      { last: x, p: x, a: a, max: 0.1 },
      { last: y, p: y, a: a, max: 0.3 },
      50,
      50,
      img
    );
  }

  update(delta) {
    if (this.x <= 0 || this.x >= this._xvals.end || Math.random() < 0.01) {
      this._xvals.a *= -1;
    }

    if (this.y <= 0 || this.y >= this._yvals.end || Math.random() < 0.01) {
      this._yvals.a *= -1;
    }

    super.update(delta);
  }
}

export default Enemy;
