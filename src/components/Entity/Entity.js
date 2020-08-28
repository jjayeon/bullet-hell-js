function Entity(canvas, x, y, width, height, img) {
  this.fric = 0;
  this.max = Infinity;

  this.xvals = {
    last: x,
    p: x,
    v: 0,
    a: 0,
    end: canvas.width - width,
  };
  this.yvals = {
    last: y,
    p: y,
    v: 0,
    a: 0,
    end: canvas.height - height,
  };

  Object.defineProperties(this, {
    canvas: { value: canvas },
    width: { value: width },
    height: { value: height },
    img: { value: img },
    x: {
      get: function () {
        return this.xvals.p;
      },
    },
    y: {
      get: function () {
        return this.yvals.p;
      },
    },
    x2: {
      get: function () {
        return this.xvals.p + this.width;
      },
    },
    y2: {
      get: function () {
        return this.yvals.p + this.height;
      },
    },
  });
}

Entity.prototype.inside = function (x, y) {
  return (
    this.x <= x &&
    x <= this.x + this.width &&
    this.y <= y &&
    y <= this.y + this.height
  );
};

Entity.prototype.collides = function (that) {
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
};

Entity.prototype.update = function (delta) {
  function update(vals, fric, max) {
    vals.last = vals.p;

    const newv = vals.v + vals.a * delta;
    if (vals.a !== 0) {
      if (Math.abs(newv) < max) {
        vals.v = newv;
      } else {
        vals.v = max * Math.sign(newv);
      }
    } else if (vals.v > 0) {
      vals.v -= fric;
      if (vals.v < 0) {
        vals.v = 0;
      }
    } else if (vals.v < 0) {
      vals.v += fric;
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
  update(this.xvals, this.fric, this.max);
  update(this.yvals, this.fric, this.max);
};

Entity.prototype.draw = function (interp) {
  const x = this.xvals.last + (this.x - this.xvals.last) * interp;
  const y = this.yvals.last + (this.y - this.yvals.last) * interp;
  this.canvas
    .getContext("2d")
    .drawImage(this.img, x, y, this.width, this.height);
};

export default Entity;
