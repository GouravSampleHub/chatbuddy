'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('users','gender',Sequelize.STRING),
      queryInterface.addColumn('users','image',Sequelize.STRING),
    ]
  },

  async down (queryInterface, Sequelize) {
    
  }
};
