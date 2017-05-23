import { Topic } from '.'
import { User } from '../user'

let user, topic

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  topic = await Topic.create({ user, title: 'test', message: 'test', imageUrl: 'test', topicType: 'test', subTopics: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = topic.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(topic.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(topic.title)
    expect(view.message).toBe(topic.message)
    expect(view.imageUrl).toBe(topic.imageUrl)
    expect(view.topicType).toBe(topic.topicType)
    expect(view.subTopics).toBe(topic.subTopics)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = topic.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(topic.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(topic.title)
    expect(view.message).toBe(topic.message)
    expect(view.imageUrl).toBe(topic.imageUrl)
    expect(view.topicType).toBe(topic.topicType)
    expect(view.subTopics).toBe(topic.subTopics)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
