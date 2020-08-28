import MainLoop from "mainloop.js";
import input from "@jjy/input";

import Player from "./components/Entity/Player/Player.js";
// import Enemies from "./components/Entity/Enemy/Enemy.js";

import playerimgurl from "./assets/player.png";
import bulletimgurl from "./assets/bullet.png";

const app = document.getElementById("app");
const canvas = document.createElement("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.id = "canvas";

app.appendChild(canvas);

const ctx = canvas.getContext("2d");

const playerimg = new Image();
const bulletimg = new Image();
playerimg.src = playerimgurl;
bulletimg.src = bulletimgurl;

const player = new Player(canvas, 200, canvas.height / 2, playerimg, bulletimg);
const playerAccel = 0.1;
// const enemies = new Enemies(canvas, bullets);

input.bind("w", function () {
  player.yvals.a = -playerAccel;
});
input.upbind("w", function () {
  player.yvals.a = 0;
});

input.bind("a", function () {
  player.xvals.a = -playerAccel;
});
input.upbind("a", function () {
  player.xvals.a = 0;
});

input.bind("s", function () {
  player.yvals.a = playerAccel;
});
input.upbind("s", function () {
  player.yvals.a = 0;
});

input.bind("d", function () {
  player.xvals.a = playerAccel;
});
input.upbind("d", function () {
  player.xvals.a = 0;
});

function update(delta) {
  ctx.fillStyle = "#ddf";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (input.pressed[" "]) {
    player.fire();
  }

  // enemies.update();
  player.update(delta);
}

function draw(interp) {
  // enemies.draw();
  player.draw(interp);
}

MainLoop.setUpdate(update).setDraw(draw).start();
