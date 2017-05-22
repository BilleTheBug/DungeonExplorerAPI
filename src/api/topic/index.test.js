import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Topic } from '.'

const app = () => express(routes)

let userSession, anotherSession, topic

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  topic = await Topic.create({ user })
})

test('POST /topics 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, id: 'test', title: 'test', topicType: 'test', timeStamp: 'test', content: 'test', parent: 'test', subTopics: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.topicType).toEqual('test')
  expect(body.timeStamp).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.parent).toEqual('test')
  expect(body.subTopics).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /topics 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /topics 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /topics/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${topic.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(topic.id)
})

test('GET /topics/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /topics/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${topic.id}`)
    .send({ access_token: userSession, id: 'test', title: 'test', topicType: 'test', timeStamp: 'test', content: 'test', parent: 'test', subTopics: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(topic.id)
  expect(body.id).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.topicType).toEqual('test')
  expect(body.timeStamp).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.parent).toEqual('test')
  expect(body.subTopics).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /topics/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${topic.id}`)
    .send({ access_token: anotherSession, id: 'test', title: 'test', topicType: 'test', timeStamp: 'test', content: 'test', parent: 'test', subTopics: 'test' })
  expect(status).toBe(401)
})

test('PUT /topics/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${topic.id}`)
  expect(status).toBe(401)
})

test('PUT /topics/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, id: 'test', title: 'test', topicType: 'test', timeStamp: 'test', content: 'test', parent: 'test', subTopics: 'test' })
  expect(status).toBe(404)
})

test('DELETE /topics/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${topic.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /topics/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${topic.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /topics/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${topic.id}`)
  expect(status).toBe(401)
})

test('DELETE /topics/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
