const express = require('express');
const router = new express.Router();
const series = require('../controllers/series.js');
const serieTitres = require('../controllers/serie_titres.js');
const user = require('../controllers/all_user.js');
const auth = require('../controllers/auth.js');



router.route('/series/')
  .get(series.get);

router.route('/series/:titre?')
  .get(serieTitres.get);

/*todo*/
router.route('user/authenticate/:id_user?').get(user.authenticate)

router.route('user/recommande/1').get(user.recommande)

router.route('/users/')
  .get(user.get);

router.route('/users/register').post(user.post);

router.route('/users/modify/password').post(user.modifyPass);

// very broken, do not use
//router.route('/users/authenticate').post(auth.authenticate);

module.exports = router;
