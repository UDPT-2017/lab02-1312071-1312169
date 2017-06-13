'use strict';

module.exports = {
  up: function(db) {
    return db.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: 'int'
      },
      user_send: {
        allowNull: false,
        type: 'int'
      },
      user_recipient: {
        allowNull: false,
        type: 'int'
      },
      title: {
        allowNull: false,
        type: 'string'
      },
      content: {
        allowNull: false,
        type: 'string'
      },
      time_send: {
        allowNull: false,
        type: 'timestamp'
      },
      time_read: {
        allowNull: false,
        type: 'timestamp'
      }
    });
  },
  down: function(db) {
    return db.dropTable('messages');
  }
};
