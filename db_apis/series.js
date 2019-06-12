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
  let query = `select avg(note) as notemoy from notation where ID_SERIE='`+serie+`'`;
  console.log(query);
  const result = await database.simpleExecute(query);
  console.log(result);
  return result.rows;

}

async function getComment(context) {
  const queryID = `select * from commentaire where ID_SERIE='`+context.serie+`'`;
  console.log(queryID);
  const result = await database.simpleExecute(queryID);
  return result.rows;
}

async function getSerie(context) {

  const queryID = `select Titre from serie where ID_SERIE='`+context.serie+`'`;
  console.log(queryID);
  const result = await database.simpleExecute(queryID);
  return result.rows;
}


module.exports.getComment = getComment;
module.exports.find = find;
module.exports.getNote = getNote;
