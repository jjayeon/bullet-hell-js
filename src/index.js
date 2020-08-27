import MainLoop from "mainloop.js";
import input from "@jjy/input";

import Player from "./components/Player/Player.js";

const app = document.getElementById("app");
const c = document.createElement("canvas");

c.width = window.innerWidth;
c.height = window.innerHeight;
c.id = "canvas";

app.appendChild(c);

const ctx = c.getContext("2d");

var player = new Player(c, 200, c.height / 2);

function update() {
  ctx.fillStyle = "#ddf";
  ctx.fillRect(0, 0, c.width, c.height);
  player.update(input);
}

function draw() {
  player.draw();
}

MainLoop.setUpdate(update).setDraw(draw).start();
