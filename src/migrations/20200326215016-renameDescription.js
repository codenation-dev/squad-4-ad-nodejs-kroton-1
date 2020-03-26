'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
    Promise.all([
      queryInterface.renameColumn('logs','description','descripition')
    ]),

  down: (queryInterface, Sequelize) =>  Promise.all([
    queryInterface.renameColumn('logs','description','descripition')
  ])
};
