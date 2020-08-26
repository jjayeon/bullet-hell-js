import input from "@jjy/input";
import MainLoop from "mainloop.js";

const app = document.getElementById("app");
const c = document.createElement("canvas");

c.width = window.innerWidth;
c.height = window.innerHeight;
c.id = "canvas";

app.appendChild(c);

const ctx = c.getContext("2d");

function Player() {
  this.x = 200;
  this.lastX = this.x;
  this.y = c.height / 2;
  this.lastY = this.y;
  this.side = 50;
  this.color = "black";

  this.vx = 0;
  this.vy = 0;
}

Player.prototype.update = function (delta) {
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

Player.prototype.draw = function (interp) {
  var x = this.lastX + (this.x - this.lastX) * interp;
  var y = this.lastY + (this.y - this.lastY) * interp;
  ctx.fillStyle = this.color;
  ctx.fillRect(x, y, this.side, this.side);
};

var player = new Player();

function update(delta) {
  ctx.fillStyle = "#ddf";
  ctx.fillRect(0, 0, c.width, c.height);
  player.update(delta);
}

function draw(interp) {
  player.draw(interp);
}

MainLoop.setMaxAllowedFPS(Infinity).setUpdate(update).setDraw(draw).start();
