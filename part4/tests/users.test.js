const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('./test_help');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  // delete all users
  await User.deleteMany({});

  const users = helper.initialUsers
    .map((user) => {
      const userCopy = { ...user };
      userCopy.passwordHash = bcrypt.hashSync(userCopy.password, 10);
      delete userCopy.password;
      return userCopy;
    });

  await Promise.all(
    users.map(
      (user) => (( new User(user)).save() )
    )
  );
});

afterAll(() => {
  mongoose.connection.close();
});

describe('We should be able to get a list of users', () => {
  it('should return 3 users', async () => {
    const users = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(users.body).toHaveLength(3);
    expect(users.body.map((user) => user.username)).toContain('root');
  });
});

describe('We should be able to create new users', () => {
  it('should create a new user', async () => {
    const newUser = {
      username: 'user2',
      name: 'another simple user',
      password: 'dummypassword2',
    };

    const createdUser = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(createdUser.body.username).toBe('user2');

    const allUsers = await helper.getAllUsers();
    expect(allUsers).toHaveLength(helper.initialUsers.length + 1);
  });

  it('should return 400 if any information missing', async () => {
    // username missing
    const newUser = {
      name: 'another simple user',
      password: 'dummypassword2',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('User validation failed');

    // check if user is not actually created
    const allUsers = await helper.getAllUsers();
    expect(allUsers).toHaveLength(helper.initialUsers.length);
  });

  it('should return 400 if password is in incorrect format', async () => {
    const newUser = {
      username: 'simpleuser',
      name: 'another simple user',
      password: '1nval_i_d$password',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Password is not in correct format');

    // check if user is not actually created
    const allUsers = await helper.getAllUsers();
    expect(allUsers).toHaveLength(helper.initialUsers.length);
  });
});
