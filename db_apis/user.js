const database = require('../services/database.js');

const baseQuery =
 `SELECT * from Utilisateur`

async function find(context) {
  let query = baseQuery;
  const binds = {};


  if (context.titre) {

    console.log(query);

  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
