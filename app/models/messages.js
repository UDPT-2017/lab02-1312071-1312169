var pg = require('pg');
var connect = "postgres://postgres@localhost:5432/messages";

var messages = {
  allMessages: function(callback){
    try{
      pg.connect(connect, function(err, client, done){
        client.query("SELECT * FROM messages WHERE user_recipient = $1 AND user_send ORDER BY time_send DESC",[session.user.id], function(error, result){
          callback(result);
        });
      });
    }catch(error)
    {
      callback(error);
    }
  }
}
module.exports = messages;
