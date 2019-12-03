import * as assert from 'assert'
import * as fc from 'fast-check'
import * as O from 'fp-ts/lib/Option'
import * as A from 'fp-ts/lib/Array'
import * as L from '../src/List'
import { monoidSum } from 'fp-ts/lib/Monoid'
import { identity } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as Eq from 'fp-ts/lib/Eq'

const elementArb = fc.integer()
const arrayArb = fc.array(elementArb)
const listArb = arrayArb.map(L.fromArray)

const eqList = <A>(eq: Eq.Eq<A>): Eq.Eq<L.List<A>> => ({
  equals: (x, y) => {
    if (x.length !== y.length) return false
    let lx = x
    let ly = y
    while (L.isCons(lx) && L.isCons(ly)) {
      if (!eq.equals(lx.head, ly.head)) return false
      lx = lx.tail
      ly = ly.tail
    }
    return true
  }
})

const eqListElement = eqList(Eq.eqNumber)
const eqArrayElement = A.getEq(Eq.eqNumber)

describe('List', () => {
  it('URI', () => {
    assert.strictEqual(L.URI, 'List')
  })

  it('cons', () => {
    assert.deepStrictEqual(L.cons('a', L.nil), { type: 'Cons', head: 'a', tail: L.nil, length: 1 })
    fc.assert(
      fc.property(elementArb, arrayArb, (a, as) => {
        const newList = L.cons(a, L.fromArray(as))
        const newArray = A.cons(a, as)
        return eqListElement.equals(newList, L.fromArray(newArray))
      })
    )
  })

  it('of', () => {
    fc.assert(fc.property(elementArb, a => eqListElement.equals(L.of(a), pipe(a, A.of, L.fromArray))))
  })

  it('isNil', () => {
    assert.strictEqual(L.isNil(L.nil), true)
    assert.strictEqual(L.isNil(L.of(6)), false)
  })

  it('isCons', () => {
    assert.strictEqual(L.isCons(L.nil), false)
    assert.strictEqual(L.isCons(L.of(1)), true)
  })

  it('head', () => {
    const eq = O.getEq(Eq.eqNumber)

    fc.assert(fc.property(listArb, l => eq.equals(L.head(l), A.head(L.toArray(l)))))
  })

  it('tail', () => {
    const eq = O.getEq(eqListElement)

    fc.assert(fc.property(listArb, l => eq.equals(L.tail(l), pipe(l, L.toArray, A.tail, O.map(L.fromArray)))))
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

    fc.assert(fc.property(listArb, l => Eq.eqNumber.equals(lLen(l), aLen(L.toArray(l)))))
  })

  it('findIndex', () => {
    const f = (a: number): boolean => a % 2 === 0
    const eq = O.getEq(Eq.eqNumber)

    fc.assert(fc.property(listArb, l => eq.equals(L.findIndex(f)(l), A.findIndex(f)(L.toArray(l)))))
  })

  it('dropLeft', () => {
    fc.assert(
      fc.property(fc.nat(), listArb, (n, l) =>
        eqListElement.equals(L.dropLeft(n)(l), pipe(l, L.toArray, A.dropLeft(n), L.fromArray))
      )
    )
  })

  it('dropLeftWhile', () => {
    const isLTThree = (n: number) => n < 3

    fc.assert(
      fc.property(listArb, l =>
        eqListElement.equals(
          L.dropLeftWhile(isLTThree)(l),
          pipe(l, L.toArray, A.dropLeftWhile(isLTThree), L.fromArray)
        )
      )
    )
  })

  it('reverse', () => {
    fc.assert(fc.property(listArb, l => eqListElement.equals(L.reverse(l), pipe(l, L.toArray, A.reverse, L.fromArray))))
  })

  it('map', () => {
    const checkProperty = (f: (a: number) => number, l: L.List<number>): boolean =>
      eqListElement.equals(pipe(l, L.map(f)), pipe(l, L.toArray, A.map(f), L.fromArray))

    assert.ok(checkProperty(identity, L.of(6)))
    fc.assert(fc.property(listArb, l => checkProperty((a: number) => a ** 2, l)))
  })

  it('reduce', () => {
    const f = (a: number, b: number): number => a + b

    fc.assert(
      fc.property(listArb, l => Eq.eqNumber.equals(pipe(l, L.reduce(0, f)), pipe(l, L.toArray, A.reduce(0, f))))
    )
  })

  it('foldMap', () => {
    fc.assert(
      fc.property(listArb, l =>
        Eq.eqNumber.equals(pipe(l, L.foldMap(monoidSum)(identity)), pipe(l, L.toArray, A.foldMap(monoidSum)(identity)))
      )
    )
  })

  it('toArray/fromArray', () => {
    fc.assert(fc.property(fc.array(elementArb), as => eqArrayElement.equals(as, pipe(as, L.fromArray, L.toArray))))
  })

  it('toReversedArray', () => {
    fc.assert(fc.property(listArb, l => eqListElement.equals(l, pipe(l, L.toReversedArray, L.fromArray, L.reverse))))
  })

  it('reduceRight', () => {
    const f = (a: number, b: number): number => a + b

    fc.assert(
      fc.property(listArb, l =>
        Eq.eqNumber.equals(pipe(l, L.reduceRight(0, f)), pipe(l, L.toArray, A.reduceRight(0, f)))
      )
    )
  })

  it('traverse', () => {
    const eq = O.getEq(eqListElement)
    const listTraverseO = L.list.traverse(O.option)
    const arrayTraverseO = A.array.traverse(O.option)
    const listArb = fc.array(fc.nat()).map(L.fromArray)
    const f = (n: number): O.Option<number> => (n % 2 === 0 ? O.none : O.some(n))

    fc.assert(
      fc.property(listArb, l =>
        eq.equals(listTraverseO(l, f), pipe(arrayTraverseO(L.toArray(l), f), O.map(L.fromArray)))
      )
    )
  })

  it('sequence', () => {
    const eq = O.getEq(eqListElement)
    const listSequenceO = L.list.sequence(O.option)
    const arraySequenceO = A.array.sequence(O.option)
    const elementArb = fc.integer().map(n => (Math.random() > 0.5 ? O.some(n) : O.none))
    const listArb = fc.array(elementArb).map(L.fromArray)

    fc.assert(
      fc.property(listArb, l => eq.equals(listSequenceO(l), pipe(l, L.toArray, arraySequenceO, O.map(L.fromArray))))
    )
  })
})
