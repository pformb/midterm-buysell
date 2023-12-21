const { assert } = require('chai');
const { userExists, pool } = require('./userExists');

describe('userExists', () => {
  //trying a new approach save og query
  const originalQuery = pool.query;

  //return to og query after each test
  afterEach(() => {
    pool.query = originalQuery;
  });

  it('should return true if the passed user exists', () => {
    //Mock query to check if user exists with id 1
    pool.query = () => {
      return {
        then: (callback) => callback({ rows: [{ user: 1 }] }),
      };
    };

    return emailExists('test@kangaroo.com').then((exists) => {
      assert(exists === true);
    });
  });
});

module.exports = {userExists};
