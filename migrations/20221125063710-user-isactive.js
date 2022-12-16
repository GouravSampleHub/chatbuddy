'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('users','isactive',Sequelize.BOOLEAN),
      queryInterface.addColumn('users','otp',Sequelize.INTEGER),
    ]
  },

  async down (queryInterface, Sequelize) {
   
  }
};
