const series = require('../db_apis/user.js');

async function get(req, res, next) {
  try {
    const context = {};

    const rows = await series.find(context);


      res.status(200).json(rows[0]);

  } catch (err) {
    next(err);
  }
}

module.exports.get = getAll;
