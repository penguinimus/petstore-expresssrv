var express = require('express');
var router = express.Router();

var db = require('./queries.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/all', db.getAllPuppies);

module.exports = router;
