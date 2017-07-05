const http = require('http');
const assert = require('assert');

require('../app.js');

describe('Server', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:3000', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
describe('json user object', () => {
  it('should should return 302', done => {
    http.get('http://127.0.0.1:3000/p/usr', res => {
      assert.equal(302, res.statusCode);
      done();
    });
  });
});
describe('Server', () => {
  it('Server', done => {
    http.get('http://127.0.0.1:3000', res => {
      assert.notEqual(404, res.statusCode);
      done();
    });
  });
});
