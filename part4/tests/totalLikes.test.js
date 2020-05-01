const totalLikes = require("../utils/list_helper").totalLikes;


describe("totalLikes", () => {
  const oneItem = [
    {
      "title": "dummy",
      "author": "dummy",
      "url": "dummy",
      "likes": 12
    }
  ];

  const multipleItems = [
    {
      "title": "dummy",
      "author": "dummy",
      "url": "dummy",
      "likes": 12
    },
    {
      "title": "dummy",
      "author": "dummy",
      "url": "dummy",
      "likes": 12
    },
    {
      "title": "dummy",
      "author": "dummy",
      "url": "dummy",
      "likes": 12
    }
  ];

  test("returns 0 for an empty list", () => {
    expect(totalLikes([])).toBe(0);
  });

  test("return the number of likes if only one item in array", () => {
    expect(totalLikes(oneItem)).toBe(12);
  });

  test("return correct result for multiple items", () => {
    expect(totalLikes(multipleItems)).toBe(36);
  });
});