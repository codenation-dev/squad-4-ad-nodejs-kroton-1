const Sequelize = require('sequelize')
const path = require('path')
const config = require('../config/config')

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    ...config.db,
    dialect: 'mysql'
  }
)

const users = sequelize.import(
  path.join(__dirname, 'users.js')
)

const logs = sequelize.import(
  path.join(__dirname, 'logs.js')
)

const db = {}

db[users.name] = users
db[logs.name] = logs

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
