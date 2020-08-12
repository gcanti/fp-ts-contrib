import * as assert from 'assert'
import { identity } from 'fp-ts/lib/function'
import { cons } from 'fp-ts/lib/NonEmptyArray'
import { both, fold, left, right } from 'fp-ts/lib/These'
import { semialignNonEmptyArray } from '../src/Semialign/NonEmptyArray'

describe('Semialign', () => {
  describe('NonEmptyArray', () => {
    it('align', () => {
      assert.deepStrictEqual(
        semialignNonEmptyArray.align(cons(1, [2, 3]), cons('a', ['b', 'c'])),
        cons(both(1, 'a'), [both(2, 'b'), both(3, 'c')])
      )
      assert.deepStrictEqual(
        semialignNonEmptyArray.align(cons(1, [2, 3]), cons('a', ['b'])),
        cons(both(1, 'a'), [both(2, 'b'), left(3)])
      )
      assert.deepStrictEqual(
        semialignNonEmptyArray.align(cons(1, [2]), cons('a', ['b', 'c'])),
        cons(both(1, 'a'), [both(2, 'b'), right('c')])
      )
      assert.deepStrictEqual(semialignNonEmptyArray.align(cons(1, []), cons('a', [])), cons(both(1, 'a'), []))
    })

    it('alignWith', () => {
      const f = fold<number, string, string>(
        (a) => a.toString(),
        identity,
        (a, b) => b + a
      )
      assert.deepStrictEqual(
        semialignNonEmptyArray.alignWith(cons(1, [2, 3]), cons('a', ['b', 'c']), f),
        cons('a1', ['b2', 'c3'])
      )
      assert.deepStrictEqual(
        semialignNonEmptyArray.alignWith(cons(1, [2, 3]), cons('a', ['b']), f),
        cons('a1', ['b2', '3'])
      )
      assert.deepStrictEqual(
        semialignNonEmptyArray.alignWith(cons(1, [2]), cons('a', ['b', 'c']), f),
        cons('a1', ['b2', 'c'])
      )
      assert.deepStrictEqual(semialignNonEmptyArray.alignWith(cons(1, []), cons('a', []), f), cons('a1', []))
    })
  })
})
