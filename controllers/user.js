const series = require('../db_apis/user.js');

async function getAll(req, res, next) {
  try {
    const context = {};

    const rows = await series.find(context);


      res.status(200).json(rows);

  } catch (err) {
    next(err);
  }
}

module.exports.get = getAll;
