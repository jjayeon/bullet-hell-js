class Entity {
  constructor(canvas, xvals, yvals, width, height, img) {
    this._canvas = canvas;
    this._width = width;
    this._height = height;
    this._img = img;

    this._xvals = {
      last: xvals.last || 0,
      p: xvals.p || 0,
      v: xvals.v || 0,
      a: xvals.a || 0,
      fric: xvals.fric || 0,
      max: xvals.max || Infinity,
      end: canvas.width - width,
    };

    this._yvals = {
      last: yvals.last || 0,
      p: yvals.p || 0,
      v: yvals.v || 0,
      a: yvals.a || 0,
      fric: yvals.fric || 0,
      max: yvals.max || Infinity,
      end: canvas.height - height,
    };
  }

  get x() {
    return this._xvals.p;
  }

  get x2() {
    return this._xvals.p + this.width;
  }

  get y() {
    return this._yvals.p;
  }

  get y2() {
    return this._yvals.p + this.height;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  inside(x, y) {
    return !!(
      this.x <= x &&
      x <= this.x + this.width &&
      this.y <= y &&
      y <= this.y + this.height
    );
  }

  collides(that) {
    if (typeof that !== typeof this) {
      throw new TypeError("function 'collides' called on a non-Entity object.");
    }

    return !!(
      this.inside(that.x, that.y) ||
      this.inside(that.x, that.y2) ||
      this.inside(that.x2, that.y) ||
      this.inside(that.x2, that.y2) ||
      that.inside(this.x, this.y) ||
      that.inside(this.x, this.y2) ||
      that.inside(this.x2, this.y) ||
      that.inside(this.x2, this.y2)
    );
  }

  update(delta) {
    function update(vals) {
      vals.last = vals.p;

      const newv = vals.v + vals.a * delta;
      if (vals.a !== 0) {
        if (Math.abs(newv) < vals.max) {
          vals.v = newv;
        } else {
          vals.v = vals.max * Math.sign(newv);
        }
      } else if (vals.v > 0) {
        vals.v -= vals.fric;
        if (vals.v < 0) {
          vals.v = 0;
        }
      } else if (vals.v < 0) {
        vals.v += vals.fric;
        if (vals.v > 0) {
          vals.v = 0;
        }
      }

      const newp = vals.p + vals.v * delta;
      // if in bounds
      if (newp < 0) {
        vals.p = 0;
        vals.v = 0;
        // if we're here, we hit the edge, so set v to 0.
        // without this line, the player sticks to the walls in a weird way.
      } else if (newp > vals.end) {
        vals.p = vals.end;
        vals.v = 0;
      } else {
        vals.p = newp;
      }
    }
    update(this._xvals);
    update(this._yvals);
  }

  draw(interp) {
    const x = this._xvals.last + (this.x - this._xvals.last) * interp;
    const y = this._yvals.last + (this.y - this._yvals.last) * interp;
    this._canvas
      .getContext("2d")
      .drawImage(this._img, x, y, this.width, this.height);
  }
}

export default Entity;
