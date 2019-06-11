const database = require('../services/database.js');

console.log('dbapis ok');

const baseQuery =`SELECT * from Utilisateur`;

 async function authenticate(context) {
   console.log("TODO auth--db_apis/user");
   const query = `select * from utilisateur where ID_USER='`+context.user+`'`
   const result = await database.simpleExecute(query);
   console.log(query);
   if (result.rows.length == 0 ){
     return {"error" : "no values to return"}
   }else {
     result.rows["test"] = test;
     return result.rows

   }
 }

 async function recommandation(context) {
   //YEAH ! beautifull binding..
   //if (context.user) {
     let query = `select count(I.ID_Serie),I.ID_Serie, S.titre from intermediaire I, intermediaire I2,favoris F,Serie S
     where I.ID_Serie not in (select ID_Serie from favoris where ID_USER='1')
     AND I.ID_Mot = I2.Id_Mot
     AND S.ID_Serie = I.ID_Serie
     group by I.ID_serie,S.titre
     order by 1 desc`;
     user = context.user;
   const result = await database.simpleExecute(query);
   return result.rows;
 // }else {
 //   return "ntm du nord"
 // }

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


module.exports.recommandation = recommandation;
module.exports.authenticate = authenticate;
module.exports.create = create;
module.exports.modifyPass = modifyPass;
module.exports.find = find;
module.exports.findUser = findUser;
