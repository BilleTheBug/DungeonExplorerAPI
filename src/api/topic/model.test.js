import { Topic } from '.'
import { User } from '../user'

let user, topic

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  topic = await Topic.create({ user, id: 'test', title: 'test', topicType: 'test', timeStamp: 'test', content: 'test', parent: 'test', subTopics: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = topic.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(topic.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.id).toBe(topic.id)
    expect(view.title).toBe(topic.title)
    expect(view.topicType).toBe(topic.topicType)
    expect(view.timeStamp).toBe(topic.timeStamp)
    expect(view.content).toBe(topic.content)
    expect(view.parent).toBe(topic.parent)
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
    expect(view.id).toBe(topic.id)
    expect(view.title).toBe(topic.title)
    expect(view.topicType).toBe(topic.topicType)
    expect(view.timeStamp).toBe(topic.timeStamp)
    expect(view.content).toBe(topic.content)
    expect(view.parent).toBe(topic.parent)
    expect(view.subTopics).toBe(topic.subTopics)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
