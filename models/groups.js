'use strict';
module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define('groups', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    member_count: DataTypes.INTEGER,
    logo_link: DataTypes.STRING,
    group_image: DataTypes.STRING,
    creation_date: DataTypes.DATE,
    activity_id: DataTypes.INTEGER
  }, {});
  groups.associate = function(models) {
    // associations can be defined here
  };
  return groups;
};