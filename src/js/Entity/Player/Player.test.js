/* eslint-disable no-undef */
const assert = require("assert").strict;

import Player from "./Player.js";

describe("testing Player.js", function () {
  var player;
  beforeEach(function () {
    player = new Player({ width: 800, height: 600 }, 200, 300);
  });
  it("constructor + basic vals", function () {
    assert.equal(player.x, 200);
    assert.equal(player.y, 300);
    assert.equal(player.width, 50);
    assert.equal(player.height, 50);
    assert.equal(player.x2, 250);
    assert.equal(player.y2, 350);
  });
});
