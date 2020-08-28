function Entity(canvas, x, y, width, height, img) {
  this.canvas = canvas;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.img = img;
}

Entity.prototype.draw = function () {
  this.canvas
    .getContext("2d")
    .drawImage(this.img, this.x, this.y, this.width, this.height);
};

export default Entity;
