const database = require('../services/database.js');

const baseQuery =
 `SELECT * from Utilisateur`

async function find(context) {
  let query = baseQuery;
  const binds = {};
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}

const createSql =
 `insert into utilisateur (
    ID_USER,
    MOT_DE_PASSE
  ) values (
    :username,
    :password,

  ) returning ID_USER
  into :ID_USER`;

async function create(emp) {
  const user = Object.assign({}, emp);

  user.user_id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, user);

  user.user_id = result.outBinds.user_id[0];

  return user;
}

module.exports.create = create;

module.exports.find = find;
