const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const helper = require('./test_help.js');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  // delete all
  await Blog.deleteMany({});

  for(let val of helper.initialValues) {
    let b = new Blog(val);
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

  const addedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(addedBlog.body.title).toBe('HTML');

  const afterAdd = await helper.getAll();
  expect(afterAdd).toHaveLength(helper.initialValues.length + 1);
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

  const addedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(addedBlog.body.likes).toBe(0);
});

test('creating a blogpost without title and url', async () => {
  const newBlog = {
    'author': 'dummy',
  };

  const addedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);

});

afterAll(() => {
  mongoose.connection.close();
});
