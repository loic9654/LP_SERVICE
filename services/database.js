const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');

async function initialize() {
  const pool = await oracledb.createPool(dbConfig.hrPool);
}

module.exports.initialize = initialize;

async function close() {
  await oracledb.getPool().close();
}

module.exports.close = close;

function simpleExecute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
      conn = await oracledb.getConnection();

      const result = await conn.execute(statement, binds, opts);
      console.log(result);

      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) { // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

function otherExecuteModPass(args, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
      conn = await oracledb.getConnection();

      const result = await conn.execute(
        "update utilisateur set MOT_DE_PASSE ="+args[0]+" where ID_USER ="+args[1],
        function(err, result){
          if (err) { console.error(err); return; }
          console.log(result.rows);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }


module.exports.simpleExecute = simpleExecute;
