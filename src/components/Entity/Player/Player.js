import Entity from "../Entity.js";

// constructor function for the player.
function Player(canvas, x, y, img) {
  Entity.call(this, canvas, x, y, 50, 50, img);
}

Player.prototype = Object.create(Entity.prototype);

export default Player;
