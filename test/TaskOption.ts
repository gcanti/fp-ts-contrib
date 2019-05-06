import * as assert from 'assert'
import { none, some } from 'fp-ts/lib/Option'
import { delay, task } from 'fp-ts/lib/Task'
import {
  fromOption,
  fromTask,
  none as taskOptionNone,
  TaskOption,
  taskOption,
  tryCatch,
  withTimeout
} from '../src/TaskOption'

describe('TaskOption', () => {
  it('map', async () => {
    const double = (n: number): number => n * 2
    const e = await taskOption.map(taskOption.of(1), double).run()
    assert.deepStrictEqual(e, some(2))
  })

  it('ap', async () => {
    const double = (n: number): number => n * 2
    const mab = taskOption.of(double)
    const ma = taskOption.of(1)
    const e1 = await ma.ap(mab).run()
    const e2 = await mab.ap_(ma).run()
    const e3 = await taskOption.ap(mab, ma).run()
    assert.deepStrictEqual(e1, some(2))
    assert.deepStrictEqual(e1, e2)
    assert.deepStrictEqual(e1, e3)
  })

  it('chain', async () => {
    const te1 = taskOption.chain(taskOption.of('foo'), a => (a.length > 2 ? taskOption.of(a.length) : taskOptionNone))
    const te2 = taskOption.chain(taskOption.of<string>('a'), a =>
      a.length > 2 ? taskOption.of(a.length) : taskOptionNone
    )
    const e1 = await te1.run()
    const e2 = await te2.run()
    assert.deepStrictEqual(e1, some(3))
    assert.deepStrictEqual(e2, none)
  })

  it('fold', async () => {
    const g = (n: number): boolean => n > 2
    const te1 = taskOption.of<number>(1).fold(false, g)
    const te2 = taskOptionNone.fold(true, g)
    const b1 = await te1.run()
    const b2 = await te2.run()
    assert.deepStrictEqual(b1, false)
    assert.deepStrictEqual(b2, true)
  })

  it('getOrElse', async () => {
    const v: number = 42
    const te1 = taskOption.of<number>(1).getOrElse(v)
    const te2 = fromOption<number>(none).getOrElse(v)
    const n1 = await te1.run()
    const n2 = await te2.run()
    assert.deepStrictEqual(n1, 1)
    assert.deepStrictEqual(n2, 42)
  })

  it('fromTask', async () => {
    const ma = fromTask(task.of(1))
    const n = await ma.run()
    assert.deepStrictEqual(n, some(1))
  })

  it('tryCatch', async () => {
    const to1 = tryCatch(() => Promise.reject())
    const ma = await to1.run()
    assert.deepStrictEqual(ma, none)
  })

  describe('withTimeout', () => {
    it('should return successfully within the timeout', async () => {
      const t = withTimeout(new TaskOption(delay(10, some('value'))), some('fallback'), 50)
      const v = await t.run()
      assert.deepStrictEqual(v, some('value'))
    })

    it('should return the fallback value on timeout', async () => {
      const t = withTimeout(new TaskOption(delay(50, some('value'))), some('fallback'), 10)
      const v = await t.run()
      assert.deepStrictEqual(v, some('fallback'))
    })
  })
})
