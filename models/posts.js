'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    date: DataTypes.DATE
  }, {});
  posts.associate = function(models) {
    // associations can be defined here
  };
  return posts;
};