const { NODE_ENV = 'test' } = process.env

const request = require('supertest')
const server = require('../src/app')
const db = require('../src/models')
const query = require('./util/userAdmin')

let token = {} // variable used in all tests

beforeAll(async () => {

  await db.sequelize.query('DROP TABLE IF EXISTS users;')
  await db.sequelize.query('DROP TABLE IF EXISTS logs;')
  await db.sequelize.sync()
  await query.createUser()
  await request(server.app).post('/v1/sinup').send({
    name: 'Raul Rory',
    username: 'RRory',
    email: 'raul@io.com.br',
    password: 'Code123'
  })
  await request(server.app).post('/v1/logs').send({
    "descripition": "Erro Error",
    "type": "ERROR",
    "origin": "API",
    "statusCode": 403
  })
})

afterAll(async () => {
  await db.sequelize.query('DROP TABLE IF EXISTS users;')
  await db.sequelize.query('DROP TABLE IF EXISTS logs;')
  await db.sequelize.close()
})

describe('The API on /v1/logs Endpoint at GET method should...', () => {  
    test('return 401 as status code and error message', async () => {
      expect.assertions(2)
  
      const res = await request(server.app)
        .get('/v1/logs')
  
      expect(res.statusCode).toEqual(401)
      expect(res.body).toStrictEqual({ message: 'Token not found!' })
    })
  
    test('return 200 as status code and database users', async () => {
      expect.assertions(2)
  
      const validToken = await request(server.app).post('/v1/auth/login').send({
        email: 'raul@io.com.br',
        password: 'Code123'
      })
  
      token = validToken.body.token
  
      const res = await request(server.app)
        .get('/v1/logs?limit=1&skip=1')
        .set('x-auth-token', `${token}`)
  
      expect(res.statusCode).toEqual(200)
      expect(Object.keys(res.body)).toMatchObject([
        "pageCount",
        "data",
      ])
    })
  })

describe('The API on /v1/users/:logId Endpoint at GET method should...', () => {
    test('return 200 as status code and a database user', async () => {
      expect.assertions(2)
  
      const validToken = await request(server.app).post('/v1/auth/login').send({
        email: 'raul@io.com.br',
        password: 'Code123'
      })
  
      token = validToken.body.token
  
      const res = await request(server.app)
        .get('/v1/logs/1')
        .set('x-auth-token', `${token}`)
  
      expect(res.statusCode).toEqual(200)
      expect(Object.keys(res.body)).toMatchObject([
        'data'
      ])
    })
    test('return a database user', async () => {
      expect.assertions(1)
  
      const validToken = await request(server.app).post('/v1/auth/login').send({
        email: 'raul@io.com.br',
        password: 'Code123'
      })
  
      token = validToken.body.token
  
      const res = await request(server.app)
        .get('/v1/logs/1')
        .set('x-auth-token', `${token}`)
  
      expect(typeof res.body.data).toBe('object')
    })
  })

describe('The API on /v1/users/:logsId Endpoint at PACTH method should...', () => {
    beforeAll( async () => {
        await request(server.app).post('/v1/logs').send({
            "descripition": "Bug Bug",
            "type": "ERROR",
            "origin": "localhost",
            "statusCode": 403
        })
    })
    test('return 200 as status code and a massage for user', async () => {
      expect.assertions(2)
  
      const validToken = await request(server.app).post('/v1/auth/login').send({
        email: 'rauladmin@io.com.br',
        password: 'Code123'
      })
  
      token = validToken.body.token
  
      const res = await request(server.app)
        .patch('/v1/logs/2')
        .set('x-auth-token', `${token}`)
        .send({
            "type": "ERROR",
            "origin": "API DEV",
        })
  
      expect(res.statusCode).toEqual(200)
      expect(res.body).toStrictEqual({ message: 'The data sent has been updated successfully' })
    })
  
    test('return 401 as status code and a massage for user', async () => {
      expect.assertions(2)
  
      const validToken = await request(server.app).post('/v1/auth/login').send({
        email: 'raul@io.com.br',
        password: 'Code123'
      })
  
      token = validToken.body.token
  
      const res = await request(server.app)
        .patch('/v1/logs/1')
        .set('x-auth-token', `${token}`)
        .send({
            "type": "ERROR",
            "origin": "API DEV",
        })
  
      expect(res.statusCode).toEqual(401)
      expect(res.body).toStrictEqual({ message: 'Not authorized to access this resource' })
    })
  })

describe('The API on /v1/users Endpoint at POST method should...', () => {
    test('return 201 as status code and a massage for user', async () => {
        expect.assertions(2)
    
        const validToken = await request(server.app).post('/v1/auth/login').send({
          email: 'rauladmin@io.com.br',
          password: 'Code123'
        })
    
        token = validToken.body.token
    
        const res = await request(server.app)
          .post('/v1/logs')
          .set('x-auth-token', `${token}`)
          .send({
            "descripition": "Erro Error",
            "type": "ERROR",
            "origin": "API",
            "statusCode": 403
           })
    
        expect(res.statusCode).toEqual(201)
        expect(res.body).toStrictEqual({ message: 'Logs saved to database successfully' })
      })
})
describe('The API on /v1/users/:logId Endpoint at DELETE method should...', () => {
    beforeAll( async () => {
        await request(server.app).post('/v1/logs').send({
            "descripition": "WarBusg",
            "type": "BUG",
            "origin": "development",
            "statusCode": 404
        })
    })
    test('return 204 as status code and a massage for user', async () => {
      expect.assertions(2)
  
      const validToken = await request(server.app).post('/v1/auth/login').send({
        email: 'rauladmin@io.com.br',
        password: 'Code123'
      })
  
      token = validToken.body.token
  
      const res = await request(server.app)
      .delete('/v1/logs/2')
      .set('x-auth-token', `${token}`)
  
      expect(res.statusCode).toEqual(204)
      expect(res.body).toMatchObject({})
    })
  
    test('return 401 as status code and a massage for user', async () => {
      expect.assertions(2)
  
      const validToken = await request(server.app).post('/v1/auth/login').send({
        email: 'raul@io.com.br',
        password: 'Code123'
      })
  
      token = validToken.body.token
  
      const res = await request(server.app)
        .delete('/v1/users/2')
        .set('x-auth-token', `${token}`)
  
      expect(res.statusCode).toEqual(401)
      expect(res.body).toStrictEqual({ message: 'Not authorized to access this resource' })
    })
  })
  
 