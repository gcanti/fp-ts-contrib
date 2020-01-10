import * as assert from 'assert'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { task } from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import * as _ from '../src/TaskOption'

describe('TaskOption', () => {
  it('fold', async () => {
    const g = (n: number) => task.of(n > 2)
    const te1 = pipe(
      _.some(1),
      _.fold(() => task.of(false), g)
    )
    const te2 = pipe(
      _.none,
      _.fold(() => task.of(true), g)
    )
    const b1 = await te1()
    const b2 = await te2()
    assert.deepStrictEqual(b1, false)
    assert.deepStrictEqual(b2, true)
  })

  it('getOrElse', async () => {
    const v = task.of(42)
    const te1 = pipe(
      _.some(1),
      _.getOrElse(() => v)
    )
    const te2 = pipe(
      _.fromOption<number>(O.none),
      _.getOrElse(() => v)
    )
    const n1 = await te1()
    const n2 = await te2()
    assert.deepStrictEqual(n1, 1)
    assert.deepStrictEqual(n2, 42)
  })

  it('fromTask', async () => {
    const ma = _.fromTask(task.of(1))
    const n = await ma()
    assert.deepStrictEqual(n, O.some(1))
  })

  it('fromNullable', async () => {
    const ma1 = _.fromNullable(null)
    const ma2 = _.fromNullable(undefined)
    const ma3 = _.fromNullable(42)
    const n1 = await ma1()
    const n2 = await ma2()
    const n3 = await ma3()
    assert.deepStrictEqual(n1, O.none)
    assert.deepStrictEqual(n2, O.none)
    assert.deepStrictEqual(n3, O.some(42))
  })

  it('fromTaskEither', async () => {
    const ma1 = _.fromTaskEither(TE.taskEither.of(42))
    const ma2 = _.fromTaskEither(TE.left('ouch!'))
    const n1 = await ma1()
    const n2 = await ma2()
    assert.deepStrictEqual(n1, O.some(42))
    assert.deepStrictEqual(n2, O.none)
  })

  it('toUndefined', async () => {
    const ma1 = _.toUndefined(_.some(42))
    const ma2 = _.toUndefined(_.none)
    const n1 = await ma1()
    const n2 = await ma2()
    assert.deepStrictEqual(n1, 42)
    assert.deepStrictEqual(n2, undefined)
  })

  it('toNullable', async () => {
    const ma1 = _.toNullable(_.some(42))
    const ma2 = _.toNullable(_.none)
    const n1 = await ma1()
    const n2 = await ma2()
    assert.deepStrictEqual(n1, 42)
    assert.deepStrictEqual(n2, null)
  })

  it('chainTask', async () => {
    const f = (n: number) => task.of(n * 2)
    const ma = pipe(_.some(42), _.chainTask(f))
    const n = await ma()
    assert.deepStrictEqual(n, O.some(84))
  })

  it('chainOption', async () => {
    const f = (n: number) => O.some(n - 10)
    const ma = pipe(_.some(42), _.chainOption(f))
    const n = await ma()
    assert.deepStrictEqual(n, O.some(32))
  })

  it('mapNullable', async () => {
    interface X {
      a?: {
        b?: {
          c?: {
            d: number
          }
        }
      }
    }
    const x1: X = { a: {} }
    const x2: X = { a: { b: {} } }
    const x3: X = { a: { b: { c: { d: 1 } } } }
    assert.deepStrictEqual(
      await pipe(
        _.fromNullable(x1.a),
        _.mapNullable(x => x.b),
        _.mapNullable(x => x.c),
        _.mapNullable(x => x.d)
      )(),
      O.none
    )
    assert.deepStrictEqual(
      await pipe(
        _.fromNullable(x2.a),
        _.mapNullable(x => x.b),
        _.mapNullable(x => x.c),
        _.mapNullable(x => x.d)
      )(),
      O.none
    )
    assert.deepStrictEqual(
      await pipe(
        _.fromNullable(x3.a),
        _.mapNullable(x => x.b),
        _.mapNullable(x => x.c),
        _.mapNullable(x => x.d)
      )(),
      O.some(1)
    )
  })

  it('tryCatch', async () => {
    const e1 = await _.tryCatch(() => Promise.resolve(1))()
    assert.deepStrictEqual(e1, O.some(1))
    const e2 = await _.tryCatch(() => Promise.reject(undefined))()
    assert.deepStrictEqual(e2, O.none)
  })

  it('filter', async () => {
    const predicate = (a: number) => a === 2
    assert.deepStrictEqual(await pipe(_.none, _.filter(predicate))(), O.none)
    assert.deepStrictEqual(await pipe(_.some(1), _.filter(predicate))(), O.none)
    assert.deepStrictEqual(await pipe(_.some(2), _.filter(predicate))(), O.some(2))
  })

  it('chainOptionK', async () => {
    const f = (s: string) => O.some(s.length)
    const x = await pipe(_.some('a'), _.chainOptionK(f))()
    assert.deepStrictEqual(x, O.some(1))
  })
})
