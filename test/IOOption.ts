import * as assert from 'assert'
import * as E from 'fp-ts/lib/Either'
import { monoidSum } from 'fp-ts/lib/Monoid'
import * as O from 'fp-ts/lib/Option'
import { io } from 'fp-ts/lib/IO'
import * as _ from '../src/IOOption'
import * as IOE from 'fp-ts/lib/IOEither'
import { pipe } from 'fp-ts/lib/pipeable'
import { semigroupSum } from 'fp-ts/lib/Semigroup'

describe('IOOption', () => {
  describe('pipeables', () => {
    it('map', () => {
      const f = (n: number): number => n + 1
      assert.deepStrictEqual(pipe(_.some(1), _.map(f))(), O.some(2))
      assert.deepStrictEqual(pipe(_.none, _.map(f))(), O.none)
    })

    it('ap', () => {
      const fab = _.of((n: number) => n + 1)
      assert.deepStrictEqual(pipe(fab, _.ap(_.some(1)))(), O.some(2))
      assert.deepStrictEqual(pipe(fab, _.ap(_.none))(), O.none)
    })

    it('apFirst', () => {
      const fb = _.some('a')
      assert.deepStrictEqual(pipe(_.some(1), _.apFirst(fb))(), O.some(1))
      assert.deepStrictEqual(pipe(_.none, _.apFirst(fb))(), O.none)
    })

    it('apSecond', () => {
      const fa = _.some(1)
      const fb = _.some('a')
      assert.deepStrictEqual(pipe(fa, _.apSecond(fb))(), O.some('a'))
    })

    it('chain', () => {
      const f = (n: number) => _.some(n + 1)
      assert.deepStrictEqual(pipe(_.some(1), _.chain(f))(), O.some(2))
      assert.deepStrictEqual(pipe(_.none, _.chain(f))(), O.none)
    })

    it('chainIOK', () => {
      const f = (n: number) => io.of(n + 1)
      assert.deepStrictEqual(pipe(_.some(1), _.chainIOK(f))(), O.some(2))
      assert.deepStrictEqual(pipe(_.none, _.chainIOK(f))(), O.none)
    })

    it('chainFirst', () => {
      const f = (n: number) => _.of(n + 1)
      assert.deepStrictEqual(pipe(_.some(1), _.chainFirst(f))(), O.some(1))
      assert.deepStrictEqual(pipe(_.none, _.chainFirst(f))(), O.none)
    })

    it('chainFirstIOK', () => {
      const f = (n: number) => io.of(n + 1)
      assert.deepStrictEqual(pipe(_.some(1), _.chainFirstIOK(f))(), O.some(1))
      assert.deepStrictEqual(pipe(_.none, _.chainFirstIOK(f))(), O.none)
    })

    it('chainOptionK', () => {
      const f = (n: number) => O.some(n % 10)
      assert.deepStrictEqual(pipe(_.some(12), _.chainOptionK(f))(), O.some(2))
      assert.deepStrictEqual(pipe(_.none, _.chainOptionK(f))(), O.none)
    })

    it('flatten', () => {
      assert.deepStrictEqual(pipe(_.some(_.some(1)), _.flatten)(), O.some(1))
      assert.deepStrictEqual(pipe(_.none, _.flatten)(), O.none)
    })

    it('alt', () => {
      assert.deepStrictEqual(
        pipe(
          _.some(1),
          _.alt(() => _.some(2))
        )(),
        O.some(1)
      )
      assert.deepStrictEqual(
        pipe(
          _.some(1),
          _.alt(() => _.none as _.IOOption<number>)
        )(),
        O.some(1)
      )
      assert.deepStrictEqual(
        pipe(
          _.none,
          _.alt(() => _.some(1))
        )(),
        O.some(1)
      )
      assert.deepStrictEqual(
        pipe(
          _.none,
          _.alt(() => _.none as _.IOOption<number>)
        )(),
        O.none
      )
    })

    it('zero', () => {
      assert.deepStrictEqual(_.zero()(), O.none)
    })

    it('compact', () => {
      assert.deepStrictEqual(_.compact(_.none)(), O.none)
      assert.deepStrictEqual(_.compact(_.some(O.none))(), O.none)
      assert.deepStrictEqual(_.compact(_.some(O.some(1)))(), O.some(1))
    })

    it('separate', () => {
      const a = _.separate(_.none)
      assert.deepStrictEqual(a.left(), O.none)
      assert.deepStrictEqual(a.right(), O.none)

      const b = _.separate(_.some(E.left(1)))
      assert.deepStrictEqual(b.left(), O.some(1))
      assert.deepStrictEqual(b.right(), O.none)

      const c = _.separate(_.some(E.right(1)))
      assert.deepStrictEqual(c.left(), O.none)
      assert.deepStrictEqual(c.right(), O.some(1))
    })

    it('filter', () => {
      const predicate = (n: number): boolean => n === 2
      assert.deepStrictEqual(pipe(_.none, _.filter(predicate))(), O.none)
      assert.deepStrictEqual(pipe(_.some(1), _.filter(predicate))(), O.none)
      assert.deepStrictEqual(pipe(_.some(2), _.filter(predicate))(), O.some(2))
    })

    it('filterMap', () => {
      const predicate = (n: number): boolean => n === 2
      const f = (n: number): O.Option<number> => (predicate(n) ? O.some(n + 1) : O.none)
      assert.deepStrictEqual(pipe(_.none, _.filterMap(f))(), O.none)
      assert.deepStrictEqual(pipe(_.some(1), _.filterMap(f))(), O.none)
      assert.deepStrictEqual(pipe(_.some(2), _.filterMap(f))(), O.some(3))
    })

    it('partition', () => {
      const predicate = (n: number): boolean => n > 2

      const a = pipe(_.none, _.partition(predicate))
      assert.deepStrictEqual(a.left(), O.none)
      assert.deepStrictEqual(a.right(), O.none)

      const b = pipe(_.some(1), _.partition(predicate))
      assert.deepStrictEqual(b.left(), O.some(1))
      assert.deepStrictEqual(b.right(), O.none)

      const c = pipe(_.some(3), _.partition(predicate))
      assert.deepStrictEqual(c.left(), O.none)
      assert.deepStrictEqual(c.right(), O.some(3))
    })

    it('partitionMap', () => {
      const predicate = (n: number): boolean => n > 2
      const f = (n: number): E.Either<number, number> => (predicate(n) ? E.right(n + 1) : E.left(n - 1))

      const a = pipe(_.none, _.partitionMap(f))
      assert.deepStrictEqual(a.left(), O.none)
      assert.deepStrictEqual(a.right(), O.none)

      const b = pipe(_.some(1), _.partitionMap(f))
      assert.deepStrictEqual(b.left(), O.some(0))
      assert.deepStrictEqual(b.right(), O.none)

      const c = pipe(_.some(3), _.partitionMap(f))
      assert.deepStrictEqual(c.left(), O.none)
      assert.deepStrictEqual(c.right(), O.some(4))
    })
  })

  describe('constructors', () => {
    it('fromNullable', () => {
      const ma1 = _.fromNullable(null)
      const ma2 = _.fromNullable(undefined)
      const ma3 = _.fromNullable(42)
      assert.deepStrictEqual(ma1(), O.none)
      assert.deepStrictEqual(ma2(), O.none)
      assert.deepStrictEqual(ma3(), O.some(42))
    })

    it('fromIOK', () => {
      const f = (n: number) => io.of(n % 10)
      assert.deepStrictEqual(_.fromIOK(f)(12)(), O.some(2))
    })

    it('fromOptionK', () => {
      const f = (n: number) => O.some(n % 10)
      assert.deepStrictEqual(_.fromOptionK(f)(12)(), O.some(2))
    })

    it('fromIOEither', async () => {
      const ma1 = _.fromIOEither(IOE.right(42))
      const ma2 = _.fromIOEither(IOE.left('ouch!'))
      assert.deepStrictEqual(ma1(), O.some(42))
      assert.deepStrictEqual(ma2(), O.none)
    })
  })

  describe('destructors', () => {
    it('fold', () => {
      const g = (n: number) => io.of(n > 2)
      const ioo1 = pipe(
        _.some(1),
        _.fold(() => io.of(false), g)
      )
      const ioo2 = pipe(
        _.none,
        _.fold(() => io.of(true), g)
      )
      assert.strictEqual(ioo1(), false)
      assert.strictEqual(ioo2(), true)
    })

    it('getOrElse', () => {
      const v = io.of(42)
      const ioo1 = pipe(
        _.some(1),
        _.getOrElse(() => v)
      )
      const ioo2 = pipe(
        _.none,
        _.getOrElse(() => v)
      )
      assert.deepStrictEqual(ioo1(), 1)
      assert.deepStrictEqual(ioo2(), 42)
    })

    it('toUndefined', () => {
      const ioo1 = pipe(_.some(6), _.toUndefined)
      const ioo2 = pipe(_.none, _.toUndefined)
      assert.deepStrictEqual(ioo1(), 6)
      assert.deepStrictEqual(ioo2(), undefined)
    })

    it('toNullable', () => {
      const ioo1 = pipe(_.some(6), _.toNullable)
      const ioo2 = pipe(_.none, _.toNullable)
      assert.deepStrictEqual(ioo1(), 6)
      assert.deepStrictEqual(ioo2(), null)
    })
  })

  describe('combinators', () => {
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
        pipe(
          _.fromNullable(x1.a),
          _.mapNullable((x) => x.b),
          _.mapNullable((x) => x.c),
          _.mapNullable((x) => x.d)
        )(),
        O.none
      )
      assert.deepStrictEqual(
        pipe(
          _.fromNullable(x2.a),
          _.mapNullable((x) => x.b),
          _.mapNullable((x) => x.c),
          _.mapNullable((x) => x.d)
        )(),
        O.none
      )
      assert.deepStrictEqual(
        pipe(
          _.fromNullable(x3.a),
          _.mapNullable((x) => x.b),
          _.mapNullable((x) => x.c),
          _.mapNullable((x) => x.d)
        )(),
        O.some(1)
      )
    })
  })

  describe('instances', () => {
    it('getApplySemigroup', () => {
      const S = _.getApplySemigroup(semigroupSum)
      assert.deepStrictEqual(S.concat(_.none, _.none)(), O.none)
      assert.deepStrictEqual(S.concat(_.some(1), _.none)(), O.none)
      assert.deepStrictEqual(S.concat(_.none, _.some(1))(), O.none)
      assert.deepStrictEqual(S.concat(_.some(1), _.some(2))(), O.some(3))
    })

    it('getApplyMonoid', () => {
      const M = _.getApplyMonoid(monoidSum)
      assert.deepStrictEqual(M.concat(M.empty, _.none)(), O.none)
      assert.deepStrictEqual(M.concat(_.none, M.empty)(), O.none)
      assert.deepStrictEqual(M.concat(M.empty, _.some(1))(), O.some(1))
      assert.deepStrictEqual(M.concat(_.some(1), M.empty)(), O.some(1))
    })
  })
})
