const database = require('../services/database.js');

const baseQuery =
 `select * from SERIE`;

async function find(context) {
  let query = baseQuery;
  const binds = {};
  if (context.id) {
    binds.Titre = `\'`+ context.id + `\'`;
    query += `\n where Titre = :Titre`;

  }
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}


async function findSimilar(context) {
  if (context.titre) {
    let querySimilar = `select * from (
    select * from serieProche where ID_SERIE = '`+context.titre+`' order by 4 desc)
    where rownum <= 3;`

  }
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}

module.exports.find = find;
