import * as assert from 'assert'
import { These, this_, that, both } from 'fp-ts/lib/These'
import { identity } from 'fp-ts/lib/function'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { semialignNonEmptyArray } from '../src/Semialign/NonEmptyArray'

describe('Semialign', () => {
  describe('NonEmptyArray', () => {
    it('align', () => {
      assert.deepStrictEqual(
        semialignNonEmptyArray.align(new NonEmptyArray(1, [2, 3]), new NonEmptyArray('a', ['b', 'c'])),
        new NonEmptyArray(both(1, 'a'), [both(2, 'b'), both(3, 'c')])
      )
      assert.deepStrictEqual(
        semialignNonEmptyArray.align(new NonEmptyArray(1, [2, 3]), new NonEmptyArray('a', ['b'])),
        new NonEmptyArray(both(1, 'a'), [both(2, 'b'), this_(3)])
      )
      assert.deepStrictEqual(
        semialignNonEmptyArray.align(new NonEmptyArray(1, [2]), new NonEmptyArray('a', ['b', 'c'])),
        new NonEmptyArray(both(1, 'a'), [both(2, 'b'), that('c')])
      )
      assert.deepStrictEqual(
        semialignNonEmptyArray.align(new NonEmptyArray(1, []), new NonEmptyArray('a', [])),
        new NonEmptyArray(both(1, 'a'), [])
      )
    })

    it('alignWith', () => {
      const f = (x: These<number, string>) => x.fold(a => a.toString(), identity, (a, b) => b + a)
      assert.deepStrictEqual(
        semialignNonEmptyArray.alignWith(new NonEmptyArray(1, [2, 3]), new NonEmptyArray('a', ['b', 'c']), f),
        new NonEmptyArray('a1', ['b2', 'c3'])
      )
      assert.deepStrictEqual(
        semialignNonEmptyArray.alignWith(new NonEmptyArray(1, [2, 3]), new NonEmptyArray('a', ['b']), f),
        new NonEmptyArray('a1', ['b2', '3'])
      )
      assert.deepStrictEqual(
        semialignNonEmptyArray.alignWith(new NonEmptyArray(1, [2]), new NonEmptyArray('a', ['b', 'c']), f),
        new NonEmptyArray('a1', ['b2', 'c'])
      )
      assert.deepStrictEqual(
        semialignNonEmptyArray.alignWith(new NonEmptyArray(1, []), new NonEmptyArray('a', []), f),
        new NonEmptyArray('a1', [])
      )
    })
  })
})
