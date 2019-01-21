const database = require('../services/database.js');

const baseQuery =
 `select * from SERIE`;

async function find(context) {
  let query = baseQuery;
  const binds = {};


  if (context.titre) {
    binds.titre = context.titre;

    query += `\nwhere titre = :titre`;

  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
