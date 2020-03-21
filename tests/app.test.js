const request = require('supertest')
const server = require('../src/app')
const db = require('../src/models')

let token

/* beforeAll(async () => {
  await db.sequelize.query('DROP TABLE IF EXISTS users;')
  await db.sequelize.query('DROP TABLE IF EXISTS logs;')
  await db.sequelize.sync()
}) */

beforeAll(async () => {
  await request(server)
  .post('/v1/auth/login')
  .send({
    user: "raul",
    password: "code123"
  })
  .end((err, response) => {
    token = response.body.token; // save the token!
    done()
  })
})


/* afterAll(async () => {
  await db.sequelize.query('DROP TABLE IF EXISTS users;')
  await db.sequelize.query('DROP TABLE IF EXISTS logs;')
  await db.sequelize.close()
}) */

describe('The API on /v1/users Endpoint at GET method should...', () => {
  
/*     afterEach(async () => {
      await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
      await db.sequelize.query('TRUNCATE TABLE users;')
      await db.sequelize.query('TRUNCATE TABLE books;')
      await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
    }) */ 
  
    test(`return 401 as status code and error message`, async () => {
      expect.assertions(2)
  
      const res = await request(server)
        .get('/v1/users')
        
      expect(res.statusCode).toEqual(401)
      expect(res.body).toBe({"message": "Not authorized to access this resource"})
    })
  })