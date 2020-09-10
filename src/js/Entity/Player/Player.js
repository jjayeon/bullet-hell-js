import Entity from "../Entity.js";
import Bullet from "./Bullet.js";

class Player extends Entity {
  constructor(canvas, x, y, playerimg, bulletimg) {
    const fric = 0.038;
    const max = 0.6;
    super(
      canvas,
      { last: x, p: x, fric: fric, max: max }, // xvals
      { last: y, p: y, fric: fric, max: max }, // yvals
      25, // width
      25, // height
      playerimg
    );

    this._bulletimg = bulletimg;

    this._accel = 0.03;

    this._up = false;
    this._down = false;
    this._left = false;
    this._right = false;

    this._cd = { cur: 0, max: 500 };
    this._bullets = [];
  }

  fire() {
    if (this._cd.cur <= 0) {
      this._bullets.push(new Bullet(this._canvas, this, this._bulletimg));
      this._cd.cur = this._cd.max;
    }
  }

  despawnBullet(i) {
    this._bullets.splice(i, 1);
  }

  update(delta) {
    this._xvals.a = -(this._left && this._accel) + (this._right && this._accel);
    this._yvals.a = -(this._up && this._accel) + (this._down && this._accel);

    this._bullets.forEach(function (item) {
      item.update(delta);
    });

    for (var i = 0; i < this._bullets.length; i++) {
      const bullet = this._bullets[i];
      if (bullet.x >= bullet._xvals.end) {
        this._bullets.splice(i--, 1);
      }
    }

    if (this._cd.cur > 0) {
      this._cd.cur -= delta;
    }

    Entity.prototype.update.call(this, delta);
  }

  draw(interp) {
    const ctx = this._canvas.getContext("2d");

    // draw a laser sight.
    ctx.beginPath();
    ctx.strokeStyle = "#f88";
    ctx.lineWidth = 1;
    ctx.moveTo(this.x + this.width, this.y + this.height / 2);
    ctx.lineTo(this._canvas.width, this.y + this.height / 2);
    ctx.stroke();

    this._bullets.forEach(function (item) {
      item.draw(interp);
    });

    Entity.prototype.draw.call(this, interp);
  }

  up(bool) {
    this._up = !!bool;
  }

  down(bool) {
    this._down = !!bool;
  }

  left(bool) {
    this._left = !!bool;
  }

  right(bool) {
    this._right = !!bool;
  }

  get numBullets() {
    return this._bullets.length;
  }

  bulletAt(i) {
    return this._bullets[i];
  }
}

export default Player;
