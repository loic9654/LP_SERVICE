const series = require('../db_apis/series.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);
    console.log('log du name');
    console.log(req.params.id);
    const rows = await series.find(context);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  } finally{
    console.log('log du name');
    console.log(req.params.id);
    
  }
}


module.exports.get = get;
