var express = require('express');
var router = express.Router();

var db = require('./queries.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/people', db.getAllPuppies);
// router.get('/api/people/:id', db.getSinglePuppy);
// router.post('/api/people', db.createPuppy);
// router.put('/api/people/:id', db.updatePuppy);
// router.delete('/api/people/:id', db.removePuppy);

module.exports = router;
