'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
  
    {
      
    return queryInterface.bulkInsert('groups', [
    
      {
        
        name: 'The Lost Boys',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        category: 'Supernatural',
        member_count: 0,
        creation_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        
        name: 'Urban Ninjas',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        category: 'Martial Arts',
        member_count: 0,
        creation_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        
        name: 'Craft Beer Headz',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        category: 'Food & Bevarage',
        member_count: 0,
        creation_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        
        name: 'Drawing Club',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        category: 'Arts',
        member_count: 0,
        creation_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        
        name: 'Scuba Club',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        category: 'Recreation',
        member_count: 0,
        creation_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()

      },
  
    ]);

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('groups', null, {});

  }

};
