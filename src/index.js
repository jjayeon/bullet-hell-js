import MainLoop from "mainloop.js";
import input from "@jjy/input";

import Player from "./components/Entity/Player/Player.js";
import Bullets from "./components/Entity/Bullets/Bullets.js";
import Enemies from "./components/Entity/Enemies/Enemies.js";

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
playerimg.src = playerimgurl;
const player = new Player(canvas, 200, canvas.height / 2, playerimg);

const bulletimg = new Image();
bulletimg.src = bulletimgurl;
const bullets = new Bullets(canvas, player, bulletimg);
const enemies = new Enemies(canvas, bullets);

function update(delta) {
  ctx.fillStyle = "#ddf";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bullets.update(input, delta);
  enemies.update();
  player.update(input);
}

function draw() {
  bullets.draw();
  enemies.draw();
  player.draw();
}

MainLoop.setUpdate(update).setDraw(draw).start();
