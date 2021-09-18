import * as assert from 'assert'
import * as IO from 'fp-ts/lib/IO'
import * as EQ from 'fp-ts/lib/Eq'
import { pipe } from 'fp-ts/lib/function'
import { memoizeF } from '../src/memoizeF'

describe('memoizeF', () => {
  it('should return a memoized function', () => {
    interface A {
      readonly n: number
    }
    const f = (a: A): IO.IO<number> => () => a.n ** 2
    const spy = jest.fn(f)
    const eq: EQ.Eq<A> = pipe(
      EQ.eqNumber,
      EQ.contramap((_) => _.n)
    )
    const fa = memoizeF(IO.Functor, eq)(spy)
    const a: A = { n: 2 }

    assert.strictEqual(fa(a)(), 4)
    assert.strictEqual(fa({ n: 42 })(), 1764)
    assert.strictEqual(fa(a)(), 4)
    assert.strictEqual(fa({ ...a })(), 4)
    assert.strictEqual(spy.mock.calls.length, 2)
  })
})
