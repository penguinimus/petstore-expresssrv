var express = require('express');
var router = express.Router();

var db = require('./queries.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/people', db.getAllPeople);
router.get('/api/people/:id', db.getSinglePerson);
router.post('/api/people', db.createUser);
router.put('/api/people/:id', db.updateUser);
router.delete('/api/people/:id', db.removePerson);

module.exports = router;
