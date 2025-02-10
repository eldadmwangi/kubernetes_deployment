const request = require('supertest');
const { expect, assert } = require('chai');
const app = require('../index');

describe('GET /api/users', () => {
    it('should return all users with a 200 status code', async () => {
      const response = await request(app).get('/api/users');
      console.log(response.body);
      expect(response.status).to.equal(200);
      assert.typeOf(response.body, 'array'); // we can use assert
      expect(response.body).to.be.an('array'); // we can also use expect from chai
    });
})
