const users = require('../db_apis/all_user.js');

console.log('allllll user arrrre herrre controlers');


async function get(req, res, next) {
  console.log("get all user");
  try {
    const context = {};

    const rows = await users.find(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

function getUseFromReq(req) {
  console.log("extract user from form");
  const user = {
    firstName: req.body.firstName,
    lastName:  req.body.lastName,
    username:  req.body.username,
    password:  req.body.password,
    token: 'testToken'
  };
}

function ChangeUsePassFromReq(req) {
  console.log("extract user from form");
  const user = {
    username:  req.body.username,
    password:  req.body.password
  };
}

async function post(req, res, next) {
  console.log('user posted');

  try {
    let user = getUseFromReq(req);

    user = await users.create(user);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function modifyPass(req, res, next) {
  console.log('password changed');

  try {
    let user = ChangeUsePassFromReq(req);

    user = await users.modifyPass(user);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

module.exports.modifyPass = modifyPass;
module.exports.post = post;
module.exports.get = get;
