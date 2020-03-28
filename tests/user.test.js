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
})

afterAll(async () => {
  await db.sequelize.query('DROP TABLE IF EXISTS users;')
  await db.sequelize.query('DROP TABLE IF EXISTS logs;')
  await db.sequelize.close()
})


describe('The API on /v1/users Endpoint at GET method should...', () => {
  beforeAll(async () => {
    await request(server.app).post('/v1/sinup').send({
      name: 'Raul Rory',
      username: 'RRory',
      email: 'raul@io.com.br',
      password: 'Code123'
    })
  })

  test('return 401 as status code and error message', async () => {
    expect.assertions(2)

    const res = await request(server.app)
      .get('/v1/users')

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
      .get('/v1/users')
      .set('x-auth-token', `${token}`)

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject([
      'total',
      'data'
    ])
  })
})

describe('The API on /v1/users/:usersId Endpoint at GET method should...', () => {
  test('return 200 as status code and a database user', async () => {
    expect.assertions(2)

    const validToken = await request(server.app).post('/v1/auth/login').send({
      email: 'raul@io.com.br',
      password: 'Code123'
    })

    token = validToken.body.token

    const res = await request(server.app)
      .get('/v1/users')
      .set('x-auth-token', `${token}`)

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject([
      'total',
      'data'
    ])
  })
  test('return a database user', async () => {
    expect.assertions(2)

    const validToken = await request(server.app).post('/v1/auth/login').send({
      email: 'raul@io.com.br',
      password: 'Code123'
    })

    token = validToken.body.token

    const res = await request(server.app)
      .get('/v1/users')
      .set('x-auth-token', `${token}`)

    expect(res.body.total).toEqual(2)
    expect(typeof res.body.data).toBe('object')
  })
})

describe('The API on /v1/users Endpoint at POST method should...', () => {
  beforeAll(async () => {
    await request(server.app).post('/v1/sinup').send({
      name: 'Teste',
      username: 'codenation',
      email: 'codeteste@io.com.br',
      password: 'Teste@123'
    })
  })
  test('return 201 as status code and a massage for user', async () => {
    expect.assertions(2)

    const validToken = await request(server.app).post('/v1/auth/login').send({
      email: 'rauladmin@io.com.br',
      password: 'Code123'
    })

    token = validToken.body.token

    const res = await request(server.app)
      .post('/v1/users')
      .set('x-auth-token', `${token}`)
      .send({
        name: 'Marcio Bot',
        username: 'Mb',
        password: 'Codenation28',
        email: 'marcio28@io.com.br',
        isAdmin: 0
      })

    expect(res.statusCode).toEqual(201)
    expect(res.body).toStrictEqual({ message: 'User successfully registered' })
  })

  test('return 401 as status code and a massage for user', async () => {
    expect.assertions(2)

    const validToken = await request(server.app).post('/v1/auth/login').send({
      email: 'codeteste@io.com.br',
      password: 'Teste@123'
    })

    token = validToken.body.token

    const res = await request(server.app)
      .post('/v1/users')
      .set('x-auth-token', `${token}`)
      .send({
        name: 'Marcio Bot',
        username: 'Mb',
        password: 'Codenation28',
        email: 'marcio28@io.com.br'
      })

    expect(res.statusCode).toEqual(401)
    expect(res.body).toStrictEqual({ message: 'Not authorized to access this resource' })
  })
})

describe('The API on /v1/users/:usersId Endpoint at PACTH method should...', () => {
  beforeAll(async () => {
    await request(server.app).post('/v1/sinup').send({
      name: 'Acelera',
      username: 'nationdev',
      email: 'codeve28@io.com.br',
      password: 'm1s3nh@'
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
      .patch('/v1/users/3')
      .set('x-auth-token', `${token}`)
      .send({
        name: 'Patrick',
        username: 'patrick pat',
        password: 'Codenation',
        email: 'patrick@io.com.br',
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toStrictEqual({ message: 'The data sent has been updated successfully' })
  })

  test('return 401 as status code and a massage for user', async () => {
    expect.assertions(2)

    const validToken = await request(server.app).post('/v1/auth/login').send({
      email: 'codeve28@io.com.br',
      password: 'm1s3nh@'
    })

    token = validToken.body.token

    const res = await request(server.app)
      .patch('/v1/users/1')
      .set('x-auth-token', `${token}`)
      .send({
        name: 'Marcio Bot',
        username: 'Mb',
        password: 'Codenation28',
        email: 'marcio28@io.com.br'
      })

    expect(res.statusCode).toEqual(401)
    expect(res.body).toStrictEqual({ message: 'Not authorized to access this resource' })
  })
})

describe('The API on /v1/users/:usersId Endpoint at DELETE method should...', () => {
  beforeAll(async () => {
    await request(server.app).post('/v1/sinup').send({
      name: 'Nation',
      username: 'codenation',
      email: 'natioteste@io.com.br',
      password: 't3st3@@'
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
    .delete('/v1/users/3')
    .set('x-auth-token', `${token}`)

    expect(res.statusCode).toEqual(204)
    expect(res.body).toMatchObject({})
  })

  test('return 401 as status code and a massage for user', async () => {
    expect.assertions(2)

    const validToken = await request(server.app).post('/v1/auth/login').send({
      email: 'natioteste@io.com.br',
      password: 't3st3@@'
    })

    token = validToken.body.token

    const res = await request(server.app)
      .delete('/v1/users/2')
      .set('x-auth-token', `${token}`)

    expect(res.statusCode).toEqual(401)
    expect(res.body).toStrictEqual({ message: 'Not authorized to access this resource' })
  })
})
