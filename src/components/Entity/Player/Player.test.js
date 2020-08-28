/* eslint-disable no-undef */
const assert = require("assert").strict;

import Player from "./Player.js";

describe("testing Player.js", function () {
  function Defaults(x, width) {
    return {
      p: x,
      v: 0,
      a: 0,
      fric: 0.3,
      max: 8,
      end: width - 50,
    };
  }
  const defaultx = Defaults(200, 800);
  const defaulty = Defaults(300, 600);
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
  it("single update going up", function () {
    var newvals = Defaults(300, 600);
    newvals.a = -1.8;
    newvals.v = -1.8;
    newvals.p = 300 - 1.8;
    player.yvals.a = -1.8;
    player.update();
    assert.deepEqual(player.xvals, defaultx);
    assert.deepEqual(player.yvals, newvals);
  });
  it("single update going down", function () {
    var newvals = Defaults(300, 600);
    newvals.a = 1.8;
    newvals.v = 1.8;
    newvals.p = 300 + 1.8;
    player.yvals.a = 1.8;
    player.update();
    assert.deepEqual(player.xvals, defaultx);
    assert.deepEqual(player.yvals, newvals);
  });
  it("single update going left", function () {
    var newvals = Defaults(200, 800);
    newvals.a = -1.8;
    newvals.v = -1.8;
    newvals.p = 200 - 1.8;
    player.xvals.a = -1.8;
    player.update();
    assert.deepEqual(player.xvals, newvals);
    assert.deepEqual(player.yvals, defaulty);
  });
  it("single update going right", function () {
    var newvals = Defaults(200, 800);
    newvals.a = 1.8;
    newvals.v = 1.8;
    newvals.p = 200 + 1.8;
    player.xvals.a = 1.8;
    player.update();
    assert.deepEqual(player.xvals, newvals);
    assert.deepEqual(player.yvals, defaulty);
  });
});
