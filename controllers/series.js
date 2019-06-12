const series = require('../db_apis/series.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);
    const rows = await series.find(context);
    if (req.params.id) {
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

async function getNote(req, res, next) {
  try {
    const context = {};

    context.serie = req.params.id_serie;
    if (req.params.id_serie) {
      const rows = await series.getNote(context);
      res.status(200).json(rows);
    } else {
      res.status(404);
    }
  } catch (err) {
    next(err);
  }
}
async function getComment(req, res, next) {
  try {
    const context = {};
    context.serie = req.params.id_serie;
    if (req.params.id_serie) {
      const rows = await series.getComment(context);
      res.status(200).json(rows);
    } else {
      res.status(404);
    }
  } catch (err) {
    next(err);
  }
}

async function getSerie(req, res, next) {
  try {
    const context = {};
    context.serie = req.params.id_serie;
    //console.debug('------titre : '   + req.params.titre);
    const rows = await series.getSerie(context);
    res.status(200).json(rows);

  } catch (err) {
    next(err);
  }
}

module.exports.getComment = getComment;
module.exports.getNote = getNote;
module.exports.get = get;
