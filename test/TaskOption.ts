import * as assert from 'assert'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { task } from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import {
  fold,
  fromOption,
  fromTask,
  getOrElse,
  none as taskOptionNone,
  taskOption,
  fromNullable,
  fromTaskEither,
  toUndefined,
  toNullable,
  chainTask,
  chainOption
} from '../src/TaskOption'

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

  test('fromNullable', async () => {
    const ma1 = fromNullable(null)
    const ma2 = fromNullable(undefined)
    const ma3 = fromNullable(42)
    const n1 = await ma1()
    const n2 = await ma2()
    const n3 = await ma3()
    assert.deepStrictEqual(n1, O.none)
    assert.deepStrictEqual(n2, O.none)
    assert.deepStrictEqual(n3, O.some(42))
  })

  test('fromTaskEither', async () => {
    const ma1 = fromTaskEither(TE.taskEither.of(42))
    const ma2 = fromTaskEither(TE.left('ouch!'))
    const n1 = await ma1()
    const n2 = await ma2()
    assert.deepStrictEqual(n1, O.some(42))
    assert.deepStrictEqual(n2, O.none)
  })

  test('toUndefined', async () => {
    const ma1 = toUndefined(taskOption.of(42))
    const ma2 = toUndefined(taskOptionNone)
    const n1 = await ma1()
    const n2 = await ma2()
    assert.deepStrictEqual(n1, 42)
    assert.deepStrictEqual(n2, undefined)
  })

  test('toNullable', async () => {
    const ma1 = toNullable(taskOption.of(42))
    const ma2 = toNullable(taskOptionNone)
    const n1 = await ma1()
    const n2 = await ma2()
    assert.deepStrictEqual(n1, 42)
    assert.deepStrictEqual(n2, null)
  })

  test('chainTask', async () => {
    const f = (n: number) => task.of(n * 2)
    const ma = pipe(
      taskOption.of(42),
      chainTask(f)
    )
    const n = await ma()
    assert.deepStrictEqual(n, O.some(84))
  })

  test('chainOption', async () => {
    const f = (n: number) => O.some(n - 10)
    const ma = pipe(
      taskOption.of(42),
      chainOption(f)
    )
    const n = await ma()
    assert.deepStrictEqual(n, O.some(32))
  })
})
