import MainLoop from "mainloop.js";
import input from "@jjy/input";

import Player from "./components/Player/Player.js";
import Bullets from "./components/Bullets/Bullets.js";

const app = document.getElementById("app");
const canvas = document.createElement("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.id = "canvas";

app.appendChild(canvas);

const ctx = canvas.getContext("2d");

const player = new Player(canvas, 200, canvas.height / 2);
const bullets = new Bullets(canvas, player);

function update(delta) {
  ctx.fillStyle = "#ddf";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bullets.update(input, delta);
  player.update(input);
}

function draw() {
  bullets.draw();
  player.draw();
}

MainLoop.setUpdate(update).setDraw(draw).start();
