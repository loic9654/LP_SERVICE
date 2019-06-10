const users = require('../db_apis/all_user.js');
const jwt = require('jsonwebtoken');

const baseQuery =
 `SELECT * from Utilisateur`;

// users hardcoded for simplicity, store in a db for production applications


async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}





async function getAll() {
  return users.map(u => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
   });
}

module.exports.authenticate = authenticate;
module.exports.getAll = getAll;
