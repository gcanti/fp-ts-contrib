import { io } from 'fp-ts/lib/IO'
import { semigroupSum } from 'fp-ts/lib/Semigroup'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as assert from 'assert'
import * as _ from '../src/IOOption'
import * as IOE from 'fp-ts/lib/IOEither'
import { monoidSum } from 'fp-ts/lib/Monoid'

describe('IOOption', () => {
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

  it('fromNullable', () => {
    const ma1 = _.fromNullable(null)
    const ma2 = _.fromNullable(undefined)
    const ma3 = _.fromNullable(42)
    assert.deepStrictEqual(ma1(), O.none)
    assert.deepStrictEqual(ma2(), O.none)
    assert.deepStrictEqual(ma3(), O.some(42))
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

  it('fromIOEither', async () => {
    const ma1 = _.fromIOEither(IOE.right(42))
    const ma2 = _.fromIOEither(IOE.left('ouch!'))
    assert.deepStrictEqual(ma1(), O.some(42))
    assert.deepStrictEqual(ma2(), O.none)
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
        _.mapNullable(x => x.b),
        _.mapNullable(x => x.c),
        _.mapNullable(x => x.d)
      )(),
      O.none
    )
    assert.deepStrictEqual(
      pipe(
        _.fromNullable(x2.a),
        _.mapNullable(x => x.b),
        _.mapNullable(x => x.c),
        _.mapNullable(x => x.d)
      )(),
      O.none
    )
    assert.deepStrictEqual(
      pipe(
        _.fromNullable(x3.a),
        _.mapNullable(x => x.b),
        _.mapNullable(x => x.c),
        _.mapNullable(x => x.d)
      )(),
      O.some(1)
    )
  })

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

  it('fromOptionK', () => {
    const f = (n: number) => O.some(n % 10)
    assert.deepStrictEqual(_.fromOptionK(f)(12)(), O.some(2))
  })

  it('chainOptionK', () => {
    const f = (n: number) => O.some(n % 10)
    const ioo = pipe(_.some(12), _.chainOptionK(f))
    assert.deepStrictEqual(ioo(), O.some(2))
  })
})
