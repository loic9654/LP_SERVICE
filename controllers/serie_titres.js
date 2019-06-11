const series = require('../db_apis/serie_titres.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.titre = req.params.titre;
    //console.debug('------titre : '   + req.params.titre);
    const rows = await series.find(context);

    if (req.params.titre) {
	     res.status(200).json(rows);

  	/*if (rows.length === 1) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).end();
        }*/
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

async function getID(req, res, next) {
  try {
    const context = {};
    context.titre = req.params.titre;
    //console.debug('------titre : '   + req.params.titre);
    const rows = await series.getID(context);
    if (req.params.titre) {
	     res.status(200).json(rows);
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

async function getSimilar(req, res, next) {
  try {
    const context = {};

    context.titre = req.params.titre;
    //console.debug('------titre : '   + req.params.titre);
    const rows = await series.findSimilar(context);

    if (req.params.titre) {
	     res.status(200).json(rows);

  	/*if (rows.length === 1) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).end();
        }*/
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.getSimilar = getSimilar;
module.exports.get = get;
module.exports.getID = getID;
