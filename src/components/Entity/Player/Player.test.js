/* eslint-disable no-undef */
import assert from "assert";

import Player from "./Player.js";

describe("testing Player.js", function () {
  function Defaults(x, width) {
    this.p = x;
    this.v = 0;
    this.a = 1.8;
    this.fric = 0.3;
    this.max = 8;
    this.end = width - 50;
  }
  const defaultx = new Defaults(200, 800);
  const defaulty = new Defaults(300, 600);
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
  it("starting values for physics", function () {
    assert.deepEqual(player.xvals, defaultx);
    assert.deepEqual(player.yvals, defaulty);
  });
  it("single update with w", function () {
    var newvals = new Defaults(300, 600);
    newvals.v = -1.8;
    newvals.p = 300 - 1.8;
    player.update({ pressed: { w: true } });
    assert.deepEqual(player.xvals, defaultx);
    assert.deepEqual(player.yvals, newvals);
  });
  it("single update with s", function () {
    var newvals = new Defaults(300, 600);
    newvals.v = 1.8;
    newvals.p = 300 + 1.8;
    player.update({ pressed: { s: true } });
    assert.deepEqual(player.xvals, defaultx);
    assert.deepEqual(player.yvals, newvals);
  });
  it("single update with a", function () {
    var newvals = new Defaults(200, 800);
    newvals.v = -1.8;
    newvals.p = 200 - 1.8;
    player.update({ pressed: { a: true } });
    assert.deepEqual(player.xvals, newvals);
    assert.deepEqual(player.yvals, defaulty);
  });
  it("single update with d", function () {
    var newvals = new Defaults(200, 800);
    newvals.v = 1.8;
    newvals.p = 200 + 1.8;
    player.update({ pressed: { d: true } });
    assert.deepEqual(player.xvals, newvals);
    assert.deepEqual(player.yvals, defaulty);
  });
});
