var users = require('../models/users');
var bodyPaser = require('body-parser');
var passwordHash = require('password-hash');

var usersController = {
  signup: function(req, res){
    var user = {};
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = passwordHash.generate(req.body.password);
    user.phone = req.body.phone;

    var message = {};
    if(user.name && user.email && user.password){
      users.signup(user,function(error){
        if(error){
          message.error = error.detail;
          res.render('signup', {message: message});
        }
        else{
          message.success= "Đăng kí tài khoản thành công";
          res.redirect('/');
        }
      });
    }
    else{
      message.error = "Name, email, password cannot blank!"
      res.render('signup', {message: message});
    }

  },
  listAllUser: function(req, res){
    users.listAllUser(function(result){
      users.listFriend(function(friend){
        res.render('users/index', {users: result.rows, friends: friend.rows});
      })
    });
  }
};
module.exports = usersController;
