function Entity(canvas, x, y, width, height, img) {
  this.xvals = {
    p: x,
    v: 0,
    a: 0,
    fric: 0.3,
    max: 8,
    end: canvas.width - width,
  };
  this.yvals = {
    p: y,
    v: 0,
    a: 0,
    fric: 0.3,
    max: 8,
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

Entity.prototype.update = function () {
  function update(vals) {
    if (vals.a !== 0 && Math.abs(vals.v) < vals.max) {
      vals.v += vals.a;
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
    const newp = vals.p + vals.v;
    // if in bounds
    if (0 < newp && newp < vals.end) {
      vals.p = newp;
    } else {
      // if we're here, we hit the edge, so set v to 0.
      // without this line, the player sticks to the walls in a weird way.
      vals.v = 0;
    }
  }
  update(this.xvals);
  update(this.yvals);
};

Entity.prototype.draw = function () {
  this.canvas
    .getContext("2d")
    .drawImage(this.img, this.x, this.y, this.width, this.height);
};

export default Entity;
