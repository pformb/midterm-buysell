const db = require('../connection');

const editUserInfo = (street, city, postal_code, province) => {
  const query = `
  UPDATE users
  SET street = $1, city = $2, postal_code = $3, province = $4
  WHERE email = $5
`;

const values = [street, city, postal_code, province, 'user8@email.com'];

return db.query(query, values);
};

module.exports = editUserInfo;
