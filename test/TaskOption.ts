import { TaskOption, taskOption, none as taskOptionNone, fromOption, fromTask, tryCatch } from '../src/TaskOption'
import { delay, Task } from 'fp-ts/lib/Task'
import { some, none } from 'fp-ts/lib/Option'

describe('TaskOption', () => {
  it('map', () => {
    const double = (n: number): number => n * 2
    return taskOption
      .map(taskOption.of(1), double)
      .run()
      .then(e => expect(e).toEqual(some(2)))
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = taskOption.of(double)
    const fa = taskOption.of(1)
    return Promise.all([fa.ap(fab).run(), fab.ap_(fa).run(), taskOption.ap(fab, fa).run()]).then(([e1, e2, e3]) => {
      expect(e1).toEqual(some(2))
      expect(e1).toEqual(e2)
      expect(e1).toEqual(e3)
    })
  })

  it('chain', () => {
    const te1 = taskOption.chain(taskOption.of('foo'), a => (a.length > 2 ? taskOption.of(a.length) : taskOptionNone))
    const te2 = taskOption.chain(taskOption.of<string>('a'), a =>
      a.length > 2 ? taskOption.of(a.length) : taskOptionNone
    )
    return Promise.all([te1.run(), te2.run()]).then(([e1, e2]) => {
      expect(e1).toEqual(some(3))
      expect(e2).toEqual(none)
    })
  })

  it('fold', () => {
    const g = (n: number): boolean => n > 2
    const te1 = taskOption.of<number>(1).fold(false, g)
    const te2 = taskOptionNone.fold(true, g)
    return Promise.all([te1.run(), te2.run()]).then(([b1, b2]) => {
      expect(b1).toEqual(false)
      expect(b2).toEqual(true)
    })
  })

  it('getOrElse', () => {
    const v: number = 42
    const te1 = taskOption.of<number>(1).getOrElse(v)
    const te2 = fromOption<number>(none).getOrElse(v)
    return Promise.all([te1.run(), te2.run()]).then(([b1, b2]) => {
      expect(b1).toEqual(1)
      expect(b2).toEqual(42)
    })
  })

  it('fromTask', () => {
    const to1 = fromTask(new Task(() => Promise.resolve(none)))
    return Promise.all([to1.run, taskOptionNone.run]).then(([b1, b2]) => {
      expect(b1).toEqual(b2)
    })
  })

  it('tryCatch', () => {
    const to1 = tryCatch(() => Promise.reject())
    return to1.run().then(b1 => expect(b1).toEqual(none))
  })

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
