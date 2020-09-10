import MainLoop from "mainloop.js";
import input from "@jjy/input";

import Player from "./Entity/Player/Player.js";
import Enemy from "./Entity/Enemy/Enemy.js";

import playerimgurl from "../assets/player.png";
import bulletimgurl from "../assets/bullet.png";
import enemyimgurl from "../assets/enemy.png";

function Game(canvas) {
  const ctx = canvas.getContext("2d");

  const playerimg = new Image();
  const bulletimg = new Image();
  const enemyimg = new Image();
  playerimg.src = playerimgurl;
  bulletimg.src = bulletimgurl;
  enemyimg.src = enemyimgurl;

  const player = new Player(
    canvas,
    200,
    canvas.height / 2,
    playerimg,
    bulletimg
  );

  const enemies = [];

  function update(delta) {
    function randRange(min, max) {
      return min + Math.random() * (max - min);
    }

    if (input.pressed[" "]) {
      player.fire();
    }

    if (enemies.length < 5 && Math.random() < 0.05) {
      enemies.push(
        new Enemy(
          canvas,
          randRange(canvas.width / 2, canvas.width - 25),
          randRange(0, canvas.height - 25),
          enemyimg
        )
      );
    }

    for (var i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      for (var j = 0; j < player.numBullets; j++) {
        if (enemy.collides(player.bulletAt(j))) {
          enemies.splice(i--, 1);
          player.despawnBullet(j);
          break;
        }
      }
    }

    enemies.forEach(function (enemy) {
      enemy.update(delta);
    });

    player.update(delta);
  }

  function draw(interp) {
    ctx.fillStyle = "#ddf";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    enemies.forEach(function (enemy) {
      enemy.draw(interp);
    });

    player.draw(interp);
  }

  input.bind("w", function () {
    player.up(true);
  });
  input.upbind("w", function () {
    player.up(false);
  });

  input.bind("a", function () {
    player.left(true);
  });
  input.upbind("a", function () {
    player.left(false);
  });

  input.bind("s", function () {
    player.down(true);
  });
  input.upbind("s", function () {
    player.down(false);
  });

  input.bind("d", function () {
    player.right(true);
  });
  input.upbind("d", function () {
    player.right(false);
  });

  MainLoop.setUpdate(update).setDraw(draw);

  return MainLoop;
}
export default Game;
