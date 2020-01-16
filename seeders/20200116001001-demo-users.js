'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('users', [

      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@unidentified.com',
        gender: 'M',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane@unidentified.com',
        gender: 'F',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        first_name: 'Moe',
        last_name: 'Joe',
        email: 'moe@unidentified.com',
        gender: 'M',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        first_name: 'Flo',
        last_name: 'Joe',
        email: 'flo@unidentified.com',
        gender: 'F',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        first_name: 'Mark',
        last_name: 'Twain',
        email: 'mark@unidentified.com',
        gender: 'M',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        first_name: 'Jeffie',
        last_name: 'Smith',
        email: 'jeff@unidentified.com',
        gender: 'M',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        first_name: 'Alice',
        last_name: 'Wonderland',
        email: 'alice@unidentified.com',
        gender: 'F',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        first_name: 'James',
        last_name: 'Crockett',
        email: 'sonny@unidentified.com',
        gender: 'M',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        first_name: 'Diane',
        last_name: 'Riesling',
        email: 'dr@unidentified.com',
        gender: 'F',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        first_name: 'Ricardo',
        last_name: 'Tubbs',
        email: 'rico@unidentified.com',
        gender: 'M',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ]);

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('users', null, {});

  }

};
