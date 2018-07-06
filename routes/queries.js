var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
// var connectionString = 'postgres://ubuntu:testpass@localhost:5432/testdb';
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

// add query functions
function getAllPuppies(req, res, next) {
  db.any('select * from company')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL things'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
   getAllPuppies: getAllPuppies,
//   getSinglePuppy: getSinglePuppy,
//   createPuppy: createPuppy,
//   updatePuppy: updatePuppy,
//   removePuppy: removePuppy
};