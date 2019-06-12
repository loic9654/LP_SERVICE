const database = require('../services/database.js');
var crypto = require('crypto');
console.log('dbapis ok');

const baseQuery =`SELECT * from Utilisateur`;

tokenarray = [];
async function authenticate(context) {
  var user = context.user;
  var pass = context.pass;

  console.log("TODO auth--db_apis/user");
  const query = `select * from utilisateur where ID_USER='`+user+`'`
  const result = await database.simpleExecute(query);
  console.log(query);
  if (result.rows.length == 0 ){
    return {"error" : "no values to return"}
  }else {
    if (result.rows[0 ]["MOT_DE_PASSE"] == pass){
      var token = crypto.createHash('md5').update(user+pass).digest('hex')


      //tokenarray.push({context})
      result.rows.push(token);
      tokenarray.push(token);
      return result.rows;
  }else {
     return {"error" : "wrong password m8 ! ;)"}
  }

  }
}

function verifyToken(context) {
  var passedtok = context.token;
  console.log(passedtok);
  if (passedtok in tokenarray) {
      return {"Message":"True"}

      // if (tok.token.token == passedtok){
      //   return {"success" : "True"}
      // }
  }
  return {"Error":"False"}
}



 async function recommandation(context) {
   //YEAH ! beautifull binding..
   //if (context.user) {
    user = context.user;
     let query = `select count(I.ID_Serie),I.ID_Serie, S.titre from intermediaire I, intermediaire I2,favoris F,Serie S
     where I.ID_Serie not in (select ID_Serie from favoris where ID_USER='1')
     AND I.ID_Mot = I2.Id_Mot
     AND S.ID_Serie = I.ID_Serie
     group by I.ID_serie,S.titre
     order by 1 desc`;
   const result = await database.simpleExecute(query);
   return result.rows;

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

async function addNote(context) {

  const queryID = `insert INTO notation VALUES ('`+context.user+`','`+context.serie+`',`+context.note+`)`;
  console.log(queryID);
  const result = await database.simpleExecute(queryID);
  return {"result" : "success !"};
}

async function addFav(context) {

  const queryID = `insert INTO favoris VALUES ('`+context.user+`','`+context.serie+`')`;
  console.log(queryID);
  const result = await database.simpleExecute(queryID);
  return {"result" : "success !"};
}

async function getFav(context) {

  const queryID = `select * from favoris where ID_USER =('`+context.user+`')`;
  console.log(queryID);
  const result = await database.simpleExecute(queryID);
  return result;
}

async function addComment(context) {
  var uuid = Math.floor(Math.random()*(99999999999-1+1)+1)
  const queryID = `insert INTO commentaire VALUES ('`+context.user+`','`+context.serie+`',`+uuid+`,'`+context.comment+`')`;
  console.log(queryID);
  const result = await database.simpleExecute(queryID);
  return {"result" : "success !"};
}

async function register(context) {
  if (context.user == null || context.pass == null ) {
      return {"result" : "failed ! missing parameter"};
  }
  const queryID = `insert INTO utilisateur VALUES ('`+context.user+`','`+context.pass+`',sysdate,1)`;
  console.log(queryID);
  const result = await database.simpleExecute(queryID);
  return {"result" : "success !, user added"};
}

module.exports.verifyToken = verifyToken;
module.exports.register = register;
module.exports.addComment = addComment;
module.exports.getFav = getFav;
module.exports.addFav = addFav;
module.exports.addNote = addNote;
module.exports.recommandation = recommandation;
module.exports.authenticate = authenticate;
module.exports.create = create;
module.exports.modifyPass = modifyPass;
module.exports.find = find;
module.exports.findUser = findUser;
