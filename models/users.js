'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    group_id: DataTypes.INTEGER,
    admin: DataTypes.BOOLEAN
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};