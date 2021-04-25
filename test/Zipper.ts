import * as assert from 'assert'
import { identity } from 'fp-ts/lib/function'
import { monoidString, monoidSum } from 'fp-ts/lib/Monoid'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { semigroupSum } from 'fp-ts/lib/Semigroup'
import { showString } from 'fp-ts/lib/Show'

import * as _ from '../src/Zipper'

const len = (s: string): number => s.length
const prepend = (a: string) => (s: string): string => a + s
const append = (a: string) => (s: string): string => s + a

describe('Zipper', () => {
  describe('pipeables', () => {
    it('map', () => {
      const fa = _.make(['a', 'bb'], 'ccc', ['dddd'])
      assert.deepStrictEqual(pipe(fa, _.map(len)), _.make([1, 2], 3, [4]))
    })

    it('mapWithIndex', () => {
      const fa = _.make(['a', 'b'], 'c', ['d'])
      assert.deepStrictEqual(
        pipe(
          fa,
          _.mapWithIndex((i, a) => a + i)
        ),
        _.make(['a0', 'b1'], 'c2', ['d3'])
      )
    })

    it('ap', () => {
      const fa = _.make(['a'], 'b', ['c'])
      const fab = _.make([prepend('P1'), append('A1')], prepend('P2'), [append('A2')])
      assert.deepStrictEqual(pipe(fab, _.ap(fa)), _.make(['P1a', 'aA1'], 'P2b', ['cA2']))
    })

    it('apFirst', () => {
      const fa = _.make(['a'], 'b', ['c'])
      const fb = _.make(['d'], 'e', ['f'])
      assert.deepStrictEqual(pipe(fa, _.apFirst(fb)), _.make(['a'], 'b', ['c']))
    })

    it('apSecond', () => {
      const fa = _.make(['a'], 'b', ['c'])
      const fb = _.make(['d'], 'e', ['f'])
      assert.deepStrictEqual(pipe(fa, _.apSecond(fb)), _.make(['d'], 'e', ['f']))
    })

    it('of', () => {
      assert.deepStrictEqual(_.of(1), _.make([], 1, []))
    })

    it('extend', () => {
      const fa = _.make(['a', 'b'], 'c', ['d', 'e'])
      const S = _.getShow(showString)
      const f = (fa: _.Zipper<string>): string => S.show(fa)
      assert.deepStrictEqual(
        pipe(fa, _.extend(f)),
        _.make(
          ['Zipper([], "a", ["b", "c", "d", "e"])', 'Zipper(["a"], "b", ["c", "d", "e"])'],
          'Zipper(["a", "b"], "c", ["d", "e"])',
          ['Zipper(["a", "b", "c"], "d", ["e"])', 'Zipper(["a", "b", "c", "d"], "e", [])']
        )
      )
    })

    it('reduce', () => {
      const fa = _.make(['a', 'b'], 'c', ['d'])
      assert.deepStrictEqual(
        pipe(
          fa,
          _.reduce('', (b, a) => b + a)
        ),
        'abcd'
      )
    })

    it('foldMap', () => {
      const fa = _.make(['a'], 'b', ['c'])
      assert.strictEqual(pipe(fa, _.foldMap(monoidString)(identity)), 'abc')
    })

    it('reduceRight', () => {
      const fa = _.make(['a'], 'b', ['c'])
      const f = (a: string, acc: string) => acc + a
      assert.strictEqual(pipe(fa, _.reduceRight('', f)), 'cba')
    })

    it('traverse', () => {
      const fa = _.make(['a', 'b'], 'c', ['d'])
      assert.deepStrictEqual(_.Traversable.traverse(O.option)(fa, O.some), O.some(fa))
      assert.deepStrictEqual(
        _.Traversable.traverse(O.option)(fa, (a) => (a === 'a' ? O.none : O.some(a))),
        O.none
      )
    })

    it('sequence', () => {
      const sequence = _.sequence(O.option)
      const x1 = _.make([O.some('a'), O.some('b')], O.some('c'), [O.some('d')])
      assert.deepStrictEqual(sequence(x1), O.some(_.make(['a', 'b'], 'c', ['d'])))
      const x2 = _.make([O.some('a'), O.some('b')], O.none, [O.some('d')])
      assert.deepStrictEqual(sequence(x2), O.none)
    })

    it('extract', () => {
      const fa = _.make(['a', 'b'], 'c', ['d'])
      assert.strictEqual(_.extract(fa), 'c')
    })
  })

  describe('constructors', () => {
    it('make', () => {
      const expected: _.Zipper<string> = {
        lefts: ['a', 'b'],
        focus: 'c',
        rights: ['d', 'e']
      }
      assert.deepStrictEqual(_.make(['a', 'b'], 'c', ['d', 'e']), expected)
    })

    it('fromArray', () => {
      assert.deepStrictEqual(_.fromArray([]), O.none)
      assert.deepStrictEqual(_.fromArray([1]), O.some(_.make([], 1, [])))
      assert.deepStrictEqual(_.fromArray([1], 0), O.some(_.make([], 1, [])))
      assert.deepStrictEqual(_.fromArray([1], 1), O.none)
      assert.deepStrictEqual(_.fromArray([1, 2, 3], 1), O.some(_.make([1], 2, [3])))
    })

    it('fromNonEmptyArray', () => {
      assert.deepStrictEqual(_.fromNonEmptyArray([1]), _.make([], 1, []))
      assert.deepStrictEqual(_.fromNonEmptyArray([1, 2, 3]), _.make([], 1, [2, 3]))
    })
  })

  describe('destructors', () => {
    it('isOutOfBound', () => {
      const fa = _.make(['a', 'b'], 'c', ['d'])
      assert.deepStrictEqual(_.isOutOfBound(-1, fa), true)
      assert.deepStrictEqual(_.isOutOfBound(4, fa), true)
      assert.deepStrictEqual(_.isOutOfBound(2, fa), false)
    })

    it('length', () => {
      const fa = _.make(['a', 'b'], 'c', ['d', 'e'])
      assert.deepStrictEqual(_.length(fa), 5)
    })

    it('toNonEmptyArray', () => {
      const fa = _.make(['a', 'b'], 'c', ['d'])
      assert.deepStrictEqual(_.toNonEmptyArray(fa), ['a', 'b', 'c', 'd'])
    })

    it('toReadonlyNonEmptyArray', () => {
      const fa = _.make(['a', 'b'], 'c', ['d'])
      assert.deepStrictEqual(_.toReadonlyNonEmptyArray(fa), _.toNonEmptyArray(fa))
    })

    it('toArray', () => {
      const fa = _.make(['a', 'b'], 'c', ['d'])
      // tslint:disable-next-line deprecation
      assert.deepStrictEqual(_.toArray(fa), _.toNonEmptyArray(fa))
    })
  })

  describe('combinators', () => {
    it('update', () => {
      const fa = _.make(['a', 'b'], 'c', ['d'])
      assert.deepStrictEqual(pipe(fa, _.update('e')), _.make(['a', 'b'], 'e', ['d']))
    })

    it('modify', () => {
      const fa = _.make(['a', 'b'], 'c', ['d'])
      assert.deepStrictEqual(pipe(fa, _.modify(append('!'))), _.make(['a', 'b'], 'c!', ['d']))
    })

    it('up', () => {
      assert.deepStrictEqual(_.up(_.make(['a', 'b'], 'c', ['d'])), O.some(_.make(['a'], 'b', ['c', 'd'])))
      assert.deepStrictEqual(_.up(_.make([], 'c', ['d'])), O.none)
    })

    it('down', () => {
      assert.deepStrictEqual(_.down(_.make(['a', 'b'], 'c', ['d', 'e'])), O.some(_.make(['a', 'b', 'c'], 'd', ['e'])))
      assert.deepStrictEqual(_.down(_.make(['a', 'b'], 'c', [])), O.none)
    })

    it('start', () => {
      const fa = _.make(['a', 'b'], 'c', ['d', 'e'])
      assert.deepStrictEqual(_.start(fa), _.make([], 'a', ['b', 'c', 'd', 'e']))
      const start = _.make([], 1, [2])
      assert.deepStrictEqual(_.start(start), start)
    })

    it('end', () => {
      const fa = _.make(['a', 'b'], 'c', ['d', 'e'])
      assert.deepStrictEqual(_.end(fa), _.make(['a', 'b', 'c', 'd'], 'e', []))
      const end = _.make([1], 2, [])
      assert.deepStrictEqual(_.end(end), end)
    })

    it('insertLeft', () => {
      const fa = _.make(['a', 'b'], 'c', ['d', 'e'])
      assert.deepStrictEqual(pipe(fa, _.insertLeft('f')), _.make(['a', 'b'], 'f', ['c', 'd', 'e']))
    })

    it('insertRight', () => {
      const fa = _.make(['a', 'b'], 'c', ['d', 'e'])
      assert.deepStrictEqual(pipe(fa, _.insertRight('f')), _.make(['a', 'b', 'c'], 'f', ['d', 'e']))
    })

    it('deleteLeft', () => {
      assert.deepStrictEqual(_.deleteLeft(_.make(['a', 'b'], 'c', ['d', 'e'])), O.some(_.make(['a'], 'b', ['d', 'e'])))
      assert.deepStrictEqual(
        _.deleteLeft(_.make(['a', 'b', 'c'], 'd', ['e', 'f'])),
        O.some(_.make(['a', 'b'], 'c', ['e', 'f']))
      )
      assert.deepStrictEqual(_.deleteLeft(_.make([], 'c', ['d', 'e'])), O.some(_.make([], 'd', ['e'])))
      assert.deepStrictEqual(_.deleteLeft(_.make([], 1, [])), O.none)
    })

    it('deleteRight', () => {
      assert.deepStrictEqual(_.deleteRight(_.make(['a', 'b'], 'c', ['d', 'e'])), O.some(_.make(['a', 'b'], 'd', ['e'])))
      assert.deepStrictEqual(
        _.deleteRight(_.make(['a', 'b'], 'c', ['d', 'e', 'f'])),
        O.some(_.make(['a', 'b'], 'd', ['e', 'f']))
      )
      assert.deepStrictEqual(_.deleteRight(_.make(['a', 'b'], 'c', [])), O.some(_.make(['a'], 'b', [])))
      assert.deepStrictEqual(_.deleteRight(_.make([], 1, [])), O.none)
    })
  })

  it('getSemigroup', () => {
    const S = _.getSemigroup(semigroupSum)
    const x = _.make([1, 2], 3, [4])
    const y = _.make([5], 6, [7])
    assert.deepStrictEqual(S.concat(x, y), _.make([1, 2, 5], 9, [4, 7]))
  })

  it('getMonoid', () => {
    const M = _.getMonoid(monoidSum)
    const x = _.make([1, 2], 3, [4])
    assert.deepStrictEqual(M.concat(x, M.empty), x)
    assert.deepStrictEqual(M.concat(M.empty, x), x)
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    assert.strictEqual(S.show(_.make([], 'a', [])), 'Zipper([], "a", [])')
    assert.strictEqual(S.show(_.make(['b'], 'a', [])), 'Zipper(["b"], "a", [])')
    assert.strictEqual(S.show(_.make(['b', 'c'], 'a', [])), 'Zipper(["b", "c"], "a", [])')
    assert.strictEqual(S.show(_.make(['b', 'c'], 'a', ['d'])), 'Zipper(["b", "c"], "a", ["d"])')
    assert.strictEqual(S.show(_.make(['b', 'c'], 'a', ['d', 'e'])), 'Zipper(["b", "c"], "a", ["d", "e"])')
  })
})
