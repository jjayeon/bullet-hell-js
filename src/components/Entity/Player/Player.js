import Entity from "../Entity.js";
import playerimgurl from "./player.png";

const playerimg = new Image();
playerimg.src = playerimgurl;

// constructor function for the player.
function Player(canvas, x, y) {
  Entity.call(this, canvas, x, y, 50, 50, playerimg);

  // p = position, v = velocity, a = acceleration.
  // fric = friction, max = max speed, end = farthest point on that axis.
  this.xvals = {
    p: x,
    v: 0,
    a: 1.8,
    fric: 0.3,
    max: 8,
    end: canvas.width - this.width,
  };
  this.yvals = {
    p: y,
    v: 0,
    a: 1.8,
    fric: 0.3,
    max: 8,
    end: canvas.height - this.height,
  };
}

Player.prototype = new Entity();

Player.prototype.update = function (input) {
  // update velocity
  function updatev(vals, plus, minus) {
    // d = direction, or axis.
    // "plus" and "minus" indicate directional keys.
    // x & plus => d, x & minus => a,
    // y & plus => s, y & minus => w
    if (plus && vals.v < vals.max) {
      vals.v += vals.a;
    } else if (minus && -vals.v < vals.max) {
      vals.v -= vals.a;
      // if no keys are held, apply friction.
    } else if (vals.v > 0) {
      vals.v -= vals.fric;
      if (vals.v < 0) {
        vals.v = 0;
      }
    } else if (vals.v < 0) {
      vals.v += vals.fric;
      if (vals.v > 0) {
        vals.v = 0;
      }
    }
    return vals.v;
  }
  // update position
  function updatep(vals) {
    const newp = vals.p + vals.v;
    // if in bounds
    if (0 < newp && newp < vals.end) {
      vals.p = newp;
    } else {
      // if we're here, we hit the edge, so set v to 0.
      // without this line, the player sticks to the walls in a weird way.
      vals.v = 0;
    }
    return vals.p;
  }

  updatev(this.xvals, input.pressed["d"], input.pressed["a"]);
  updatev(this.yvals, input.pressed["s"], input.pressed["w"]);

  this.x = updatep(this.xvals);
  this.y = updatep(this.yvals);
};

// Player.prototype.draw = function () {
//   this.canvas.getContext("2d").drawImage(this.img, this.x.p, this.y.p);
// };

export default Player;
