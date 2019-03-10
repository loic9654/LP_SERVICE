const database = require('../services/database.js');

const baseQuery =
 `SELECT S.ID_Serie,S.Titre,(P.TF * D.IDF)
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
      if(mots.length == 1 ){
        query += `\n where (D.Mot = :titre)`

      }else if ( i == mots.length - 1 ) {

        query += `\n(D.Mot = :titre)`


      }else{
        query += `\nwhere (D.Mot = :titre) or`

      }
    }
    query += `order by 3 desc`;

    console.log(query);

  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
