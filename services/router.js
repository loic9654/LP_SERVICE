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

router.route('/series/getID/:titre?').get(serieTitres.getID);


/*todo partly done*/
router.route('/user/authenticate/:id_user?/:pass?').get(user.authenticate);

router.route('/user/verify/:token?').get(user.verifyToken);

router.route('/user/recommande/:id_user?').get(user.recommande);

router.route('/user/addnote/:id_user?/:id_serie?/:note?').get(user.addNote);

router.route('/series/getnote/:id_serie?').get(series.getNote);

router.route('/series/getserie/:id_serie?').get(series.getSerie);


router.route('/user/addfav/:id_user?/:id_serie?').get(user.addFav)

router.route('/user/getfav/:id_user?').get(user.getFav)

router.route('/user/delfav/:id_user?/:id_serie?').get(user.delFav)

router.route('/user/addcomment/:id_user?/:id_serie?/:comment_value?').get(user.addComment)

router.route('/serie/getcomment/:id_serie?').get(series.getComment)

router.route('/user/getusercomment/:id_user?').get(user.getUserComment)


router.route('/users/').get(user.get);

router.route('/users/register/:id_user?/:pass?').get(user.register);


router.route('/users/modify/password').post(user.modifyPass);

// very broken, do not use
//router.route('/users/authenticate').post(auth.authenticate);

module.exports = router;
