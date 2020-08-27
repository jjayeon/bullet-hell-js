function Enemies(canvas, bullets) {
  this.canvas = canvas;
  this.bullets = bullets;

  this.children = [];
}

function Enemy(x, y) {
  this.x = x;
  this.y = y;
}

Enemies.prototype.update = function () {
  if (this.children.length < 10) {
    if (Math.random() < 0.1) {
      this.children.push(
        new Enemy(
          randRange((this.canvas.width * 2) / 3, this.canvas.width),
          randRange(0, this.canvas.height - 50)
        )
      );
    }
  }
};

Enemies.prototype.draw = function () {
  const ctx = this.canvas.getContext("2d");
  ctx.fillStyle = "black";
  for (const child of this.children) {
    ctx.fillRect(child.x, child.y, 50, 50);
  }
};

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

export default Enemies;
