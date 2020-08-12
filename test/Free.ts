import * as assert from 'assert'
import { identity, FunctionN } from 'fp-ts/lib/function'
import { Semigroup, semigroupSum } from 'fp-ts/lib/Semigroup'
import { Identity, identity as id, URI as IdURI } from 'fp-ts/lib/Identity'
import { pipe } from 'fp-ts/lib/pipeable'

import { Do } from '../src/Do'
import * as _ from '../src/Free'

const URI = 'Expr'
type URI = typeof URI

class Add<A> {
  readonly _URI!: URI
  readonly _A!: A
  readonly _tag: 'Add' = 'Add'
  constructor(readonly M: Semigroup<A>, readonly a: A, readonly b: A, readonly next: (result: A) => A) {}
}
class Lit<A> {
  readonly _URI!: URI
  readonly _A!: A
  readonly _tag: 'Lit' = 'Lit'
  constructor(readonly value: A, readonly next: (result: A) => A) {}
}
type ExprF<A> = Add<A> | Lit<A>

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    Expr: ExprF<A>
  }
}

describe('Free', () => {
  describe('Monad properties', () => {
    it('of', () => {
      const fa = _.of<IdURI, number>(42)
      assert.strictEqual(fa._tag, 'Pure')
    })

    it('ap', () => {
      const fa = _.of<IdURI, number>(41)
      const fab = _.of<IdURI, FunctionN<[number], number>>((x) => x + 1)
      const fb = pipe(fab, _.ap(fa))
      assert.strictEqual(fb._tag, 'Pure')

      const result = _.foldFree(id)(identity, fb)
      assert.strictEqual(result, 42)
    })

    it('map', () => {
      const fa = _.of<IdURI, number>(41)
      const fb = pipe(
        fa,
        _.map<number, number>((x) => x + 1)
      )
      assert.strictEqual(fb._tag, 'Pure')

      const result = _.foldFree(id)(identity, fb)
      assert.strictEqual(result, 42)
    })

    it('chain', () => {
      const fa = _.of<IdURI, number>(41)
      const fb = _.chain<IdURI, number, number>((x) => _.of<IdURI, number>(x + 1))(fa)
      assert.strictEqual(fb._tag, 'Pure')

      const result = _.foldFree(id)(identity, fb)
      assert.strictEqual(result, 42)
    })

    it('flatten', () => {
      const mma = _.of<IdURI, _.Free<IdURI, number>>(_.of<IdURI, number>(41))
      const ma = pipe(mma, _.flatten)
      assert.strictEqual(ma._tag, 'Pure')

      const result = _.foldFree(id)(identity, ma)
      assert.strictEqual(result, 41)
    })
  })

  describe('Expression tree example', () => {
    const add = <A>(M: Semigroup<A>) => (a: A, b: A) => _.liftF(new Add(M, a, b, identity))
    const lit = <A>(a: A) => _.liftF(new Lit(a, identity))

    const program = Do(_.free)
      .bind('two', lit(2))
      .bind('three', lit(3))
      .bindL('sum', ({ two, three }) => add(semigroupSum)(two, three))
      .return(({ sum }) => sum)

    assert.strictEqual(_.isImpure(program), true)

    const idEval = <A>(fa: ExprF<A>): Identity<A> => {
      switch (fa._tag) {
        case 'Lit':
          return id.of(fa.next(fa.value))
        case 'Add':
          return id.of(fa.next(fa.M.concat(fa.a, fa.b)))
      }
    }

    it('foldFree', () => {
      const result = _.foldFree(id)(idEval, program)
      assert.strictEqual(result, 5)
    })

    it('hoistFree', () => {
      const programId = _.hoistFree<URI, IdURI>(idEval)(program)
      const result = _.foldFree(id)(identity, programId)
      assert.strictEqual(result, 5)
    })
  })
})
