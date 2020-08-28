import bulletimgurl from "./bullet.png";

function Bullets(canvas, player) {
  // some other stuff we need to keep track of.
  this.canvas = canvas;
  this.player = player;

  // state variables.
  // an internal cooldown on the player's fire rate.
  this.cd = { cur: 0, max: 500 };
  // bullet speed.
  this.v = 40;
  // endpoint for the bullets.
  this.end = canvas.width;

  // the bullets themselves.
  this.children = [];

  const bulletimg = new Image();
  bulletimg.src = bulletimgurl;
  this.img = bulletimg;
}

function Bullet(i, x, y) {
  this.i = i;
  this.x = x;
  this.y = y;
}

Bullets.prototype.update = function (input, delta) {
  if (input.pressed[" "]) {
    if (this.cd.cur <= 0) {
      this.children.push(
        new Bullet(
          this.children.length,
          this.player.x.p + this.player.width,
          this.player.y.p + this.player.height / 2
        )
      );
      this.cd.cur = this.cd.max;
    }
  }

  this.children.forEach((item) => {
    item.x += this.v;
  });

  for (var i = 0; i < this.children.length; i++) {
    const child = this.children[i];
    if (child.x > this.end) {
      this.children.splice(i, 1);
      i--;
    }
  }

  if (this.cd.cur > 0) {
    this.cd.cur -= delta;
  }
};

Bullets.prototype.draw = function () {
  const ctx = this.canvas.getContext("2d");

  // draw a laser sight.
  ctx.beginPath();
  ctx.strokeStyle = "#f88";
  ctx.lineWidth = 1;
  ctx.moveTo(
    this.player.x.p + this.player.width,
    this.player.y.p + this.player.height / 2
  );
  ctx.lineTo(this.end, this.player.y.p + this.player.height / 2);
  ctx.stroke();

  // render each bullet.
  const img = this.img;
  this.children.forEach(function (item) {
    ctx.drawImage(img, item.x, item.y);
  });
};

export default Bullets;
