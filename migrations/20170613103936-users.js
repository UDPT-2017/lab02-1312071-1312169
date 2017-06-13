'use strict';

exports.up = function (db) {
  return db.createTable('users', {
    id: {
      type: 'int',
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: 'string'
    },
    email: {
      allowNull: false,
      ttype: 'string'
    },
    password: {
      allowNull: false,
      type: 'string'
    },
    phone: {
      allowNull: false,
      type: 'string'
    }
  });
};

exports.down = function (db) {
  return db.dropTable('users');
};
