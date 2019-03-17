const database = require('../services/database.js');

const baseQuery =
 `SELECT * from Utilisateur`

async function find(context) {
  let query = baseQuery;
  const binds = {};
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}

async function findUser(context) {
  console.log("findUser");
  console.log(context.username);
  const binds = {};
  bind.username = context.username;
  bind.password = context.password;
  let query = baseQuery + ` where ID_USER = 1 and MOT_DE_PASSE = 'toto'`;

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
module.exports.findUser = findUser;
