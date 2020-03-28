const db = require('../../src/models').users

Admin = {}

const User = {
    name: 'Usuário Admin',
    username: 'Rory',
    password: 'rmv9VHnB10yNxrJDbV+o/A==:q/1ERBFtDhAQ4XAcUNdiuA==',
    email: 'rauladmin@io.com.br',
    isAdmin: true,
  }

  Admin.createUser = async () => {
    await db.create(User)
}


module.exports = Admin