var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

// add query functions
function getAllPeople(req, res, next) {
  db.any('select $1:name from $2:name',['*', 'op_users'])
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

// function getSinglePerson(req, res, next) {
//   var pupID = parseInt(req.params.id);
//   db.one('select * from company where id = $1', pupID)
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved ONE puppy'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

// function createPuppy(req, res, next) {
//   req.body.age = parseInt(req.body.age);
//   db.none('insert into pups(name, breed, age, sex)' +
//       'values(${name}, ${breed}, ${age}, ${sex})',
//     req.body)
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Inserted one puppy'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

// function updatePuppy(req, res, next) {
//   db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
//     [req.body.name, req.body.breed, parseInt(req.body.age),
//       req.body.sex, parseInt(req.params.id)])
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Updated puppy'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

module.exports = {
   getAllPuppies: getAllPeople,
//   getSinglePuppy: getSinglePuppy,
//   createPuppy: createPuppy,
//   updatePuppy: updatePuppy,
//   removePuppy: removePuppy
};