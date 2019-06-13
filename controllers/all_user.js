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
    next(err);
  }
}

async function authenticate(req, res, next) {
  try {
    const context = {};
    context.user = req.params.id_user;
    context.pass = req.params.pass;
    const resp = await users.authenticate(context)

    res.status(200).json(resp);
      //next();
  } catch (err) {
    next(err);
  }
}

async function verifyToken(req, res, next) {
  try {
    const context = {};
    context.token = req.params.token;
    const resp = await users.verifyToken(context);
    res.status(200).json(resp);
  } catch (err) {
    next(err);
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
    id: req.body.ID_USER,
    pass:  req.body.MOT_DE_PASSE,
    date:  req.body.DATE_CREATION,
    role:  req.body.ID_ROLE,
    //token: 'testToken'
  };
}

function ChangeUsePassFromReq(req) {
  console.log("extract user from form");
  const user = {
    id:  req.body.ID_USER,
    pass:  req.body.pass
  };
}

async function register(req, res, next) {
  console.log('user posted');

  try {
    const context = {}
    context.user = req.params.id_user;
    context.pass = req.params.pass;

    user = await users.register(context);
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

async function addNote(req, res, next) {
  try {
    const context = {};
    context.serie = req.params.id_serie;
    context.user = req.params.id_user;
    context.note = req.params.note;
    if (req.params.id_serie) {
      const rows = await users.addNote(context);
      res.status(200).json(rows);
    } else {
      res.status(404);
    }
  } catch (err) {
    next(err);
  }
}

async function addFav(req, res, next) {
  try {
    const context = {};
    context.serie = req.params.id_serie;
    context.user = req.params.id_user;
    if (req.params.id_serie) {
      const rows = await users.addFav(context);
      res.status(200).json(rows);
    } else {
      res.status(404);
    }
  } catch (err) {
    next(err);
  }
}

async function delFav(req, res, next) {
  try {
    const context = {};
    context.serie = req.params.id_serie;
    context.user = req.params.id_user;
    if (req.params.id_serie && req.params.id_user) {
      const rows = await users.delFav(context);
      res.status(200).json(rows);
    } else {
      res.status(404);
    }
  } catch (err) {
    next(err);
  }
}

async function getFav(req, res, next) {
  try {
    const context = {};
    context.user = req.params.id_user;
    if (req.params.id_user) {
      const rows = await users.getFav(context);
      res.status(200).json(rows);
    } else {
      res.status(404);
    }
  } catch (err) {
    next(err);
  }
}


async function addComment(req, res, next) {
  try {
    const context = {};
    context.user = req.params.id_user;
    context.serie = req.params.id_serie;
    context.comment = req.params.comment_value;
    if (req.params.id_serie) {
      const rows = await users.addComment(context);
      res.status(200).json(rows);
    } else {
      res.status(404);
    }
  } catch (err) {
    next(err);
  }
}

async function getUserComment(req, res, next) {
  try {
    const context = {};
    context.user = req.params.id_user;
    if (req.params.id_user) {
      const rows = await users.getUserComment(context);
      res.status(200).json(rows);
    } else {
      res.status(404);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.getUserComment = getUserComment;
module.exports.verifyToken = verifyToken;
module.exports.addComment = addComment;
module.exports.addFav = addFav;
module.exports.getFav = getFav;
module.exports.addNote = addNote;
module.exports.recommande = recommande;
module.exports.authenticate = authenticate;
module.exports.modifyPass = modifyPass;
module.exports.register = register;
module.exports.get = get;
