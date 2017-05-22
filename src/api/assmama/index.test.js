import request from 'supertest-as-promised'
import { masterKey } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Assmama } from '.'

const app = () => express(routes)

let userSession, adminSession, assmama

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  assmama = await Assmama.create({ user })
})

test('POST /assmamas 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, ass: 'test', tits: 'test', balls: 'test', steel: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.ass).toEqual('test')
  expect(body.tits).toEqual('test')
  expect(body.balls).toEqual('test')
  expect(body.steel).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /assmamas 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /assmamas 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /assmamas/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${assmama.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(assmama.id)
})

test('GET /assmamas/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /assmamas/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`/${assmama.id}`)
    .send({ access_token: adminSession, ass: 'test', tits: 'test', balls: 'test', steel: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(assmama.id)
  expect(body.ass).toEqual('test')
  expect(body.tits).toEqual('test')
  expect(body.balls).toEqual('test')
  expect(body.steel).toEqual('test')
})

test('PUT /assmamas/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`/${assmama.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /assmamas/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${assmama.id}`)
  expect(status).toBe(401)
})

test('PUT /assmamas/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: adminSession, ass: 'test', tits: 'test', balls: 'test', steel: 'test' })
  expect(status).toBe(404)
})

test('DELETE /assmamas/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`/${assmama.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /assmamas/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`/${assmama.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /assmamas/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${assmama.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /assmamas/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${assmama.id}`)
  expect(status).toBe(401)
})

test('DELETE /assmamas/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
