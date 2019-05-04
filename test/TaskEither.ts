import { withTimeout } from '../src/TaskEither/withTimeout'
import { delay } from 'fp-ts/lib/Task'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import { right, left } from 'fp-ts/lib/Either'

describe('TaskEither', () => {
  describe('withTimeout', () => {
    it('should return successfully within the timeout', () => {
      const t = withTimeout(new TaskEither(delay(100, right('value'))), right('fallback'), 500)
      return t.run().then(v => expect(v).toEqual(right('value')))
    })

    it('should return the fallback value on timeout', () => {
      const t = withTimeout(new TaskEither(delay(500, right('value'))), left(new Error('timeout')), 100)
      return t.run().then(v => expect(v).toEqual(left(new Error('timeout'))))
    })
  })
})
