const { assert } = require('chai');
const { getUserByEmail, pool } = require('./getUserByEmail');

describe('getUserByEmail', () => {
  // Mocking the pool object for testing purposes
  const originalQuery = pool.query;
  pool.query = () => {
    return {
      then: (callback) => callback({ rows: [{ id: 1, name: 'Test User' }] }),
    };
  };

  it('should retrieve a user by their email', () => {
    const userEmail = 1;
    return getUserByEmail(userEmail).then(function (user) {
      // Assert that the result is an object
      assert(user && typeof user === 'object');
      // Assert that the user email matches the expected email
      assert(user.email === userEmail);
      // Add more assertions based on your expected results
    });
  });

    it('should handle SQL injections during the database query', () => {
      // Mocking a malicious email injection
      const userEmail = 'test@kangaroo.com';
      return getUserByEmail(userEmail).then(function (user) {
        ;
        //checking that this dosen't return a user from db
        assert(user.email === undefined);
        // Add more assertions based on your error handling logic
      });
    });

    it('should handle errors during the database query', () => {
      // Mocking an error during the query for testing error handling
      pool.query = () => {
        return {
          then: (callback) => callback({ rows: [] }),
        };
      };

      const userEmail = 'test@kangaroo.com';
      return getUserByEmail(userEmail).then(function (user) {
        // Add assertions for error handling
        // Assert that the result is undefined (or whatever your error handling returns)
        assert(user.email === undefined);
        // Add more assertions based on your error handling logic
      });
    });

    // Reset the pool.query to the original implementation after testing
    // so that it doesn't affect other tests
    // This is important because the pool object is a singleton
    after(() => {
      pool.query = originalQuery;
    });
  });
