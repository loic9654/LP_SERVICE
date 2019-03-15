const users = require('../db_apis/all_user.js');


const baseQuery =
 `SELECT * from Utilisateur`;

// users hardcoded for simplicity, store in a db for production applications

module.exports = {
  authenticate,
  getAll
};

async function authenticate({ username, password }) {
  const user = users.findUser(u => u.username === username && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

async function getAll() {
  return users.map(u => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
   });
}
