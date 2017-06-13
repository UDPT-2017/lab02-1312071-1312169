var bodyParser = require('body-parser');
var friends = require('../models/friends');
var users = require('../models/users');

var friendController = {
  addfriend: function(req, res){
    var friend_id = req.body.friend_id;
    var message = {};
    friends.addFriend(friend_id, function(error){
      if(error){
        message.error = "Add friend failed";
      }
      else{
        message.success = "success!";
      }
      res.redirect("users");
    })

  },

  unfriend: function(req, res){
    var id = req.params.id;
    friends.unfriend(id, function(error){
      if(error){

      }
      else{
        res.status(200).send('Success');
      }
    })
  },
  listFriend: function(req, res){
    if(typeof session == "undefined" || session == null){
      res.redirect('/');
    }
    else{
      users.listFriend(function(friend){
        res.render('friends/index', {friends: friend.rows});
      });
    }
  }
}

module.exports = friendController;
