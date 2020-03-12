const Sequelize = require('sequelize')
const path = require('path')
const config = require('../configs')

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password, {
        ...config.db,
        dialect: "mysql"
    }
)

const logs = sequelize.import(
    path.join(__dirname, 'logs.js')
)

const users = sequelize.import(
    path.join(__dirname, 'users.js')
)

//users.hasMany(logs)
//logs.belongsTo(users)

const db = {}

db[logs.name] = logs
db[users.name] = users

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db