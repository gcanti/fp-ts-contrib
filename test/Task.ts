import { withTimeout } from '../src/Task/withTimeout'
import { delay } from 'fp-ts/lib/Task'

describe('Task', () => {
  describe('withTimeout', () => {
    it('should return successfully withing the timeout', () => {
      const t = withTimeout(delay(100, 'value'), 'fallback', 500)
      return t.run().then(v => expect(v).toEqual('value'))
    })

    it('should return the fallback value on timeout', () => {
      const t = withTimeout(delay(500, 'value'), 'fallback', 100)
      return t.run().then(v => expect(v).toEqual('fallback'))
    })
  })
})
