const assert = require('assert');
const { getProductById, pool } = require('./getProductById');

describe('getProductById', () => {
  const original = pool.query;
  pool.query = () => {
    return {
      then: (callback) => callback({ rows: [{ id: 1, name: 'Test Product' }] }),
    };
  };

  it('should retrieve a product by their ID', () => {
    const productId = 1;
    return getProductById(productId).then(function(product) {
      assert(product && typeof product === 'object');
      assert(product.id === productId);
    });
  });

  it('should handle errors during the database query', () => {
    pool.query = () => {
      return {
        then: (callback) => callback({ rows: [] }),
      };
    };

    const productId = 1;
    return getProductById(productId).then(function(product) {
      assert(product === undefined);
    });
  });

  after(() => {
    pool.query = original;
  });
});
