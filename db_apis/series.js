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

async function getNote(context) {

  serie = context.serie;
  let query = `select * as notemoy from notation where ID_SERIE='13'`;
  console.log(query);
  const result = await database.simpleExecute(query);
  console.log(result);
  return result.rows;
// }else {
//   return "ntm du nord"
// }
}


module.exports.find = find;
module.exports.getNote = getNote;
