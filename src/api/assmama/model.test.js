import { Assmama } from '.'
import { User } from '../user'

let user, assmama

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  assmama = await Assmama.create({ user, ass: 'test', tits: 'test', balls: 'test', steel: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = assmama.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(assmama.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.ass).toBe(assmama.ass)
    expect(view.tits).toBe(assmama.tits)
    expect(view.balls).toBe(assmama.balls)
    expect(view.steel).toBe(assmama.steel)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = assmama.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(assmama.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.ass).toBe(assmama.ass)
    expect(view.tits).toBe(assmama.tits)
    expect(view.balls).toBe(assmama.balls)
    expect(view.steel).toBe(assmama.steel)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
