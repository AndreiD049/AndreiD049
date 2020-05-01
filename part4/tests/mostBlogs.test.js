const mostBlogs = require("../utils/list_helper").mostBlogs;

describe("mostBlogs", () => {
  const oneItem = [
    {
      "title": "dummy",
      "author": "dummy",
      "url": "dummy",
      "likes": 12
    },
  ];

  const multipleItems = [
    {
      "title": "dummy",
      "author": "Max",
      "url": "dummy",
      "likes": 12
    },
    {
      "title": "dummy",
      "author": "John",
      "url": "dummy",
      "likes": 12
    },
    {
      "title": "max",
      "author": "Jane",
      "url": "dummy",
      "likes": 24
    },
    {
      "title": "Jane",
      "author": "Max",
      "url": "dummy",
      "likes": 24
    },
  ];

  test("returns '' empty string if given empty list", () => {
    expect(mostBlogs([])).toBe("");
  });

  test("returns the author if one value in array", () => {
    expect(mostBlogs(oneItem)).toBe("dummy");
  });

  test("resutrn the correct author for multiple values", () => {
    expect(mostBlogs(multipleItems)).toBe("Max");
  });
});