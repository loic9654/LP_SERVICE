const express = require('express');
const cors = require('cors');
const router = new express.Router();
const series = require('../controllers/series.js');
const serie_titres = require('../controllers/serie_titres.js');

express.use(cors());

router.route('/series/')
  .get(series.get);


router.route('/series/:titre?')
   .get(serie_titres.get);


module.exports = router;
