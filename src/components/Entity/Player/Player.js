import Entity from "../Entity.js";

// constructor function for the player.
function Player(canvas, x, y, playerimg) {
  Entity.call(this, canvas, x, y, 50, 50, playerimg);
}

Player.prototype = Object.create(Entity.prototype);

export default Player;
