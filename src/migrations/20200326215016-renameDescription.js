'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
    Promise.all([
      queryInterface.renameColumn('logs','descripition','description')
    ]),

  down: (queryInterface, Sequelize) =>  Promise.all([
    queryInterface.renameColumn('logs','description','descripition')
  ])
};
