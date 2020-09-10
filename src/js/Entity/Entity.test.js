/* eslint-disable no-undef */
const assert = require("assert").strict;

import Entity from "./Entity.js";

describe("testing Entity.js", function () {
  const canvas = { width: 800, height: 600, success: true };
  const img = { success: true };
  var entity, entity2, entity3;

  const xvals = {
    p: 100,
  };
  const yvals = {
    p: 200,
  };

  const width = 50;
  const height = 50;

  beforeEach(function () {
    entity = new Entity(canvas, xvals, yvals, width, height, img);
    // canvas and img can't exist without the DOM, so mocha can't really test for them.

    entity2 = new Entity(canvas, { p: 1000 }, { p: 1000 }, width, height, img);
    entity3 = new Entity(
      canvas,
      { p: xvals.p + width / 2 },
      { p: yvals.p + height / 2 },
      width,
      height,
      img
    );
  });

  describe("testing creation and properties", function () {
    it("basic variables", function () {
      assert(entity._canvas.success, "canvas");
      assert.equal(entity.x, xvals.p, "x ");
      assert.equal(entity.y, yvals.p, "y");
      assert.equal(entity.width, width, "width");
      assert.equal(entity.height, height, "height");
      assert(entity._img.success, "img");
    });
    it("x2 and y2", function () {
      assert.equal(entity.x2, xvals.p + width, "x2");
      assert.equal(entity.y2, yvals.p + height, "y2");
    });
  });
  // ----------------------------------------------------------------

  describe("testing physics", function () {
    it("single update going up", function () {
      const newvals = {
        a: -1.8,
        v: -1.8,
        p: yvals.p - 1.8,
      };
      entity._yvals.a = -1.8;
      entity.update(1);
      assert.deepEqual(entity._yvals.a, newvals.a);
      assert.deepEqual(entity._yvals.v, newvals.v);
      assert.deepEqual(entity.y, newvals.p);
    });
    it("single update going down", function () {
      const newvals = {
        a: 1.8,
        v: 1.8,
        p: yvals.p + 1.8,
      };
      entity._yvals.a = 1.8;
      entity.update(1);
      assert.deepEqual(entity._yvals.a, newvals.a);
      assert.deepEqual(entity._yvals.v, newvals.v);
      assert.deepEqual(entity.y, newvals.p);
    });
    it("single update going left", function () {
      const newvals = {
        a: -1.8,
        v: -1.8,
        p: xvals.p - 1.8,
      };
      entity._xvals.a = -1.8;
      entity.update(1);
      assert.deepEqual(entity._xvals.a, newvals.a);
      assert.deepEqual(entity._xvals.v, newvals.v);
      assert.deepEqual(entity.x, newvals.p);
    });
    it("single update going right", function () {
      const newvals = {
        a: 1.8,
        v: 1.8,
        p: xvals.p + 1.8,
      };
      entity._xvals.a = 1.8;
      entity.update(1);
      assert.deepEqual(entity._xvals.a, newvals.a);
      assert.deepEqual(entity._xvals.v, newvals.v);
      assert.deepEqual(entity.x, newvals.p);
    });
  });
  // ----------------------------------------------------------------
  describe("testing collision", function () {
    it("inside()", function () {
      assert.equal(entity.inside(0, 0), false, "0, 0");
      assert.equal(entity.inside(300, 300), false, "300, 300");
      assert.equal(entity.inside(125, 225), true, "225, 325");
      assert.equal(entity.inside(100, 200), true, "200, 300");
      assert.equal(entity.inside(150, 250), true, "250, 350");
    });
    it("collides()", function () {
      assert(!entity.collides(entity2), "!entity.collides(entity2)");
      assert(!entity2.collides(entity), "!entity2.collides(entity)");
      assert(entity.collides(entity3), "entity.collides(entity3)");
      assert(entity3.collides(entity), "entity.collides(entity3)");
    });
  });
});
