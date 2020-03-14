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
            type: {
              type: DataTypes.ENUM('ERROR', 'WARNING', 'BUG'),
              allowNull: false
            },
            origin: {
              type: DataTypes.STRING,
              allowNull: false
            },
            statusCode: {
              type: DataTypes.INTEGER,
            },
            createdAt: {
              allowNull: false,
              type: DataTypes.DATE
            },
            updatedAt: {
              allowNull: false,
              type: DataTypes.DATE
            }
      })
  },
  down: queryInterface => queryInterface.dropTable('logs')
}