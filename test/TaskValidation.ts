import { TaskValidation, taskValidation, getApplicative } from '../src/TaskValidation'
import { delay, Task } from 'fp-ts/lib/Task'
import { success, failure } from 'fp-ts/lib/Validation'
import { getSemigroup, NonEmptyArray, make } from 'fp-ts/lib/NonEmptyArray2v'

describe('TaskValidation', () => {
  const taskValidationNelApplicative = getApplicative(getSemigroup<string>())

  it('map', () => {
    const double = (n: number): number => n * 2
    return taskValidation
      .map(taskValidationNelApplicative.of(1), double)
      .value.run()
      .then(e => expect(e).toEqual(success(2)))
  })

  it('fold', () => {
    const f = (s: NonEmptyArray<string>): boolean => s.length < 2
    const g = (n: number): boolean => n > 2
    const te1 = taskValidationNelApplicative.of<number>(1).fold(f, g)
    const te2 = new TaskValidation<NonEmptyArray<string>, number>(
      new Task(() => Promise.resolve(failure(make<string>('failure', []))))
    ).fold(f, g)
    return Promise.all([te1.run(), te2.run()]).then(([b1, b2]) => {
      expect(b1).toEqual(false)
      expect(b2).toEqual(true)
    })
  })

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

  describe('getApplicative', () => {
    it('ap', () => {
      const double = (n: number): number => n * 2
      const fa = taskValidationNelApplicative.of(1)
      const fab = taskValidationNelApplicative.of(double)
      return taskValidationNelApplicative
        .ap(fab, fa)
        .value.run()
        .then(e1 => {
          expect(e1).toEqual(success(2))
        })
    })
  })
})
