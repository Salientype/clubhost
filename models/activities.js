'use strict';
module.exports = (sequelize, DataTypes) => {
  const activities = sequelize.define('activities', {
    group_id: DataTypes.INTEGER,
    // date: DataTypes.DATE,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    // is_private: DataTypes.BOOLEAN,
    fee: DataTypes.INTEGER
  }, {});
  activities.associate = function(models) {
    // associations can be defined here
  };
  return activities;
};