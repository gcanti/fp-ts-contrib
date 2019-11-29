import * as assert from 'assert'
import * as O from 'fp-ts/lib/Option'
import * as L from '../src/List'
import { monoidString } from 'fp-ts/lib/Monoid'
import { identity } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'

describe('List', () => {
  it('URI', () => {
    assert.strictEqual(L.URI, 'List')
  })

  it('cons', () => {
    assert.deepStrictEqual(L.cons('a', L.nil), { type: 'Cons', head: 'a', tail: L.nil })
    assert.deepStrictEqual(L.cons('a', L.singleton('b')), {
      type: 'Cons',
      head: 'a',
      tail: { type: 'Cons', head: 'b', tail: L.nil }
    })
  })

  it('singleton', () => {
    assert.deepStrictEqual(L.singleton('a'), { type: 'Cons', head: 'a', tail: L.nil })
  })

  it('length', () => {
    assert.strictEqual(L.length(L.nil), 0)
    assert.strictEqual(L.length(L.cons('a', L.singleton('b'))), 2)
  })

  it('isNil', () => {
    assert.strictEqual(L.isNil(L.nil), true)
    assert.strictEqual(L.isNil(L.singleton('a')), false)
  })

  it('isCons', () => {
    assert.strictEqual(L.isCons(L.nil), false)
    assert.strictEqual(L.isCons(L.singleton(1)), true)
  })

  it('head', () => {
    assert.deepStrictEqual(L.head(L.nil), O.none)
    assert.deepStrictEqual(L.head(L.cons('x', L.singleton('a'))), O.some('x'))
  })

  it('tail', () => {
    assert.deepStrictEqual(L.tail(L.nil), O.none)
    assert.deepStrictEqual(L.tail(L.singleton('a')), O.none)
    assert.deepStrictEqual(L.tail(L.cons('x', L.singleton('a'))), O.some(L.singleton('a')))
  })

  it('foldLeft', () => {
    const len: <A>(as: L.List<A>) => number = L.foldLeft(
      () => 0,
      (_, tail) => 1 + len(tail)
    )
    assert.deepStrictEqual(len(L.cons('a', L.singleton('b'))), 2)
  })

  it('findIndex', () => {
    const f = (a: number): boolean => a % 2 === 0
    assert.deepStrictEqual(L.findIndex(f, L.nil), O.none)
    assert.deepStrictEqual(L.findIndex(f, L.cons(1, L.singleton(2))), O.some(1))
    assert.deepStrictEqual(L.findIndex(f, L.cons(1, L.nil)), O.none)
  })

  it('dropLeft', () => {
    assert.deepStrictEqual(L.dropLeft(1)(L.nil), L.nil)
    assert.deepStrictEqual(L.dropLeft(1)(L.cons(1, L.singleton(2))), L.singleton(2))
    assert.deepStrictEqual(L.dropLeft(3)(L.cons(1, L.singleton(2))), L.nil)
  })

  it('dropLeftWhile', () => {
    const isLTThree = (n: number) => n < 3
    assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.nil), L.nil)
    assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.cons(1, L.cons(2, L.singleton(3)))), L.singleton(3))
    assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.cons(1, L.singleton(2))), L.nil)
  })

  it('reverse', () => {
    assert.deepStrictEqual(L.reverse(L.cons(1, L.cons(2, L.singleton(3)))), L.cons(3, L.cons(2, L.singleton(1))))
  })
  it('map', () => {
    assert.deepStrictEqual(pipe(L.singleton('a'), L.map(identity)), L.singleton('a'))
    assert.deepStrictEqual(
      pipe(
        L.cons('aaa', L.singleton('a')),
        L.map(s => s.length)
      ),
      L.cons(3, L.singleton(1))
    )
  })

  it('reduce', () => {
    assert.strictEqual(
      pipe(
        L.cons('b', L.singleton('a')),
        L.reduce('', (b, a) => b + a)
      ),
      'ba'
    )
  })

  it('foldMap', () => {
    const foldMap = L.foldMap(monoidString)
    assert.strictEqual(pipe(L.cons('b', L.singleton('a')), foldMap(identity)), 'ba')
  })

  it('toArray', () => {
    assert.deepStrictEqual(L.toArray(L.cons('b', L.singleton('a'))), ['b', 'a'])
  })

  it('fromArray', () => {
    assert.deepStrictEqual(L.fromArray([]), L.nil)
    assert.deepStrictEqual(L.fromArray(['a']), L.singleton('a'))
    assert.deepStrictEqual(L.fromArray(['a', 'b']), L.cons('a', L.singleton('b')))
  })

  it('reduceRight', () => {
    assert.strictEqual(
      pipe(
        L.cons('b', L.singleton('a')),
        L.reduceRight('', (a, b) => a + b)
      ),
      'ba'
    )
  })

  it('traverse', () => {
    const tfanone: L.List<number> = L.cons(2, L.singleton(1))
    const f = (n: number): O.Option<number> => (n % 2 === 0 ? O.none : O.some(n))
    const fasnone = L.list.traverse(O.option)(tfanone, f)
    assert.ok(O.isNone(fasnone))
    const tfa: L.List<number> = L.cons(3, L.singleton(1))
    const fas = L.list.traverse(O.option)(tfa, f)
    assert.deepStrictEqual(fas, O.some(tfa))
  })

  it('sequence', () => {
    assert.deepStrictEqual(
      L.list.sequence(O.option)(L.cons(O.some(1), L.singleton(O.some(3)))),
      O.some(L.cons(1, L.singleton(3)))
    )
    assert.deepStrictEqual(L.list.sequence(O.option)(L.cons(O.some(1), L.singleton(O.none))), O.none)
  })
})
