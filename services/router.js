const express = require('express');
const router = new express.Router();
const series = require('../controllers/series.js');
const serieTitres = require('../controllers/serie_titres.js');
const user = require('../controllers/all_user.js');


router.route('/series/')
  .get(series.get);

router.route('/series/:titre?')
  .get(serieTitres.get);

router.route('/users/')
  .get(user.get);

router.route('/users/register')
  .post(user.post);

module.exports = router;
