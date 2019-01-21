const series = require('../db_apis/serie_titres.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.titre = req.params.titre;

    const rows = await series.find(context);

    if (req.params.titre) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;
