import { TaskValidation } from '../src/TaskValidation'
import { delay } from 'fp-ts/lib/Task'
import { success, failure } from 'fp-ts/lib/Validation'

describe('TaskValidation', () => {
  describe('withTimeout', () => {
    it('should return successfully within the timeout', () => {
      const t = new TaskValidation(delay(100, success('value'))).withTimeout(failure('fallback'), 500)
      return t.value.run().then(v => expect(v).toEqual(success('value')))
    })

    it('should return the fallback value on timeout', () => {
      const t = new TaskValidation(delay(500, success('value'))).withTimeout(failure('fallback'), 100)
      return t.value.run().then(v => expect(v).toEqual(failure('fallback')))
    })
  })
})
