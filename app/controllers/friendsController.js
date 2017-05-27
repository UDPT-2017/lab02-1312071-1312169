var pg = require('pg');
var connect = "postgres://postgres@localhost:5432/receipebook";
var bodyParser = require('body-parser');
var friends = require('../models/friends');

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
    pg.connect(connect, function(err, client, done){
      client.query("Delete From friends Where friend_id = $1", [id]);
      done();
      res.status(200).send('Success');
    });

  }
}

module.exports = friendController;
