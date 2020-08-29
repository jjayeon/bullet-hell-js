import Game from "./js/Game.js";

const app = document.getElementById("app");
const canvas = document.createElement("canvas");

canvas.width = 1200;
canvas.height = 600;
canvas.id = "canvas";
canvas.style = "padding: 0; margin: auto; display: block;";

app.appendChild(canvas);

var instructions = document.createElement("p");
instructions.innerHTML = "WASD to move, Space to shoot.";
app.appendChild(instructions);

Game(canvas).start();
