import * as assert from 'assert'
import { withTimeout } from '../src/TaskEither/withTimeout'
import { delay } from 'fp-ts/lib/Task'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import { right, left } from 'fp-ts/lib/Either'

describe('TaskEither', () => {
  describe('withTimeout', () => {
    it('should return successfully within the timeout', async () => {
      const t = withTimeout(new TaskEither(delay(10, right('value'))), right('fallback'), 50)
      const e = await t.run()
      assert.deepStrictEqual(e, right('value'))
    })

    it('should return the fallback value on timeout', async () => {
      const t = withTimeout(new TaskEither(delay(50, right('value'))), left('timeout'), 10)
      const e = await t.run()
      assert.deepStrictEqual(e, left('timeout'))
    })
  })
})
