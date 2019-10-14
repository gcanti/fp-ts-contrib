import * as Z from '../src/Zipper'
import * as assert from 'assert'
import { identity } from 'fp-ts/lib/function'
import { monoidString, monoidSum } from 'fp-ts/lib/Monoid'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { semigroupSum } from 'fp-ts/lib/Semigroup'
import { showString } from 'fp-ts/lib/Show'

const len = (s: string): number => s.length
const prepend = (a: string) => (s: string): string => a + s
const append = (a: string) => (s: string): string => s + a

describe('Zipper', () => {
  it('Zipper', () => {
    const expected: Z.Zipper<string> = {
      lefts: ['a', 'b'],
      focus: 'c',
      rights: ['d', 'e']
    }
    assert.deepStrictEqual(Z.make(['a', 'b'], 'c', ['d', 'e']), expected)
  })

  it('length', () => {
    const fa = Z.make(['a', 'b'], 'c', ['d', 'e'])
    assert.deepStrictEqual(Z.length(fa), 5)
  })

  it('update', () => {
    const fa = Z.make(['a', 'b'], 'c', ['d'])
    assert.deepStrictEqual(
      pipe(
        fa,
        Z.update('e')
      ),
      Z.make(['a', 'b'], 'e', ['d'])
    )
  })

  it('modify', () => {
    const fa = Z.make(['a', 'b'], 'c', ['d'])
    assert.deepStrictEqual(
      pipe(
        fa,
        Z.modify(append('!'))
      ),
      Z.make(['a', 'b'], 'c!', ['d'])
    )
  })

  it('toArray', () => {
    const fa = Z.make(['a', 'b'], 'c', ['d'])
    assert.deepStrictEqual(Z.toArray(fa), ['a', 'b', 'c', 'd'])
  })

  it('isOutOfBound', () => {
    const fa = Z.make(['a', 'b'], 'c', ['d'])
    assert.deepStrictEqual(Z.isOutOfBound(-1, fa), true)
    assert.deepStrictEqual(Z.isOutOfBound(4, fa), true)
    assert.deepStrictEqual(Z.isOutOfBound(2, fa), false)
  })

  it('up', () => {
    assert.deepStrictEqual(Z.up(Z.make(['a', 'b'], 'c', ['d'])), O.some(Z.make(['a'], 'b', ['c', 'd'])))
    assert.deepStrictEqual(Z.up(Z.make([], 'c', ['d'])), O.none)
  })

  it('down', () => {
    assert.deepStrictEqual(Z.down(Z.make(['a', 'b'], 'c', ['d', 'e'])), O.some(Z.make(['a', 'b', 'c'], 'd', ['e'])))
    assert.deepStrictEqual(Z.down(Z.make(['a', 'b'], 'c', [])), O.none)
  })

  it('start', () => {
    const fa = Z.make(['a', 'b'], 'c', ['d', 'e'])
    assert.deepStrictEqual(Z.start(fa), Z.make([], 'a', ['b', 'c', 'd', 'e']))
    const start = Z.make([], 1, [2])
    assert.deepStrictEqual(Z.start(start), start)
  })

  it('end', () => {
    const fa = Z.make(['a', 'b'], 'c', ['d', 'e'])
    assert.deepStrictEqual(Z.end(fa), Z.make(['a', 'b', 'c', 'd'], 'e', []))
    const end = Z.make([1], 2, [])
    assert.deepStrictEqual(Z.end(end), end)
  })

  it('insertLeft', () => {
    assert.deepStrictEqual(
      pipe(
        Z.make(['a', 'b'], 'c', ['d', 'e']),
        Z.insertLeft('f')
      ),
      Z.make(['a', 'b'], 'f', ['c', 'd', 'e'])
    )
  })

  it('insertRight', () => {
    assert.deepStrictEqual(
      pipe(
        Z.make(['a', 'b'], 'c', ['d', 'e']),
        Z.insertRight('f')
      ),
      Z.make(['a', 'b', 'c'], 'f', ['d', 'e'])
    )
  })

  it('deleteLeft', () => {
    assert.deepStrictEqual(Z.deleteLeft(Z.make(['a', 'b'], 'c', ['d', 'e'])), O.some(Z.make(['a'], 'b', ['d', 'e'])))
    assert.deepStrictEqual(
      Z.deleteLeft(Z.make(['a', 'b', 'c'], 'd', ['e', 'f'])),
      O.some(Z.make(['a', 'b'], 'c', ['e', 'f']))
    )
    assert.deepStrictEqual(Z.deleteLeft(Z.make([], 'c', ['d', 'e'])), O.some(Z.make([], 'd', ['e'])))
    assert.deepStrictEqual(Z.deleteLeft(Z.make([], 1, [])), O.none)
  })

  it('deleteRight', () => {
    assert.deepStrictEqual(Z.deleteRight(Z.make(['a', 'b'], 'c', ['d', 'e'])), O.some(Z.make(['a', 'b'], 'd', ['e'])))
    assert.deepStrictEqual(
      Z.deleteRight(Z.make(['a', 'b'], 'c', ['d', 'e', 'f'])),
      O.some(Z.make(['a', 'b'], 'd', ['e', 'f']))
    )
    assert.deepStrictEqual(Z.deleteRight(Z.make(['a', 'b'], 'c', [])), O.some(Z.make(['a'], 'b', [])))
    assert.deepStrictEqual(Z.deleteRight(Z.make([], 1, [])), O.none)
  })

  it('map', () => {
    const fa = Z.make(['a', 'bb'], 'ccc', ['dddd'])
    assert.deepStrictEqual(Z.zipper.map(fa, len), Z.make([1, 2], 3, [4]))
  })

  it('of', () => {
    assert.deepStrictEqual(Z.zipper.of(1), Z.make([], 1, []))
  })

  it('ap', () => {
    const fa = Z.make(['a'], 'b', ['c'])
    const fab = Z.make([prepend('P1'), append('A1')], prepend('P2'), [append('A2')])
    assert.deepStrictEqual(Z.zipper.ap(fab, fa), Z.make(['P1a', 'aA1'], 'P2b', ['cA2']))
  })

  it('fromArray', () => {
    assert.deepStrictEqual(Z.fromArray([]), O.none)
    assert.deepStrictEqual(Z.fromArray([1]), O.some(Z.make([], 1, [])))
    assert.deepStrictEqual(Z.fromArray([1], 0), O.some(Z.make([], 1, [])))
    assert.deepStrictEqual(Z.fromArray([1], 1), O.none)
    assert.deepStrictEqual(Z.fromArray([1, 2, 3], 1), O.some(Z.make([1], 2, [3])))
  })

  it('fromNonEmptyArray', () => {
    assert.deepStrictEqual(Z.fromNonEmptyArray([1]), Z.make([], 1, []))
    assert.deepStrictEqual(Z.fromNonEmptyArray([1, 2, 3]), Z.make([], 1, [2, 3]))
  })

  it('getSemigroup', () => {
    const S = Z.getSemigroup(semigroupSum)
    const x = Z.make([1, 2], 3, [4])
    const y = Z.make([5], 6, [7])
    assert.deepStrictEqual(S.concat(x, y), Z.make([1, 2, 5], 9, [4, 7]))
  })

  it('getMonoid', () => {
    const M = Z.getMonoid(monoidSum)
    const x = Z.make([1, 2], 3, [4])
    assert.deepStrictEqual(M.concat(x, M.empty), x)
    assert.deepStrictEqual(M.concat(M.empty, x), x)
  })

  it('reduce', () => {
    const fa = Z.make(['a', 'b'], 'c', ['d'])
    assert.deepStrictEqual(Z.zipper.reduce(fa, '', (b: string, a: string) => b + a), 'abcd')
  })

  it('foldMap', () => {
    const foldMap = Z.zipper.foldMap(monoidString)
    const x1 = Z.make(['a'], 'b', ['c'])
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'abc')
  })

  it('reduceRight', () => {
    const foldr = Z.zipper.reduceRight
    const x1 = Z.make(['a'], 'b', ['c'])
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'cba')
  })

  it('traverse', () => {
    const fa = Z.make(['a', 'b'], 'c', ['d'])
    assert.deepStrictEqual(Z.zipper.traverse(O.option)(fa, O.some), O.some(fa))
    assert.deepStrictEqual(Z.zipper.traverse(O.option)(fa, a => (a === 'a' ? O.none : O.some(a))), O.none)
  })

  it('sequence', () => {
    const sequence = Z.zipper.sequence(O.option)
    const x1 = Z.make([O.some('a'), O.some('b')], O.some('c'), [O.some('d')])
    assert.deepStrictEqual(sequence(x1), O.some(Z.make(['a', 'b'], 'c', ['d'])))
    const x2 = Z.make([O.some('a'), O.some('b')], O.none, [O.some('d')])
    assert.deepStrictEqual(sequence(x2), O.none)
  })

  it('extract', () => {
    const fa = Z.make(['a', 'b'], 'c', ['d'])
    assert.strictEqual(Z.zipper.extract(fa), 'c')
  })

  it('getShow', () => {
    const S = Z.getShow(showString)
    assert.strictEqual(S.show(Z.make([], 'a', [])), 'Zipper([], "a", [])')
    assert.strictEqual(S.show(Z.make(['b'], 'a', [])), 'Zipper(["b"], "a", [])')
    assert.strictEqual(S.show(Z.make(['b', 'c'], 'a', [])), 'Zipper(["b", "c"], "a", [])')
    assert.strictEqual(S.show(Z.make(['b', 'c'], 'a', ['d'])), 'Zipper(["b", "c"], "a", ["d"])')
    assert.strictEqual(S.show(Z.make(['b', 'c'], 'a', ['d', 'e'])), 'Zipper(["b", "c"], "a", ["d", "e"])')
  })

  it('extend', () => {
    const fa = Z.make(['a', 'b'], 'c', ['d', 'e'])
    const S = Z.getShow(showString)
    const f = (fa: Z.Zipper<string>): string => S.show(fa)
    assert.deepStrictEqual(
      Z.zipper.extend(fa, f),
      Z.make(
        ['Zipper([], "a", ["b", "c", "d", "e"])', 'Zipper(["a"], "b", ["c", "d", "e"])'],
        'Zipper(["a", "b"], "c", ["d", "e"])',
        ['Zipper(["a", "b", "c"], "d", ["e"])', 'Zipper(["a", "b", "c", "d"], "e", [])']
      )
    )
  })
})
