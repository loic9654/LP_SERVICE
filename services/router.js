const express = require('express');
const router = new express.Router();
const series = require('../controllers/series.js');
 
router.route('/series/:id?')
  .get(series.get);

 
module.exports = router;
