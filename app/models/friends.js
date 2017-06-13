var pg = require('pg');
var connect = "postgres://postgres@localhost:5432/messages";

var friends = {
  addFriend: function(friend_id, callback){
    try{
      pg.connect(connect, function(err, client, done){
        client.query("Insert into friends(user_id, friend_id) Values($1, $2)", [session.user.id, friend_id], function(err, result){
          callback(err);
        });
      });
    }catch(error)
    {
      callback(error);
    }
  },
  unfriend: function(id, callback){
    try{
      pg.connect(connect, function(err, client, done){
        client.query("Delete From friends Where friend_id = $1 AND user_id = $2", [id, session.user.id], function(err, result){
          callback(err);
        });
      });
    }catch(error)
    {
      callback(error);
    }
  }
}
module.exports = friends;
