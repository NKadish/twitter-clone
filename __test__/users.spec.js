const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');
const db = require('../db');
const dbHelpers = require('../helpers/dbHelpers')(db);

// Testing for all of the users endpoints 
describe('Testing the users API', () => {

  // testing register good path
  it('Should allow for register and login when given a unique username and a password', async () => {

    const response = await supertest(app).post('/users/register').send(
      {
        'username': 'Joel',
        'password': 'test'
      }
    );

    expect(response.status).toBe(200);
    expect(response.body).toBe('Registered and logged in!')
  });

  // testing register when the username has been taken
  it('Should not allow a user to register with a used username', async () => {

    const response = await supertest(app).post('/users/register').send(
      {
        'username': 'Joel',
        'password': 'test'
      }
    );

    expect(response.status).toBe(401);
    expect(response.body).toBe('Sorry, a user with this name already exists')
  });

  // testing login with a username and password in the database 
  it('Should allow a user to login', async () => {

    const response = await supertest(app).post('/users/login').send(
      {
        'username': 'Joel',
        'password': 'test'
      }
    );

    expect(response.status).toBe(200);
    expect(response.body).toBe('Logged in!')
  });

  // testing login with a username that does not exist in the db (also checks to make sure cases are sensitive)
  it('Should not allow a user to login with a username not in the db', async () => {

    const response = await supertest(app).post('/users/login').send(
      {
        'username': 'joel',
        'password': 'test'
      }
    );

    expect(response.status).toBe(401);
    expect(response.body).toBe('No account linked to this username.')
  });

  // testing login with a password that doesn't match (also checks for case sensitivity)
  it('Should not allow a user to login with an incorrect password', async () => {

    const response = await supertest(app).post('/users/login').send(
      {
        'username': 'Joel',
        'password': 'Test'
      }
    );

    expect(response.status).toBe(401);
    expect(response.body).toBe('Wrong password. Please try again!')
  });

  // Deletes the user we created to test the routes
  dbHelpers.deleteUser('Joel');

});