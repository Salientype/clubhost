'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
  
    {
      
    return queryInterface.bulkInsert('activities', [
    
      {
        
        group_id: 1,
        date: new Date(),
        title: 'Partytime',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        is_private: false,
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        
        group_id: 3,
        date: new Date(),
        title: 'Dancetime',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        is_private: false,
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        
        group_id: 4,
        date: new Date(),
        title: 'Runtime',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        is_private: false,
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        
        group_id: 2,
        date: new Date(),
        title: 'Meeting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        is_private: false,
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        
        group_id: 5,
        date: new Date(),
        title: 'Hiking Volcano',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        is_private: false,
        createdAt: new Date(),
        updatedAt: new Date()

      },
  
    ]);

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('activities', null, {});

  }

};
