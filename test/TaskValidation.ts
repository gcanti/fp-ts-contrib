import * as assert from 'assert'
import { TaskValidation, taskValidation, getApplicative, withTimeout } from '../src/TaskValidation'
import { delay, Task } from 'fp-ts/lib/Task'
import { success, failure } from 'fp-ts/lib/Validation'
import { getSemigroup, NonEmptyArray, make } from 'fp-ts/lib/NonEmptyArray2v'

describe('TaskValidation', () => {
  const taskValidationNelApplicative = getApplicative(getSemigroup<string>())

  it('map', async () => {
    const double = (n: number): number => n * 2
    const e = await taskValidation.map(taskValidationNelApplicative.of(1), double).value.run()
    assert.deepStrictEqual(e, success(2))
  })

  it('fold', async () => {
    const f = (s: NonEmptyArray<string>): boolean => s.length < 2
    const g = (n: number): boolean => n > 2
    const te1 = taskValidationNelApplicative.of<number>(1).fold(f, g)
    const te2 = new TaskValidation<NonEmptyArray<string>, number>(
      new Task(() => Promise.resolve(failure(make<string>('failure', []))))
    ).fold(f, g)
    const b1 = await te1.run()
    const b2 = await te2.run()
    assert.deepStrictEqual(b1, false)
    assert.deepStrictEqual(b2, true)
  })

  describe('withTimeout', () => {
    it('should return successfully within the timeout', async () => {
      const t = withTimeout(new TaskValidation(delay(10, success('value'))), failure('fallback'), 50)
      const v = await t.value.run()
      assert.deepStrictEqual(v, success('value'))
    })

    it('should return the fallback value on timeout', async () => {
      const t = withTimeout(new TaskValidation(delay(50, success('value'))), failure('fallback'), 10)
      const v = await t.value.run()
      assert.deepStrictEqual(v, failure('fallback'))
    })
  })

  describe('getApplicative', () => {
    it('ap', async () => {
      const double = (n: number): number => n * 2
      const mab = taskValidationNelApplicative.of(double)
      const ma = taskValidationNelApplicative.of(1)
      const s = await taskValidationNelApplicative.ap(mab, ma).value.run()
      assert.deepStrictEqual(s, success(2))
    })
  })
})
