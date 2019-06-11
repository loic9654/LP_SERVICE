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

router.route('/series/similar/:titre?')
  .get(serieTitres.getSimilar);

/*todo*/
router.route('/user/authenticate/:id_user?/:pass?').get(user.authenticate)
// return

router.route('/user/recommande/:id_user?').get(user.recommande)

/*todo*/
//router.route('/user/getnote/:id_user?').get(user.recommande)

/*todo*/
//router.route('/user/addnote/:id_user?').get(user.recommande)


/*todo*/
//router.route('/user/addfav/:id_user?/:id_serie?').get(user.recommande)

/*todo*/
//router.route('/user/getfav/:id_user?').get(user.recommande)



router.route('/users/').get(user.get);

router.route('/users/register').post(user.post);


router.route('/users/modify/password').post(user.modifyPass);

// very broken, do not use
//router.route('/users/authenticate').post(auth.authenticate);

module.exports = router;
