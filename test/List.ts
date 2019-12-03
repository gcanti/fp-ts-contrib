import * as assert from 'assert'
import * as O from 'fp-ts/lib/Option'
import * as A from 'fp-ts/lib/Array'
import * as L from '../src/List'
import { monoidString } from 'fp-ts/lib/Monoid'
import { identity } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'

describe('List', () => {
  it('URI', () => {
    assert.strictEqual(L.URI, 'List')
  })

  it('cons', () => {
    assert.deepStrictEqual(L.cons('a', L.nil), { type: 'Cons', head: 'a', tail: L.nil, length: 1 })
    assert.deepStrictEqual(L.cons('a', L.singleton('b')), {
      type: 'Cons',
      head: 'a',
      tail: { type: 'Cons', head: 'b', tail: L.nil, length: 1 },
      length: 2
    })
  })

  it('singleton', () => {
    assert.deepStrictEqual(L.singleton('a'), { type: 'Cons', head: 'a', tail: L.nil, length: 1 })
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
    const assertProperty = <A>(l: L.List<A>) => assert.deepStrictEqual(L.head(l), A.head(L.toArray(l)))

    assertProperty(L.nil)
    assertProperty(L.cons('x', L.singleton('a')))
  })

  it('tail', () => {
    const assertProperty = <A>(l: L.List<A>) =>
      assert.deepStrictEqual(L.tail(l), pipe(l, L.toArray, A.tail, O.map(L.fromArray)))

    assertProperty(L.nil)
    assertProperty(L.singleton('a'))
    assertProperty(L.cons('x', L.singleton('a')))
  })

  it('foldLeft', () => {
    const lLen: <A>(as: L.List<A>) => number = L.foldLeft(
      () => 0,
      (_, tail) => 1 + lLen(tail)
    )
    const aLen: <A>(as: Array<A>) => number = A.foldLeft(
      () => 0,
      (_, tail) => 1 + aLen(tail)
    )
    const l: L.List<string> = L.cons('a', L.singleton('b'))
    assert.deepStrictEqual(lLen(l), aLen(L.toArray(l)))
  })

  it('findIndex', () => {
    const f = (a: number): boolean => a % 2 === 0
    const assertProperty = (l: L.List<number>) =>
      assert.deepStrictEqual(L.findIndex(f)(l), A.findIndex(f)(L.toArray(l)))

    assertProperty(L.nil)
    assertProperty(L.cons(1, L.singleton(2)))
    assertProperty(L.cons(1, L.nil))
  })

  it('dropLeft', () => {
    const assertProperty = <A>(n: number, l: L.List<A>) =>
      assert.deepStrictEqual(L.dropLeft(n)(l), pipe(l, L.toArray, A.dropLeft(n), L.fromArray))

    assertProperty(1, L.nil)
    assertProperty(1, L.cons(1, L.singleton(2)))
    assertProperty(3, L.cons(1, L.singleton(2)))
  })

  it('dropLeftWhile', () => {
    const isLTThree = (n: number) => n < 3
    const assertProperty = (l: L.List<number>) =>
      assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(l), pipe(l, L.toArray, A.dropLeftWhile(isLTThree), L.fromArray))

    assertProperty(L.nil)
    assertProperty(L.cons(1, L.cons(2, L.singleton(3))))
    assertProperty(L.cons(1, L.singleton(2)))
  })

  it('reverse', () => {
    const l: L.List<number> = L.cons(1, L.cons(2, L.singleton(3)))
    assert.deepStrictEqual(L.reverse(l), pipe(l, L.toArray, A.reverse, L.fromArray))
  })

  it('map', () => {
    const assertProperty = <A, B>(f: (a: A) => B, l: L.List<A>) =>
      assert.deepStrictEqual(pipe(l, L.map(f)), pipe(l, L.toArray, A.map(f), L.fromArray))

    assertProperty(identity, L.singleton('a'))
    assertProperty((s: string) => s.length, L.cons('aaa', L.singleton('a')))
  })

  it('reduce', () => {
    const l: L.List<string> = L.cons('b', L.singleton('a'))
    const f = (b: string, a: string): string => b + a

    assert.strictEqual(pipe(l, L.reduce('', f)), pipe(l, L.toArray, A.reduce('', f)))
  })

  it('foldMap', () => {
    const l: L.List<string> = L.cons('b', L.singleton('a'))
    assert.strictEqual(
      pipe(l, L.foldMap(monoidString)(identity)),
      pipe(l, L.toArray, A.foldMap(monoidString)(identity))
    )
  })

  it('toArray', () => {
    assert.deepStrictEqual(L.toArray(L.cons('b', L.singleton('a'))), ['b', 'a'])
  })

  it('toReversedArray', () => {
    assert.deepStrictEqual(L.toReversedArray(L.cons('b', L.singleton('a'))), ['a', 'b'])
  })

  it('fromArray', () => {
    assert.deepStrictEqual(L.fromArray([]), L.nil)
    assert.deepStrictEqual(L.fromArray(['a']), L.singleton('a'))
    assert.deepStrictEqual(L.fromArray(['a', 'b']), L.cons('a', L.singleton('b')))
  })

  it('reduceRight', () => {
    const l: L.List<string> = L.cons('b', L.singleton('a'))
    const f = (a: string, b: string): string => a + b

    assert.strictEqual(pipe(l, L.reduceRight('', f)), pipe(l, L.toArray, A.reduceRight('', f)))
  })

  it('traverse', () => {
    const f = (n: number): O.Option<number> => (n % 2 === 0 ? O.none : O.some(n))
    const assertProperty = (tfa: L.List<number>) =>
      assert.deepStrictEqual(
        L.list.traverse(O.option)(tfa, f),
        pipe(A.array.traverse(O.option)(L.toArray(tfa), f), O.map(L.fromArray))
      )

    assertProperty(L.cons(2, L.singleton(1)))
    assertProperty(L.cons(3, L.singleton(1)))
  })

  it('sequence', () => {
    const assertProperty = (l: L.List<O.Option<number>>) =>
      assert.deepStrictEqual(
        L.list.sequence(O.option)(l),
        pipe(l, L.toArray, A.array.sequence(O.option), O.map(L.fromArray))
      )

    assertProperty(L.cons(O.some(1), L.singleton(O.some(3))))
    assertProperty(L.cons(O.some(1), L.singleton(O.none)))
  })
})
