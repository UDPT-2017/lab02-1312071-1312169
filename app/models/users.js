var pg = require('pg');
var connect = "postgres://postgres@localhost:5432/messages";

var users = {
  signup: function(user, callback){
    try{
      pg.connect(connect, function(err, client, done){
        client.query("INSERT INTO users(name, email, password, phone) VALUES ($1, $2, $3, $4)",
          [user.name, user.email, user.password, user.phone], function(error, result){
            callback(error);
          });
        });
    }catch(error)
    {
      callback(error);
    }
  },
  findOneUser: function(email, callback){
    pg.connect(connect, function(err, client, done){
      client.query("SELECT * FROM users WHERE email = $1", [email], function(error, result){
        callback(result);
      });
    })
  },
  listAllUser: function(callback){
    pg.connect(connect, function(err, client, done){
      client.query("SELECT * FROM users WHERE id <> $1 and id not in (SELECT friend_id from friends WHERE user_id = $2)", [session.user.id, session.user.id], function(err,result){
        callback(result);
      });
    });
  },
  listFriend: function(callback){
    pg.connect(connect, function(err, client, done){
      client.query("SELECT u.id, u.name, u.email FROM friends f join users u on u.id = f.friend_id WHERE f.user_id = $1", [session.user.id], function(err, result){
        callback(result);
      });
    });
  }
}
module.exports = users;
