const mostLikes = require("../utils/list_helper").mostLikes;

describe("mostLikes", () => {
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
      "likes": 0
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

  test("returns empty object for empty array of blogs", () => {
    expect(mostLikes([])).toEqual({});
  });

  test("returns the author and it's likes for a single item", () => {
    expect(mostLikes(oneItem)).toEqual({
      "author": "dummy",
      "likes": 12
    });
  });

  test("returns the correct author and likes out of multiple items", () => {
    expect(mostLikes(multipleItems)).toEqual({
      "author": "Max",
      "likes": 36
    });
  });
});