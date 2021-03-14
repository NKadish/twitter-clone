const supertest = require('supertest');
const app = require('../app');
const agent = supertest.agent(app);
const bcrypt = require('bcrypt');
const db = require('../db');
const cookieParser = require('cookie-parser');
const dbHelpers = require('../helpers/dbHelpers')(db);

let cookie;

beforeAll((done) => {
  supertest(app)
    .post('/users/register')
    .send({
      'username': 'Joel',
      'password': 'test'
    })
    .end((err, response) => {
      cookie = response.header['set-cookie']; // save the token!
      done();
    });
});

// Testing for all of the tweets endpoints 
describe('Testing the tweets API', () => {

  // testing create tweet
  // Honestly man I cannot for the life of me figure out how to get the jwt to be read in the route
  // If I had some more time I might be able to figure it out, but alass
  // This is what they call a blocker right
  // I'm blocked! 
  // Such is life when you have 48 hours
  // Yea because I can't get past the authentication, it seems like I won't be able to test these routes
  it('Should allow a logged in user to post a tweet', async () => {

    const response = await supertest(app).post('/users/register')
    .set("Cookie", "user=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE1Njk5MTAxfQ.J7bKqLE0Dx5amTHfp-DJ0dMIhfc6EzGkVqFif15kDVs;")
    .send(
      {
        'content': 'Testing Jesting!'
      }
    );

    console.log(response);

    expect(response.status).toBe(200);
    expect(response.body).toBe('Tweet submitted successfully!')
  });

  // Deletes the user we created to test the routes
  dbHelpers.deleteUser('Joel');

});