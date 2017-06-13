var bodyParser = require('body-parser');
var messages = require('../models/messages');
var timeAgo = require('node-time-ago');

var homeController = {
  home: function(req, res){
    if(typeof session == "undefined" || session == null){
      res.render('sessions/new');
    }
    else{
      var message = {};
      messages.allMessages(function(result){
        if(result){
          for(var i = 0; i < result.rowCount; i++){
            result.rows[i].time_ago = timeAgo(result.rows[i].time_send);
          }
          res.render('home', {messages: result.rows})
        }
        else{
          res.render('home');
        }
      })
    }
  }
}

module.exports = homeController;
