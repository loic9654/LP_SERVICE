const express = require('express');
const router = new express.Router();
const series = require('../controllers/series.js');
const serieTitres = require('../controllers/serie_titres.js');


router.route('/series/')
  .get(series.get);


router.route('/series/:titre?')
   .get(serieTitres.get);


module.exports = router;
