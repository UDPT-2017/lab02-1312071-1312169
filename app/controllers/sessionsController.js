var pg = require('pg');
var connect = "postgres://postgres:postgres@localhost:5432/bt01";
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var users = require('../models/users');

var sessionsController = {
  login: function(req, res){
    var email = req.body.email;
    var pass = req.body.password;
    var message = {};
    session = req.session;

    var user = users.findOneUser(email,function(result){
        if(result){
          var kq = passwordHash.verify(pass, result.rows[0].password);

          if(kq == true)
          {
            message.success = "Login successfully!";
            session.user = result.rows[0];
            res.redirect('messages');
          }
          else
          {
            message.error = "Invalid password!";
           res.render('sessions/new', {message: message});
          }
        }
        else{
          message.error = "Invalid email";
          res.render('sessions/new', {message: message});
        }
    });
  },
  logout: function(req, res){
    message = {};
    session = null;
    message.success = "Log out successfully!";
    res.redirect('/');
  }
}

module.exports = sessionsController;
