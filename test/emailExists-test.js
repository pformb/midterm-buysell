const { assert } = require('chai');
const { emailExists, pool } = require('./emailExists');

describe('emailExists', () => {
  //trying a new approach save og query
  const originalQuery = pool.query;

  afterEach(() => {
    pool.query = originalQuery;
  });

  it('should return true if the passed email exists', () => {
    pool.query = () => {
      return {
        then: (callback) => callback({ rows: [{ email: 'test@example.com' }] }),
      };
    };

    return emailExists('test@kangaroo.com').then((exists) => {
      assert(exists === false);
    });
  });
});
