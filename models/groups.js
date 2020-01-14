'use strict';
module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define('groups', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  // groups.associate = function(models) {
  //   // associations can be defined here
  // };
  return groups;
};