const users = require('../db_apis/all_user.js');

console.log('user controlers ok');

console.log('pré auth');

async function recommande(req, res, next) {
  try {
    const context = {};

    context.user = req.params.id_user;
    //console.debug('------titre : '   + req.params.titre);

    if (req.params.id_user) {
      const rows = await users.recommandation(context);
      res.status(200).json(rows);
    } else {
      res.status(404);
    }
  } catch (err) {
    console.log("banana");
    next(err);
  } finally {
    res.status(200).json(rows);
  }
}

async function authenticate(req, res, next) {
  try {
      const resp = await users.authenticate()

      res.status(200).send("{"+resp+"}");
      //next();
  } catch (err) {
    next(err);
  } finally{
    console.log('auth');
    console.log(req.params.id_user);

  }
}

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
  console.log('changingpass');

  try {
    let user = ChangeUsePassFromReq(req);
    console.log("LOG DE USER :"+ user);
    user = await users.modifyPass(user);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

module.exports.recommande = recommande;
module.exports.authenticate = authenticate;
module.exports.modifyPass = modifyPass;
module.exports.post = post;
module.exports.get = get;
