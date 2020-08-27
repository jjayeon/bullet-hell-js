import playerimgurl from "./player.png";

function Player(canvas, x, y) {
  this.canvas = canvas;
  this.w = 50;
  this.h = 50;

  this.x = { p: x, v: 0, a: 1.8, f: 0.3, m: 5, end: canvas.width - this.w };
  this.y = { p: y, v: 0, a: 1.8, f: 0.3, m: 8, end: canvas.height - this.h };

  const playerimg = new Image();
  playerimg.src = playerimgurl;
  this.img = playerimg;
}

Player.prototype.update = function (input) {
  // update velocity
  function updatev(d, plus, minus) {
    if (plus && d.v < d.m) {
      d.v += d.a;
    } else if (minus && -d.v < d.m) {
      d.v -= d.a;
    } else if (d.v > 0) {
      d.v -= d.f;
      if (d.v < 0) {
        d.v = 0;
      }
    } else if (d.v < 0) {
      d.v += d.f;
      if (d.v > 0) {
        d.v = 0;
      }
    }
  }
  // update position
  function updatep(d) {
    const newd = d.p + d.v;
    if (0 < newd && newd < d.end) {
      d.p = newd;
    } else {
      d.v = 0;
    }
  }

  updatev(this.x, input.pressed["d"], input.pressed["a"]);
  updatev(this.y, input.pressed["s"], input.pressed["w"]);

  updatep(this.x);
  updatep(this.y);
};

Player.prototype.draw = function () {
  this.canvas.getContext("2d").drawImage(this.img, this.x.p, this.y.p);
};

export default Player;
