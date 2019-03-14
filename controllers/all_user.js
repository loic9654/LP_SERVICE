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

function getUseFromReq(req) {
  const user = {
    firstName: req.body.firstName,
    lastName:  req.body.lastName,
    username:  req.body.username,
    password:  req.body.password
  };

async function post(req, res, next) {
  try {
    let user = getUseFromReq(req)
    console.log("test ------=====> " + user.firstName);
    res.status(201).json(req);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;
module.exports.get = get;
