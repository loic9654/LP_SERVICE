const database = require('../services/database.js');

const baseQuery =
 `SELECT S.ID_Serie,S.Titre,(P.TF * D.IDF) as score
from Dictionnaire D
inner join frequence p
on D.ID_Mot = P.ID_Mot
inner join serie S
on P.ID_Serie = S.ID_Serie
`

async function find(context) {
  let query = baseQuery;
  const binds = {};


  if (context.titre) {
    mots = context.titre.split(" ");

    for (var i = 0; i < mots.length; i++) {
      binds.titre = mots[i];
      console.log('binds.titre------' +mots[i]);
      if(mots.length == 1 ){
        query += `\n where (D.Mot like '`+mots[i]+`')`
      }else if ( i == mots.length - 1 ) {
        query += `\n(D.Mot ='`+mots[i]+`')`
      } else if (i == 0) {
        query += `\nwhere (D.Mot like '`+mots[i]+`') or`
      }else{
        query += `\n(D.Mot like '`+mots[i]+`') or`
      }
    }
    query += `order by 3 desc`;
    console.log(query)
  }
  const result = await database.simpleExecute(query);
  return result.rows;
}

async function findSimilar(context) {
    const querySimilar = `select * from (select * from serieProche where ID_SERIE = '`+context.titre+`' order by 4 desc) where rownum <= 3`;

  console.log(querySimilar);
  const result = await database.simpleExecute(querySimilar);
  return result.rows;
}

async function getID(context) {

  const queryID = `select ID_SERIE from serie where titre like '`+context.titre+`'`;
  console.log(queryID);
  const result = await database.simpleExecute(queryID);
  return result.rows;
}

module.exports.find = find;
module.exports.findSimilar = findSimilar;
module.exports.getID = getID;
