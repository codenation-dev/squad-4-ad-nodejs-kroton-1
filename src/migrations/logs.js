module.exports = {
  up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('logs', {
            //Atributo id é criado pelo sequelize
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: DataTypes.INTEGER
            },
            

            //Colocar os atributos da tabela 'logs'


            //Atributo createdAt é criado pelo sequelize
            createdAt: {
              allowNull: false,
              type: DataTypes.DATE
            },
            //Atributo updatedAt é criado pelo sequelize
            updatedAt: {
              allowNull: false,
              type: DataTypes.DATE
            }
      })
  },
  down: queryInterface => queryInterface.dropTable('logs')
}