var pg = require('pg');
var connect = "postgres://postgres:postgres@localhost:5432/bt01";
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var users = require('../models/users');

var sessionsController = {
  login: function(req, res){
    var name = req.body.name;
    var pass = req.body.password;
    var message = {};
    session = req.session;

    var user = users.findOneUser(name,function(result){
        if(result){
          var kq = passwordHash.verify(pass, result.rows[0].password);

          if(kq == true)
          {
            message.success = "Login successfully!";
            session.user = result.rows[0];
            res.redirect('/');
          }
          else
          {
            message.error = "Invalid password!";
           res.render('sessions/new', {message: message});
          }
        }
        else{
          message.error = "Invalid name";
          res.render('sessions/new', {message: message});
        }
    });
  },
  logout: function(req, res){
    message = {};
    session.user = null;
    message.success = "Log out successfully!";
    res.redirect('/');
  }
}

module.exports = sessionsController;
