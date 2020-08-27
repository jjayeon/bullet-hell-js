import playerimgurl from "./player.png";

function Player(x, y) {
  this.w = 50;
  this.h = 50;

  this.x = x;
  this.vx = 0;

  this.y = y;
  this.vy = 0;

  this.a = 1.8;
  this.f = 0.3;
  this.max = 8;

  const playerimg = new Image();
  playerimg.src = playerimgurl;
  document.head.appendChild(playerimg);
  this.img = playerimg;
}

Player.prototype.update = function (input, w, h) {
  // update velocity
  if (input.pressed["d"] && this.vx < this.max) {
    this.vx += this.a;
  } else if (input.pressed["a"] && -this.vx < this.max) {
    this.vx -= this.a;
  } else if (this.vx > 0) {
    this.vx -= this.f;
    if (this.vx < 0) {
      this.vx = 0;
    }
  } else if (this.vx < 0) {
    this.vx += this.f;
    if (this.vx > 0) {
      this.vx = 0;
    }
  }

  if (input.pressed["w"] && -this.vy < this.max) {
    this.vy -= this.a;
  } else if (input.pressed["s"] && this.vy < this.max) {
    this.vy += this.a;
  } else if (this.vy > 0) {
    this.vy -= this.f;
    if (this.vy < 0) {
      this.vy = 0;
    }
  } else if (this.vy < 0) {
    this.vy += this.f;
    if (this.vy > 0) {
      this.vy = 0;
    }
  }
  // update position
  const newx = this.x + this.vx;
  const newy = this.y + this.vy;
  if (0 < newx && newx + this.w < w) {
    this.x = newx;
  } else {
    this.vx = 0;
  }
  if (0 < newy && newy + this.h < h) {
    this.y = newy;
  } else {
    this.vy = 0;
  }
};

Player.prototype.draw = function (ctx) {
  ctx.drawImage(this.img, this.x, this.y);
};

export default Player;
