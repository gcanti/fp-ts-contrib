import * as assert from 'assert'
import { Either, left, right } from 'fp-ts/lib/Either'
import { delay, of } from 'fp-ts/lib/Task'
import { withTimeout } from '../../src/Task/withTimeout'

describe('withTimeout', () => {
  describe('Task', () => {
    it('should return successfully withing the timeout', async () => {
      const ma2 = withTimeout('fallback', 50)(delay(10)(of('value')))
      const s = await ma2()
      assert.strictEqual(s, 'value')
    })

    it('should return the fallback value on timeout', async () => {
      const ma2 = withTimeout('fallback', 10)(delay(50)(of('value')))
      const s = await ma2()
      assert.strictEqual(s, 'fallback')
    })
  })

  describe('TaskEither', () => {
    it('should return successfully within the timeout', async () => {
      const ma2 = withTimeout(right('fallback'), 50)(delay(10)(of(right('value'))))
      const e = await ma2()
      assert.deepStrictEqual(e, right('value'))
    })

    it('should return the fallback value on timeout', async () => {
      const fallback: Either<string, string> = left('timeout')
      const ma2 = withTimeout(fallback, 10)(delay(50)(of(right('value'))))
      const e = await ma2()
      assert.deepStrictEqual(e, left('timeout'))
    })
  })
})
