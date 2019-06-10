const database = require('../services/database.js');

console.log('allllll user arrrre herrre dbapis');

const baseQuery =
 `SELECT * from Utilisateur`

 async function authenticate() {
   console.log("TODO auth--db_apis/alluser");
   return 'ok'
 }

async function find(context) {
  console.log("find");
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
  console.console.log(result.rows);
  return result.rows;
}

const createSql =
 `insert into utilisateur (
    ID_USER,
    MOT_DE_PASSE
  ) values (
    :username,
    :password,
    "date",
    2

  ) returning ID_USER
  into :ID_USER`;

async function create(emp) {
  const user = Object.assign({}, emp);

  // user.user_id = {
  //   dir: oracledb.BIND_OUT,
  //   type: oracledb.NUMBER
  // }
  console.log("ajout de lutilisateur");
  const result = await database.simpleExecute(createSql, user);

  //user.user_id = result.outBinds.user_id[0];

  return result;
}


async function modifyPass(emp) {
  const user = Object.assign({}, emp);

  // user.user_id = {
  //   dir: oracledb.BIND_OUT,
  //   type: oracledb.NUMBER
  // }
  console.log("modification de lutilisateur");
  console.log(emp);
  const result = await database.otherExecuteModPass([emp[0], emp [1]], emp);

  //user.user_id = result.outBinds.user_id[0];

  return result;
}

module.exports.create = create;
module.exports.modifyPass = modifyPass;

module.exports.find = find;
module.exports.findUser = findUser;
