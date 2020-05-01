const favoriteBlog = require("../utils/list_helper").favoriteBlog;

describe("favoriteBlog", () => {
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
      "title": "max",
      "author": "dummy",
      "url": "dummy",
      "likes": 24
    },
  ];

  test("should return an empty object if given an empty array", () => {
    expect(favoriteBlog([])).toEqual({});
  });

  test("should return the object if it's the only one in the array", () => {
    expect(favoriteBlog(oneItem)).toEqual({
      "title": "dummy",
      "author": "dummy",
      "url": "dummy",
      "likes": 12
    });
  });

  test("should return the post with max likes when multiple passed", () => {
    expect(favoriteBlog(multipleItems)).toEqual({
      "title": "max",
      "author": "dummy",
      "url": "dummy",
      "likes": 24
    });
  });
});