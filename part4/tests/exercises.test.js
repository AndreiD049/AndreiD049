const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const helper = require('./test_help.js');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  // delete all
  await Blog.deleteMany({});

  for(let val of helper.initialValues) {
    const user = await User.findOne({});
    let b = new Blog({
      user: user._id,
      ...val
    });
    await b.save();
  }
});

jest.useFakeTimers();
test('get all blogs', async () => {
  const allBlogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(allBlogs.body).toHaveLength(3);
});

test('adding a new blog post', async () => {
  const newBlog = {
    'title': 'HTML',
    'author': 'dummy',
    'url': 'www.dummy.com',
    'likes': 12
  };

  const token = await helper.getToken('root');

  const addedBlog = await api
    .post('/api/blogs')
    .set('authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(addedBlog.body.title).toBe('HTML');

  const afterAdd = await helper.getAll();
  expect(afterAdd).toHaveLength(helper.initialValues.length + 1);
});

test('adding a new blog post without logging in should not succeed', async () => {
  const newBlog = {
    'title': 'HTML',
    'author': 'dummy',
    'url': 'www.dummy.com',
    'likes': 12
  };

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/);

  expect(result.body.error).toContain('token missing');

  const afterAdd = await helper.getAll();
  expect(afterAdd).toHaveLength(helper.initialValues.length);
});

test('each blog should have an id property', async () => {
  const allBlogs = await helper.getAll();

  expect(allBlogs[0].id).toBeDefined();
});

test('default value for likes field', async () => {
  const newBlog = {
    'title': 'HTML',
    'author': 'dummy',
    'url': 'www.dummy.com',
  };

  const token = await helper.getToken('root');

  const addedBlog = await api
    .post('/api/blogs')
    .set('authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(addedBlog.body.likes).toBe(0);
});

test('creating a blogpost without title and url', async () => {
  const newBlog = {
    'author': 'dummy',
  };

  const token = await helper.getToken('root');

  await api
    .post('/api/blogs')
    .set('authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);

});

describe('updating an existing blog', () => {
  test('update existing blogpost', async () => {
    const allBlogs = await helper.getAll();
    const firstCopy = { ...allBlogs[0] };
    firstCopy.title = 'Updated title test';

    const result = await api
      .put(`/api/blogs/${firstCopy.id}`)
      .send(firstCopy)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(result.body.title).toBe('Updated title test');
  });

  test('updating an inexistent blogpost should result in 404 not found', async () => {
    const inexistentId = await helper.getInexistentId();

    const users = await helper.getAllUsers();
    const bogusUpdate = {
      title: 'I will not update anyone',
      user: users[0]._id,
    };

    await api
      .put(`/api/blogs/${inexistentId}`)
      .send(bogusUpdate)
      .expect(404);
  });
});

describe('deleting a blog post', () => {
  test('deleting an existing post', async () => {
    const allPosts = await helper.getAll();
    const idToDelete = allPosts[0].id;

    const token = await helper.getToken('root');

    await api
      .delete(`/api/blogs/${idToDelete}`)
      .set('authorization', `Bearer ${token}`)
      .expect(204);

    const allAfter = await helper.getAll();
    expect(allAfter).toHaveLength(helper.initialValues.length - 1);
  });

  test('deleting another user\'s post should be prohibitet', async () => {
    const allPosts = await helper.getAll();
    const idToDelete = allPosts[0].id;

    // get a user with
    const token = await helper.getToken('user');

    await api
      .delete(`/api/blogs/${idToDelete}`)
      .set('authorization', `Bearer ${token}`)
      .expect(401);

    // check that blog was not deleted
    const allAfter = await helper.getAll();
    expect(allAfter).toHaveLength(helper.initialValues.length);
  });

  test('deleting a post while unauthorized should return 401', async () => {
    const allPosts = await helper.getAll();
    const idPostToDelete = allPosts[0];

    const result = await api
      .delete(`/api/blogs/${idPostToDelete}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toBe('Only logged in users can delete blogs');
  });

  test('deleting an inexistent post should return 404 not found', async () => {
    const id = await helper.getInexistentId();

    const token = await helper.getToken('root');

    await api
      .delete(`/api/blogs/${id}`)
      .set('authorization', `Bearer ${token}`)
      .expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
