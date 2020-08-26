import input from "@jjy/input";

const app = document.getElementById("app");
const c = document.createElement("canvas");

c.width = window.innerWidth;
c.height = window.innerHeight;
c.id = "canvas";

app.appendChild(c);

console.log(c.width);
console.log(c.height);

const ctx = c.getContext("2d");

input.bind("r", function () {
  ctx.fillStyle = "#fdd";
  ctx.fillRect(0, 0, c.width, c.height);
});

input.bind("g", function () {
  ctx.fillStyle = "#dfd";
  ctx.fillRect(0, 0, c.width, c.height);
});

input.bind("b", function () {
  ctx.fillStyle = "#ddf";
  ctx.fillRect(0, 0, c.width, c.height);
});
