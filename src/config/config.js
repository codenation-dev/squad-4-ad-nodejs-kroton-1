const { NODE_ENV = 'development' } = process.env
require('dotenv').config()

module.exports = {
  db: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : `node_logs_${NODE_ENV}`,
  },
  env: NODE_ENV
}
