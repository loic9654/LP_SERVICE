const database = require('../services/database.js');

const baseQuery =
 `SELECT * from Utilisateur`

async function find(context) {
  let query = baseQuery;
  const binds = {};




  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
