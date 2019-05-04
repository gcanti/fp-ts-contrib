import { TaskOption } from '../src/TaskOption'
import { delay } from 'fp-ts/lib/Task'
import { some } from 'fp-ts/lib/Option'

describe('TaskOption', () => {
  describe('withTimeout', () => {
    it('should return successfully within the timeout', () => {
      const t = new TaskOption(delay(100, some('value'))).withTimeout(some('fallback'), 500)
      return t.run().then(v => expect(v).toEqual(some('value')))
    })

    it('should return the fallback value on timeout', () => {
      const t = new TaskOption(delay(500, some('value'))).withTimeout(some('fallback'), 100)
      return t.run().then(v => expect(v).toEqual(some('fallback')))
    })
  })
})
