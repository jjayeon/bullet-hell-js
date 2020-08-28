function Enemies(canvas, bullets) {
  this.canvas = canvas;
  this.bullets = bullets;

  this.children = [];
}

function Enemy(i, x, y) {
  this.i = i;
  this.x = x;
  this.y = y;

  this.width = 200;
  this.height = 200;
}

Enemies.prototype.update = function () {
  if (this.children.length < 10) {
    if (Math.random() < 0.1) {
      this.children.push(
        new Enemy(
          this.children.length,
          randRange((this.canvas.width * 2) / 3, this.canvas.width),
          randRange(200, this.canvas.height - 200)
        )
      );
    }
  }

  for (var i = 0; i < this.children.length; i++) {
    const enemy = this.children[i];
    for (var j = 0; j < this.bullets.children.length; j++) {
      const bullet = this.bullets.children[j];
      if (
        enemy.x < bullet.x &&
        bullet.x < enemy.x + enemy.width &&
        enemy.y < bullet.y &&
        bullet.y < enemy.y + enemy.height
      ) {
        this.children.splice(i, 1);
        i--;
        this.bullets.children.splice(j, 1);
        break;
      }
    }
  }
};

Enemies.prototype.draw = function () {
  const ctx = this.canvas.getContext("2d");
  ctx.fillStyle = "black";
  for (const child of this.children) {
    ctx.fillRect(child.x, child.y, child.width, child.height);
  }
};

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

export default Enemies;