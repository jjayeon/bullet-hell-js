/* eslint-disable no-undef */
const assert = require("assert").strict;

import Entity from "./Entity.js";

describe("testing Entity.js", function () {
  describe("testing creation and properties", function () {
    var entity;
    before(function () {
      entity = new Entity(
        { width: 50, height: 50, success: true },
        40,
        50,
        60,
        70,
        { success: true }
      );
      // canvas and img can't exist without the DOM, so mocha can't really test for them.
    });
    it("basic variables", function () {
      assert(entity.canvas.success);
      assert.equal(entity.x, 40, "x ");
      assert.equal(entity.y, 50, "y");
      assert.equal(entity.width, 60, "width");
      assert.equal(entity.height, 70, "height");
      assert(entity.img.success);
    });
    it("x2 and y2", function () {
      assert.equal(entity.x2, 40 + 60, "x2");
      assert.equal(entity.y2, 50 + 70, "y2");
    });
    it("inside()", function () {
      entity = new Entity({}, 100, 100, 100, 100, {});
      assert.equal(entity.inside(0, 0), false, "0, 0");
      assert.equal(entity.inside(300, 300), false, "300, 300");
      assert.equal(entity.inside(150, 150), true, "150, 150");
      assert.equal(entity.inside(100, 100), true, "100, 100");
      assert.equal(entity.inside(200, 200), true, "200, 200");
    });
    it("collides()", function () {
      entity = new Entity({}, 100, 100, 100, 100, {});
      const entity2 = new Entity(
        { width: 50, height: 50, success: true },
        300,
        300,
        100,
        100,
        {}
      );
      const entity3 = new Entity(
        { width: 50, height: 50, success: true },
        150,
        150,
        100,
        100,
        {}
      );

      assert(!entity.collides(entity2), "!entity.collides(entity2)");
      assert(!entity2.collides(entity), "!entity2.collides(entity)");
      assert(entity.collides(entity3), "entity.collides(entity3)");
      assert(entity3.collides(entity), "entity.collides(entity3)");
    });
  });
});
