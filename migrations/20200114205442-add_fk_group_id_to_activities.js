'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('activities', ['group_id'], {
      type: 'foreign key',
      name: 'group_id_fk',
      references: { //Required field
        table: 'groups',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('activities', ['group_id'], {
      type: 'foreign key',
      name: 'group_id_fk',
      references: { //Required field
        table: 'groups',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  }
};

