import * as assert from 'assert'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { task } from 'fp-ts/lib/Task'
import { fold, fromOption, fromTask, getOrElse, none as taskOptionNone, taskOption } from '../src/TaskOption'

describe('TaskOption', () => {
  it('fold', async () => {
    const g = (n: number) => task.of(n > 2)
    const te1 = pipe(
      taskOption.of<number>(1),
      fold(() => task.of(false), g)
    )
    const te2 = pipe(
      taskOptionNone,
      fold(() => task.of(true), g)
    )
    const b1 = await te1()
    const b2 = await te2()
    assert.deepStrictEqual(b1, false)
    assert.deepStrictEqual(b2, true)
  })

  it('getOrElse', async () => {
    const v = task.of(42)
    const te1 = pipe(
      taskOption.of<number>(1),
      getOrElse(() => v)
    )
    const te2 = pipe(
      fromOption<number>(O.none),
      getOrElse(() => v)
    )
    const n1 = await te1()
    const n2 = await te2()
    assert.deepStrictEqual(n1, 1)
    assert.deepStrictEqual(n2, 42)
  })

  it('fromTask', async () => {
    const ma = fromTask(task.of(1))
    const n = await ma()
    assert.deepStrictEqual(n, O.some(1))
  })
})
