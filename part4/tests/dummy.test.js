const dummy = require("../utils/list_helper").dummy;

test("dummy always returns 1", () => {
  expect(dummy([1, 2])).toBe(1);
});