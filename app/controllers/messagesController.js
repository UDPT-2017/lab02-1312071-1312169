var pg = require('pg');
var connect = "postgres://postgres@localhost:5432/receipebook";
var messages = require('../models/messages');

var messagesController = {
  allMessages: function(req, res){
    var message = {};
    messages.allMessages(function(result){
      if(result){
        res.render('home', {messages: result.rows})
      }
      else{
        res.render('home');
      }
    })
  }
}

module.exports = messagesController;
