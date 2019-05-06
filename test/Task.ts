import * as assert from 'assert'
import { withTimeout } from '../src/Task/withTimeout'
import { delay } from 'fp-ts/lib/Task'

describe('Task', () => {
  describe('withTimeout', () => {
    it('should return successfully withing the timeout', async () => {
      const t = withTimeout(delay(10, 'value'), 'fallback', 50)
      const v = await t.run()
      assert.strictEqual(v, 'value')
    })

    it('should return the fallback value on timeout', async () => {
      const t = withTimeout(delay(50, 'value'), 'fallback', 10)
      const v = await t.run()
      assert.strictEqual(v, 'fallback')
    })
  })
})
