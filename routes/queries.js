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

function getSinglePerson(req, res, next) {
  var userID = parseInt(req.params.id);
  db.one('select username from op_users where user_id = $1', [userID])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE person'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createUser(req, res, next) {
  db.none('insert into op_users(username,password,email,created_on)' +
      'values($1, $2, $3, to_timestamp($4, \'YYYY/MM/DD HH:MI\'))',
    [req.body.username,req.body.password,req.body.email,req.body.created])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Person added'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateUser(req, res, next) {
  db.none('update op_users set username=$1, password=$2, email=$3 where user_id=$4',
    [req.body.username, req.body.password, req.body.email, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated person'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePerson(req, res, next) {
  var personID = parseInt(req.params.id);
  db.result('delete from op_users where user_id = $1', personID)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} person`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllPeople: getAllPeople,
  getSinglePerson: getSinglePerson,
  createUser: createUser,
  updateUser: updateUser,
  removePerson: removePerson
};