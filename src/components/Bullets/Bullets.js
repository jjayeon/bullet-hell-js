import bulletimgurl from "./bullet.png";

function Bullets(canvas, player) {
  this.canvas = canvas;
  this.player = player;
  this.children = [];
  this.cd = { cur: 0, max: 500 };
  this.v = 40;
  this.end = canvas.width;

  const bulletimg = new Image();
  bulletimg.src = bulletimgurl;
  this.img = bulletimg;
}

Bullets.prototype.update = function (input, delta) {
  if (input.pressed[" "]) {
    if (this.cd.cur <= 0) {
      this.children.unshift({
        x: this.player.x.p + this.player.w,
        y: this.player.y.p + this.player.h / 2,
      });
      this.cd.cur = this.cd.max;
    }
  }

  this.children.forEach((item) => {
    item.x += this.v;
  });

  for (var i = 0; i < this.children.length; i++) {
    const child = this.children[i];
    if (child.x > this.end) {
      this.children.splice(i);
    }
  }

  if (this.cd.cur > 0) {
    this.cd.cur -= delta;
  }
};

Bullets.prototype.draw = function () {
  const ctx = this.canvas.getContext("2d");
  ctx.beginPath();
  ctx.strokeStyle = "#f88";
  ctx.lineWidth = 1;
  ctx.moveTo(
    this.player.x.p + this.player.w,
    this.player.y.p + this.player.h / 2
  );
  ctx.lineTo(this.end, this.player.y.p + this.player.h / 2);
  ctx.stroke();
  const img = this.img;
  this.children.forEach(function (item) {
    ctx.drawImage(img, item.x, item.y);
  });
};

export default Bullets;
