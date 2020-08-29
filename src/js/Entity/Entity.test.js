/* eslint-disable no-undef */
const assert = require("assert").strict;

import Entity from "./Entity.js";

describe("testing Entity.js", function () {
  describe("testing creation and properties", function () {
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
    var entity, entity2, entity3;
    beforeEach(function () {
      entity = new Entity(
        { width: 800, height: 600, success: true },
        200,
        300,
        50,
        50,
        { success: true }
      );
      // canvas and img can't exist without the DOM, so mocha can't really test for them.

      entity2 = new Entity(
        { width: 800, height: 600, success: true },
        300,
        300,
        100,
        100
      );
      entity3 = new Entity(
        { width: 800, height: 600, success: true },
        225,
        325,
        100,
        100
      );
    });

    it("basic variables", function () {
      assert(entity.canvas.success);
      assert.equal(entity.x, 200, "x ");
      assert.equal(entity.y, 300, "y");
      assert.equal(entity.width, 50, "width");
      assert.equal(entity.height, 50, "height");
      assert(entity.img.success);
    });
    it("x2 and y2", function () {
      assert.equal(entity.x2, 200 + 50, "x2");
      assert.equal(entity.y2, 300 + 50, "y2");
    });
    // ----------------------------------------------------------------
    it("starting values for physics", function () {
      assert.deepEqual(entity.xvals, defaultx);
      assert.deepEqual(entity.yvals, defaulty);
    });
    it("single update going up", function () {
      var newvals = Defaults(300, 600);
      newvals.a = -1.8;
      newvals.v = -1.8;
      newvals.p = 300 - 1.8;
      entity.yvals.a = -1.8;
      entity.update();
      assert.deepEqual(entity.xvals, defaultx);
      assert.deepEqual(entity.yvals, newvals);
    });
    it("single update going down", function () {
      var newvals = Defaults(300, 600);
      newvals.a = 1.8;
      newvals.v = 1.8;
      newvals.p = 300 + 1.8;
      entity.yvals.a = 1.8;
      entity.update();
      assert.deepEqual(entity.xvals, defaultx);
      assert.deepEqual(entity.yvals, newvals);
    });
    it("single update going left", function () {
      var newvals = Defaults(200, 800);
      newvals.a = -1.8;
      newvals.v = -1.8;
      newvals.p = 200 - 1.8;
      entity.xvals.a = -1.8;
      entity.update();
      assert.deepEqual(entity.xvals, newvals);
      assert.deepEqual(entity.yvals, defaulty);
    });
    it("single update going right", function () {
      var newvals = Defaults(200, 800);
      newvals.a = 1.8;
      newvals.v = 1.8;
      newvals.p = 200 + 1.8;
      entity.xvals.a = 1.8;
      entity.update();
      assert.deepEqual(entity.xvals, newvals);
      assert.deepEqual(entity.yvals, defaulty);
    });
    // ----------------------------------------------------------------
    it("inside()", function () {
      assert.equal(entity.inside(0, 0), false, "0, 0");
      assert.equal(entity.inside(300, 300), false, "300, 300");
      assert.equal(entity.inside(225, 325), true, "225, 325");
      assert.equal(entity.inside(200, 300), true, "200, 300");
      assert.equal(entity.inside(250, 350), true, "250, 350");
    });
    it("collides()", function () {
      assert(!entity.collides(entity2), "!entity.collides(entity2)");
      assert(!entity2.collides(entity), "!entity2.collides(entity)");
      assert(entity.collides(entity3), "entity.collides(entity3)");
      assert(entity3.collides(entity), "entity.collides(entity3)");
    });
  });
});
