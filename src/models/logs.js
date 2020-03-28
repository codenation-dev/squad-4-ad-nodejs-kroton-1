module.exports = (sequelize, DataTypes) =>
  sequelize.define('logs', {
    descripition: {
      type: DataTypes.STRING,
      allowNull: false
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
      type: DataTypes.INTEGER
    }
  })
