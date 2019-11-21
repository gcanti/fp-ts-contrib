import * as assert from 'assert'
import { identity, FunctionN } from 'fp-ts/lib/function'
import { Semigroup, semigroupSum } from 'fp-ts/lib/Semigroup'
import { Identity, identity as id, URI as IdURI } from 'fp-ts/lib/Identity'

import { liftF, foldFree, free, hoistFree, isImpure } from '../src/Free'
import { Do } from '../src/Do'

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
      const fa = free.of<IdURI, number>(42)
      assert.strictEqual(fa._tag, 'Pure')
    })

    it('ap', () => {
      const fa = free.of<IdURI, number>(41)
      const fab = free.of<IdURI, FunctionN<[number], number>>(x => x + 1)
      const fb = free.ap(fab, fa)
      assert.strictEqual(fb._tag, 'Pure')

      const result = foldFree(id)(identity, fb)
      assert.strictEqual(result, 42)
    })

    it('map', () => {
      const fa = free.of<IdURI, number>(41)
      const fb = free.map(fa, x => x + 1)
      assert.strictEqual(fb._tag, 'Pure')

      const result = foldFree(id)(identity, fb)
      assert.strictEqual(result, 42)
    })

    it('chain', () => {
      const fa = free.of<IdURI, number>(41)
      const fb = free.chain(fa, x => free.of(x + 1))
      assert.strictEqual(fb._tag, 'Pure')

      const result = foldFree(id)(identity, fb)
      assert.strictEqual(result, 42)
    })
  })

  describe('Expression tree example', () => {
    const add = <A>(M: Semigroup<A>) => (a: A, b: A) => liftF(new Add(M, a, b, identity))
    const lit = <A>(a: A) => liftF(new Lit(a, identity))

    const program = Do(free)
      .bind('two', lit(2))
      .bind('three', lit(3))
      .bindL('sum', ({ two, three }) => add(semigroupSum)(two, three))
      .return(({ sum }) => sum)

    assert.strictEqual(isImpure(program), true)

    const idEval = <A>(fa: ExprF<A>): Identity<A> => {
      switch (fa._tag) {
        case 'Lit':
          return id.of(fa.next(fa.value))
        case 'Add':
          return id.of(fa.next(fa.M.concat(fa.a, fa.b)))
      }
    }

    it('foldFree', () => {
      const result = foldFree(id)(idEval, program)
      assert.strictEqual(result, 5)
    })

    it('hoistFree', () => {
      const programId = hoistFree<URI, IdURI>(idEval)(program)
      const result = foldFree(id)(identity, programId)
      assert.strictEqual(result, 5)
    })
  })
})
