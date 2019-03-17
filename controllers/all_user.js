const users = require('../db_apis/all_user.js');

console.log('allllll user arrrre herrre controlers');


async function get(req, res, next) {
  try {
    const context = {};

    const rows = await users.find(context);

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
}

async function post(req, res, next) {
  console.log('BANANANANANANA user posted');

  try {
    let user = getUseFromReq(req);
    user = await users.create(employee);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;
module.exports.get = get;
