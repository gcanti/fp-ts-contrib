import * as assert from 'assert'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'

import * as _ from '../src/TaskOption'

describe('TaskOption', () => {
  describe('pipeables', () => {
    it('map', async () => {
      const double = (n: number) => n * 2
      assert.deepStrictEqual(await pipe(_.some(2), _.map(double))(), O.some(4))
      assert.deepStrictEqual(await pipe(_.none, _.map(double))(), O.none)
    })

    it('ap', async () => {
      const double = (n: number) => n * 2
      assert.deepStrictEqual(await pipe(_.some(double), _.ap(_.some(2)))(), O.some(4))
      assert.deepStrictEqual(await pipe(_.some(double), _.ap(_.none))(), O.none)
      assert.deepStrictEqual(await pipe(_.none, _.ap(_.some(2)))(), O.none)
      assert.deepStrictEqual(await pipe(_.none, _.ap(_.none))(), O.none)
    })

    it('apFirst', async () => {
      assert.deepStrictEqual(await pipe(_.some('a'), _.apFirst(_.some('b')))(), O.some('a'))
    })

    it('apSecond', async () => {
      assert.deepStrictEqual(await pipe(_.some('a'), _.apSecond(_.some('b')))(), O.some('b'))
    })

    it('chain', async () => {
      const f = (n: number) => _.some(n * 2)
      const g = () => _.none
      assert.deepStrictEqual(await pipe(_.some(1), _.chain(f))(), O.some(2))
      assert.deepStrictEqual(await pipe(_.none, _.chain(f))(), O.none)
      assert.deepStrictEqual(await pipe(_.some(1), _.chain(g))(), O.none)
      assert.deepStrictEqual(await pipe(_.none, _.chain(g))(), O.none)
    })

    it('chainFirst', async () => {
      const f = (n: number) => _.some(n * 2)
      assert.deepStrictEqual(await pipe(_.some(1), _.chainFirst(f))(), O.some(1))
    })

    it('chainTask', async () => {
      const f = (n: number) => T.of(n * 2)
      const ma = pipe(_.some(42), _.chainTask(f))
      assert.deepStrictEqual(await ma(), O.some(84))
    })

    it('chainOption', async () => {
      const f = (n: number) => O.some(n - 10)
      const ma = pipe(_.some(42), _.chainOption(f))
      assert.deepStrictEqual(await ma(), O.some(32))
    })

    it('chainOptionK', async () => {
      const f = (s: string) => O.some(s.length)
      assert.deepStrictEqual(await pipe(_.some('a'), _.chainOptionK(f))(), O.some(1))
    })

    it('flatten', async () => {
      assert.deepStrictEqual(await pipe(_.some(_.some(1)), _.flatten)(), O.some(1))
    })

    it('alt', async () => {
      assert.deepStrictEqual(
        await pipe(
          _.some(1),
          _.alt(() => _.some(2))
        )(),
        O.some(1)
      )
      assert.deepStrictEqual(
        await pipe(
          _.some(2),
          _.alt(() => _.none as _.TaskOption<number>)
        )(),
        O.some(2)
      )
      assert.deepStrictEqual(
        await pipe(
          _.none,
          _.alt(() => _.some(1))
        )(),
        O.some(1)
      )
      assert.deepStrictEqual(
        await pipe(
          _.none,
          _.alt(() => _.none)
        )(),
        O.none
      )
    })

    it('compact', async () => {
      assert.deepStrictEqual(await _.compact(_.none)(), O.none)
      assert.deepStrictEqual(await _.compact(_.some(O.none))(), O.none)
      assert.deepStrictEqual(await _.compact(_.some(O.some('123')))(), O.some('123'))
    })

    it('separate', async () => {
      const a = _.separate(_.none)
      assert.deepStrictEqual(await a.left(), O.none)
      assert.deepStrictEqual(await a.right(), O.none)

      const b = _.separate(_.some(E.left('123')))
      assert.deepStrictEqual(await b.left(), O.some('123'))
      assert.deepStrictEqual(await b.right(), O.none)

      const c = _.separate(_.some(E.right('123')))
      assert.deepStrictEqual(await c.left(), O.none)
      assert.deepStrictEqual(await c.right(), O.some('123'))
    })

    it('filter', async () => {
      const predicate = (a: number) => a === 2
      assert.deepStrictEqual(await pipe(_.none, _.filter(predicate))(), O.none)
      assert.deepStrictEqual(await pipe(_.some(1), _.filter(predicate))(), O.none)
      assert.deepStrictEqual(await pipe(_.some(2), _.filter(predicate))(), O.some(2))
    })

    it('filterMap', async () => {
      const p = (n: number): boolean => n > 2
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      assert.deepStrictEqual(await pipe(_.none, _.filterMap(f))(), O.none)
      assert.deepStrictEqual(await pipe(_.some(1), _.filterMap(f))(), O.none)
      assert.deepStrictEqual(await pipe(_.some(3), _.filterMap(f))(), O.some(4))
    })

    it('partition', async () => {
      const p = (n: number): boolean => n > 2

      const a = pipe(_.none, _.partition(p))
      assert.deepStrictEqual(await a.left(), O.none)
      assert.deepStrictEqual(await a.right(), O.none)

      const b = pipe(_.some(1), _.partition(p))
      assert.deepStrictEqual(await b.left(), O.some(1))
      assert.deepStrictEqual(await b.right(), O.none)

      const c = pipe(_.some(3), _.partition(p))
      assert.deepStrictEqual(await c.left(), O.none)
      assert.deepStrictEqual(await c.right(), O.some(3))
    })

    it('partitionMap', async () => {
      const p = (n: number): boolean => n > 2
      const f = (n: number) => (p(n) ? E.right(n + 1) : E.left(n - 1))

      const a = pipe(_.none, _.partitionMap(f))
      assert.deepStrictEqual(await a.left(), O.none)
      assert.deepStrictEqual(await a.right(), O.none)

      const b = pipe(_.some(1), _.partitionMap(f))
      assert.deepStrictEqual(await b.left(), O.some(0))
      assert.deepStrictEqual(await b.right(), O.none)

      const c = pipe(_.some(3), _.partitionMap(f))
      assert.deepStrictEqual(await c.left(), O.none)
      assert.deepStrictEqual(await c.right(), O.some(4))
    })
  })

  describe('constructors', () => {
    it('fromTask', async () => {
      assert.deepStrictEqual(await _.fromTask(T.of(1))(), O.some(1))
    })

    it('fromTaskEither', async () => {
      assert.deepStrictEqual(await _.fromTaskEither(TE.taskEither.of(42))(), O.some(42))
      assert.deepStrictEqual(await _.fromTaskEither(TE.left('ouch!'))(), O.none)
    })

    it('fromNullable', async () => {
      assert.deepStrictEqual(await _.fromNullable(null)(), O.none)
      assert.deepStrictEqual(await _.fromNullable(undefined)(), O.none)
      assert.deepStrictEqual(await _.fromNullable(42)(), O.some(42))
    })

    it('tryCatch', async () => {
      const e1 = await _.tryCatch(() => Promise.resolve(1))()
      assert.deepStrictEqual(e1, O.some(1))

      const e2 = await _.tryCatch(() => Promise.reject(undefined))()
      assert.deepStrictEqual(e2, O.none)
    })
  })

  describe('destructors', () => {
    it('fold', async () => {
      const g = (n: number) => T.of(n > 2)
      const te1 = pipe(
        _.some(1),
        _.fold(() => T.of(false), g)
      )
      const te2 = pipe(
        _.none,
        _.fold(() => T.of(true), g)
      )
      const b1 = await te1()
      const b2 = await te2()
      assert.deepStrictEqual(b1, false)
      assert.deepStrictEqual(b2, true)
    })

    it('getOrElse', async () => {
      const v = T.of(42)
      assert.deepStrictEqual(
        await pipe(
          _.some(1),
          _.getOrElse(() => v)
        )(),
        1
      )
      assert.deepStrictEqual(
        await pipe(
          _.fromOption<number>(O.none),
          _.getOrElse(() => v)
        )(),
        42
      )
    })

    it('toUndefined', async () => {
      assert.deepStrictEqual(await _.toUndefined(_.some(42))(), 42)
      assert.deepStrictEqual(await _.toUndefined(_.none)(), undefined)
    })

    it('toNullable', async () => {
      assert.deepStrictEqual(await _.toNullable(_.some(42))(), 42)
      assert.deepStrictEqual(await _.toNullable(_.none)(), null)
    })
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
        _.mapNullable((x) => x.b),
        _.mapNullable((x) => x.c),
        _.mapNullable((x) => x.d)
      )(),
      O.none
    )
    assert.deepStrictEqual(
      await pipe(
        _.fromNullable(x2.a),
        _.mapNullable((x) => x.b),
        _.mapNullable((x) => x.c),
        _.mapNullable((x) => x.d)
      )(),
      O.none
    )
    assert.deepStrictEqual(
      await pipe(
        _.fromNullable(x3.a),
        _.mapNullable((x) => x.b),
        _.mapNullable((x) => x.c),
        _.mapNullable((x) => x.d)
      )(),
      O.some(1)
    )
  })
})
