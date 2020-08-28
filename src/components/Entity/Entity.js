function Entity(canvas, x, y, width, height, img) {
  this.canvas = canvas;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.img = img;

  Object.defineProperty(this, "x2", {
    get: function () {
      return this.x + this.width;
    },
  });

  Object.defineProperty(this, "y2", {
    get: function () {
      return this.y + this.height;
    },
  });
}

Entity.prototype.draw = function () {
  this.canvas
    .getContext("2d")
    .drawImage(this.img, this.x, this.y, this.width, this.height);
};

Entity.prototype.inside = function (x, y) {
  return (
    this.x < x &&
    x < this.x + this.width &&
    this.y < y &&
    y < this.y + this.height
  );
};

Entity.prototype.collides = function (that) {
  return (
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

export default Entity;
