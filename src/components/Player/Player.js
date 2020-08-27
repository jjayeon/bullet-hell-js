import playerimgurl from "./player.png";

// constructor function for the player.

function Player(canvas, x, y) {
  this.canvas = canvas; // needed to know where to draw.

  this.width = 50; // this equals the dimensions of player.png. hard coded for now.
  this.height = 50;

  // p = position, v = velocity, a = acceleration.
  // fric = friction, max = max speed, end = farthest point on that axis.
  this.x = {
    p: x,
    v: 0,
    a: 1.8,
    fric: 0.3,
    max: 8,
    end: canvas.width - this.width,
  };
  this.y = {
    p: y,
    v: 0,
    a: 1.8,
    fric: 0.3,
    max: 8,
    end: canvas.height - this.height,
  };

  // the image to render on screen.
  const playerimg = new Image();
  playerimg.src = playerimgurl;
  this.img = playerimg;
}

Player.prototype.update = function (input) {
  // update velocity
  function updatev(d, plus, minus) {
    // d = direction, or axis.
    // "plus" and "minus" indicate directional keys.
    // x & plus => d, x & minus => a,
    // y & plus => s, y & minus => w
    if (plus && d.v < d.max) {
      d.v += d.a;
    } else if (minus && -d.v < d.max) {
      d.v -= d.a;
      // if no keys are held, apply friction.
    } else if (d.v > 0) {
      d.v -= d.fric;
      if (d.v < 0) {
        d.v = 0;
      }
    } else if (d.v < 0) {
      d.v += d.fric;
      if (d.v > 0) {
        d.v = 0;
      }
    }
  }
  // update position
  function updatep(d) {
    const newd = d.p + d.v;
    // if in bounds
    if (0 < newd && newd < d.end) {
      d.p = newd;
    } else {
      // if we're here, we hit the edge, so set v to 0.
      // without this line, the player sticks to the walls in a weird way.
      d.v = 0;
    }
  }

  updatev(this.x, input.pressed["d"], input.pressed["a"]);
  updatev(this.y, input.pressed["s"], input.pressed["w"]);

  updatep(this.x);
  updatep(this.y);
};

Player.prototype.draw = function () {
  this.canvas.getContext("2d").drawImage(this.img, this.x.p, this.y.p);
};

export default Player;
