var messages = require('../models/messages');
var users = require('../models/users');
var timeAgo = require('node-time-ago');

var messagesController = {
  allMessages: function(req, res){
    if(typeof session == "undefined" || session == null){
      res.redirect('/');
    }
    else{
      var message = {};
      messages.allMessages(function(result){
        if(result){
          for(var i = 0; i < result.rowCount; i++){
            result.rows[i].time_ago = timeAgo(result.rows[i].time_send);
          }
          //res.send({result: result});
          res.render('home', {messages: result.rows})
        }
        else{
          res.render('home');
        }
      })
    }
  },
  getfriend: function(req, res){
    if(typeof session == "undefined" || session == null){
      res.redirect('/');
    }
    else{
      users.listFriend(function(friend){
        res.render('messages/new', {friends: friend.rows});
      })
    }
  },
  newMess: function(req, res){
    var mess = {};
    var message = {};
    mess.user_send = session.user.id;
    mess.user_recipient = req.body.user_recipient;
    mess.title = req.body.title;
    mess.content = req.body.content;
    mess.time_send = new Date();
    if(mess.user_send && mess.user_recipient && mess.content){
      messages.newMess(mess, function(error){
        if(error){
          message.error = "Send message failed";
          res.render('messages/new', {message: message});
        }
        else{
          messages.messages_sent(function(result){
            res.render('messages/sent', {messages: result.rows});
          })
        }
      });
    }
    else{
      res.redirect('new');
    }
  },

  show: function(req, res){
    if(typeof session == "undefined" || session == null){
      res.redirect('/');
    }
    else{
      var id = req.params.id;
      messages.show(id, function(result){
        if(result){
          res.status(200).send('Success');
        }
        else{

        }
      })
    }
  },

  showmessage: function(req, res){
    if(typeof session == "undefined" || session == null){
      res.redirect('/');
    }
    else{
      var id = req.params.id;
      messages.show(id, function(result){
        if(result){
          res.render('messages/show', {mess: result.rows[0]});
        }
        else{

        }
      })
    }
  },

  messages_sent: function(req, res){
    if(typeof session == "undefined" || session == null){
      res.redirect('/');
    }
    else{
      messages.messages_sent(function(result){
        if(result){
          res.render('messages/sent', {messages: result.rows});
        }
        else{

        }
      })
    }
  },
  syncMessages: function(req, res){
      messages.allMessages(function(result){
        if(result){
          for(var i = 0; i < result.rowCount; i++){
            result.rows[i].time_ago = timeAgo(result.rows[i].time_send);
          }
          res.send({mesages: result.rows});
        }
        else{
          res.render('home');
        }
      })
    }
}

module.exports = messagesController;
