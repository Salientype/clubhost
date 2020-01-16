'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
  
    {
      
    return queryInterface.bulkInsert('posts', [
    
      {
        
        group_id: 1,
        user_id: 8,
        title: 'A long story',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor. Turpis massa tincidunt dui ut ornare lectus. Est ullamcorper eget nulla facilisi. Viverra tellus in hac habitasse platea dictumst. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit. Mattis vulputate enim nulla aliquet porttitor lacus. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Suscipit tellus mauris a diam maecenas sed enim ut. Semper risus in hendrerit gravida rutrum quisque. Faucibus turpis in eu mi. Nunc sed id semper risus in hendrerit.',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        
        group_id: 2,
        user_id: 2,
        title: 'A short story',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor. Turpis massa tincidunt dui ut ornare lectus. Est ullamcorper eget nulla facilisi. Viverra tellus in hac habitasse platea dictumst. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit. Mattis vulputate enim nulla aliquet porttitor lacus. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Suscipit tellus mauris a diam maecenas sed enim ut. Semper risus in hendrerit gravida rutrum quisque. Faucibus turpis in eu mi. Nunc sed id semper risus in hendrerit.',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        
        group_id: 3,
        user_id: 3,
        title: 'A boring story',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor. Turpis massa tincidunt dui ut ornare lectus. Est ullamcorper eget nulla facilisi. Viverra tellus in hac habitasse platea dictumst. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit. Mattis vulputate enim nulla aliquet porttitor lacus. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Suscipit tellus mauris a diam maecenas sed enim ut. Semper risus in hendrerit gravida rutrum quisque. Faucibus turpis in eu mi. Nunc sed id semper risus in hendrerit.',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        
        group_id: 4,
        user_id: 4,
        title: 'A funny story',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor. Turpis massa tincidunt dui ut ornare lectus. Est ullamcorper eget nulla facilisi. Viverra tellus in hac habitasse platea dictumst. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit. Mattis vulputate enim nulla aliquet porttitor lacus. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Suscipit tellus mauris a diam maecenas sed enim ut. Semper risus in hendrerit gravida rutrum quisque. Faucibus turpis in eu mi. Nunc sed id semper risus in hendrerit.',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        
        group_id: 5,
        user_id: 5,
        title: 'An aligator tale',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor. Turpis massa tincidunt dui ut ornare lectus. Est ullamcorper eget nulla facilisi. Viverra tellus in hac habitasse platea dictumst. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit. Mattis vulputate enim nulla aliquet porttitor lacus. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Suscipit tellus mauris a diam maecenas sed enim ut. Semper risus in hendrerit gravida rutrum quisque. Faucibus turpis in eu mi. Nunc sed id semper risus in hendrerit.',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()

      },
  
    ]);

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('posts', null, {});

  }

};