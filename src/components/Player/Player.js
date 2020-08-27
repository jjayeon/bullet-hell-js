import playerimgurl from "./player.png";

function Player(x, y) {
  this.x = x;
  this.vx = 0;
  this.ax = 0;
  this.lastX = this.x;

  this.y = y;
  this.vy = 0;
  this.ay = 0;
  this.lastY = this.y;

  const playerimg = new Image();
  playerimg.src = playerimgurl;
  document.head.appendChild(playerimg);
  this.img = playerimg;
}

Player.prototype.update = function (delta, input) {
  const v = 0.5;
  if (input.pressed["d"]) {
    this.vx = v;
  } else if (input.pressed["a"]) {
    this.vx = -v;
  } else {
    this.vx = 0;
  }
  if (input.pressed["w"]) {
    this.vy = -v;
  } else if (input.pressed["s"]) {
    this.vy = v;
  } else {
    this.vy = 0;
  }
  this.lastX = this.x;
  this.lastY = this.y;
  this.x += this.vx * delta;
  this.y += this.vy * delta;
};

Player.prototype.draw = function (interp, ctx) {
  var x = this.lastX + (this.x - this.lastX) * interp;
  var y = this.lastY + (this.y - this.lastY) * interp;
  ctx.drawImage(this.img, x, y);
};

export default Player;
