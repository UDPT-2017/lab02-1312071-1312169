var pg = require('pg');
var connect = "postgres://postgres@localhost:5432/messages";

var messages = {
  allMessages: function(callback){
    try{
      pg.connect(connect, function(err, client, done){
        client.query("SELECT m.*, u.name FROM messages m join users u on u.id = m.user_send WHERE user_recipient = $1 ORDER BY time_send DESC",[session.user.id], function(error, result){
          callback(result);
        });
      });
    }catch(error)
    {
      callback(error);
    }
  },
  newMess: function(mess, callback){
    pg.connect(connect, function(err, client, done){
      client.query("INSERT INTO messages(user_send, user_recipient, title, content, time_send) Values ($1, $2, $3, $4, $5)", [mess.user_send, mess.user_recipient, mess.title, mess.content, mess.time_send], function(error, result){
        callback(error);
      });
    });
  },

  show: function(id, callback){
    pg.connect(connect, function(err, client, done){
      client.query("SELECT m.*, u.name FROM messages m join users u on u.id = m.user_send WHERE m.id = $1", [id], function(error, result){
        if(result.rows[0].time_read == null){
          client.query("UPDATE messages SET time_read = $1 WHERE id = $2", [new Date(), id]);
        }
        callback(result);
      });
    });
  },

  messages_sent: function(callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT m.*, u.name FROM messages m join users u on u.id = m.user_recipient WHERE user_send = $1 ORDER BY time_send DESC",[session.user.id], function(error, result){
          callback(result);
        });
      });
  },

}
module.exports = messages;
