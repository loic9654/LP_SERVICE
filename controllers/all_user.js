const series = require('../db_apis/all_user.js');

async function get(req, res, next) {
  try {
    const context = {};

    const rows = await series.find(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}


async function post(req, res, next) {
  try {
    console.log("test ------=====> " + req);
    res.status(201).json(req);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;
module.exports.get = get;
