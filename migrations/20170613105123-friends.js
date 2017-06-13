'use strict';

module.exports = {
  up: function(db) {
    return db.createTable('friends', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: 'int'
      },
      user_id: {
        allowNull: false,
        type: 'int'
      },
      friend_id: {
        allowNull: false,
        type: 'int'
      }
    });
  },
  down: function(db) {
    return db.dropTable('friends');
  }
};


