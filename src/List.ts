/**
 * Adapted from https://github.com/purescript/purescript-lists
 *
 * @since 0.1.8
 */
import { Applicative } from 'fp-ts/lib/Applicative'
import * as A from 'fp-ts/lib/Array'
import * as Eq from 'fp-ts/lib/Eq'
import { Foldable1 } from 'fp-ts/lib/Foldable'
import { Predicate, Refinement } from 'fp-ts/lib/function'
import { Functor1 } from 'fp-ts/lib/Functor'
import { HKT } from 'fp-ts/lib/HKT'
import * as O from 'fp-ts/lib/Option'
import { Traversable1 } from 'fp-ts/lib/Traversable'
import { Monoid } from 'fp-ts/lib/Monoid'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 0.1.8
 */
export interface Nil {
  readonly type: 'Nil'
  readonly length: 0
}

/**
 * @category model
 * @since 0.1.8
 */
export interface Cons<A> {
  readonly type: 'Cons'
  readonly head: A
  readonly tail: List<A>
  readonly length: number
}

/**
 * @category model
 * @since 0.1.8
 */
export type List<A> = Nil | Cons<A>

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 0.1.8
 */
export const nil: List<never> = { type: 'Nil', length: 0 }

/**
 * Attaches an element to the front of a list.
 *
 * @example
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * assert.deepStrictEqual(L.cons('a', L.nil), { type: 'Cons', head: 'a', tail: L.nil, length: 1 })
 *
 * @category constructors
 * @since 0.1.8
 */
export const cons: <A>(head: A, tail: List<A>) => List<A> = (head, tail) => ({
  type: 'Cons',
  head,
  tail,
  length: 1 + tail.length
})

/**
 * Creates a list from an array
 *
 * @example
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * assert.deepStrictEqual(L.fromArray([]), L.nil)
 * assert.deepStrictEqual(L.fromArray(['a', 'b']), L.cons('a', L.of('b')))
 *
 * @category constructors
 * @since 0.1.8
 */
export const fromArray = <A>(as: Array<A>): List<A> => A.array.reduceRight<A, List<A>>(as, nil, cons)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Gets the first element in a list, or `None` if the list is empty.
 *
 * @example
 * import * as O from 'fp-ts/lib/Option'
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * assert.deepStrictEqual(L.head(L.nil), O.none)
 * assert.deepStrictEqual(L.head(L.cons('x', L.of('a'))), O.some('x'))
 *
 * @category destructors
 * @since 0.1.8
 */
export const head: <A>(fa: List<A>) => O.Option<A> = (fa) => (isCons(fa) ? O.some(fa.head) : O.none)

/**
 * Gets all but the first element of a list, or `None` if the list is empty.
 *
 * @example
 * import * as O from 'fp-ts/lib/Option'
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * assert.deepStrictEqual(L.tail(L.nil), O.none)
 * assert.deepStrictEqual(L.tail(L.of('a')), O.some(L.nil))
 * assert.deepStrictEqual(L.tail(L.cons('x', L.of('a'))), O.some(L.of('a')))
 *
 * @category destructors
 * @since 0.1.8
 */
export const tail: <A>(fa: List<A>) => O.Option<List<A>> = (fa) => (isCons(fa) ? O.some(fa.tail) : O.none)

/**
 * Breaks a list into its first element and the remaining elements.
 *
 * @example
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * const len: <A>(as: L.List<A>) => number = L.foldLeft(
 *   () => 0,
 *   (_, tail) => 1 + len(tail)
 * )
 * assert.deepStrictEqual(len(L.cons('a', L.of('b'))), 2)
 *
 * @category destructors
 * @since 0.1.8
 */
export const foldLeft: <A, B>(onNil: () => B, onCons: (head: A, tail: List<A>) => B) => (fa: List<A>) => B = (
  onNil,
  onCons
) => (fa) => (isNil(fa) ? onNil() : onCons(fa.head, fa.tail))

/**
 * Gets an array from a list.
 *
 * @example
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * assert.deepStrictEqual(L.toArray(L.cons('a', L.of('b'))), ['a', 'b'])
 *
 * @category destructors
 * @since 0.1.8
 */
export const toArray = <A>(fa: List<A>): Array<A> => {
  const length = fa.length
  const out: Array<A> = new Array(length)
  let l: List<A> = fa
  for (let i = 0; i < length; i++) {
    out[i] = (l as Cons<A>).head
    l = (l as Cons<A>).tail
  }
  return out
}

/**
 * Gets an array from a list in a reversed order.
 *
 * @example
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * assert.deepStrictEqual(L.toReversedArray(L.cons('a', L.of('b'))), ['b', 'a'])
 *
 * @category destructors
 * @since 0.1.8
 */
export const toReversedArray = <A>(fa: List<A>): Array<A> => {
  const length = fa.length
  const out: Array<A> = new Array(length)
  let l: List<A> = fa
  for (let i = 0; i < length; i++) {
    out[length - i - 1] = (l as Cons<A>).head
    l = (l as Cons<A>).tail
  }
  return out
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Reverse a list.
 *
 * @example
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * assert.deepStrictEqual(L.reverse(L.cons(1, L.cons(2, L.of(3)))), L.cons(3, L.cons(2, L.of(1))))
 *
 * @category combinators
 * @since 0.1.8
 */
export const reverse = <A>(fa: List<A>): List<A> => {
  let out: List<A> = nil
  let l = fa
  while (isCons(l)) {
    out = cons(l.head, out)
    l = l.tail
  }
  return out
}

/**
 * Drops the specified number of elements from the front of a list.
 *
 * @example
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * assert.deepStrictEqual(L.dropLeft(1)(L.nil), L.nil)
 * assert.deepStrictEqual(L.dropLeft(1)(L.cons(1, L.of(2))), L.of(2))
 * assert.deepStrictEqual(L.dropLeft(3)(L.cons(1, L.of(2))), L.nil)
 *
 * @category combinators
 * @since 0.1.8
 */
export const dropLeft = (n: number) => <A>(fa: List<A>): List<A> => {
  if (isNil(fa)) return nil
  let i = 0
  let l: List<A> = fa
  while (isCons(l) && i < n) {
    i++
    l = l.tail
  }
  return l
}

/**
 * Drops those elements from the front of a list which match a predicate.
 *
 * @example
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * const isLTThree = (n: number) => n < 3
 * assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.nil), L.nil)
 * assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.cons(1, L.cons(2, L.of(3)))), L.of(3))
 * assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.cons(1, L.of(2))), L.nil)
 *
 * @since 0.1.8
 */
export function dropLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (fa: List<A>) => List<B>
export function dropLeftWhile<A>(predicate: Predicate<A>): (fa: List<A>) => List<A>
export function dropLeftWhile<A>(predicate: Predicate<A>): (fa: List<A>) => List<A> {
  return (fa) => {
    if (isNil(fa)) return nil

    let l: List<A> = fa
    while (isCons(l) && predicate(l.head)) {
      l = l.tail
    }
    return l
  }
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const map_ = <A, B>(fa: List<A>, f: (a: A) => B) =>
  A.array.reduceRight<A, List<B>>(toArray(fa), nil, (a, b) => cons(f(a), b))
const reduce_: Foldable1<URI>['reduce'] = (fa, b, f) => {
  let out = b
  let l = fa
  while (isCons(l)) {
    out = f(out, l.head)
    l = l.tail
  }
  return out
}
const reduceRight_: Foldable1<URI>['reduceRight'] = (fa, b, f) => A.array.reduceRight(toArray(fa), b, f)
const foldMap_: Foldable1<URI>['foldMap'] = (M) => (fa, f) => {
  let out = M.empty
  let l = fa
  while (isCons(l)) {
    out = M.concat(out, f(l.head))
    l = l.tail
  }
  return out
}
const traverse_ = <F>(F: Applicative<F>): (<A, B>(ta: List<A>, f: (a: A) => HKT<F, B>) => HKT<F, List<B>>) => {
  return <A, B>(ta: List<A>, f: (a: A) => HKT<F, B>) =>
    list.reduceRight(ta, F.of<List<B>>(nil), (a, fbs) =>
      F.ap(
        F.map(fbs, (bs) => (b: B) => cons(b, bs)),
        f(a)
      )
    )
}
const sequence_ = <F>(F: Applicative<F>) => <A>(ta: List<HKT<F, A>>): HKT<F, List<A>> => {
  return list.reduceRight(ta, F.of<List<A>>(nil), (a, fas) =>
    F.ap(
      F.map(fas, (as) => (a: A) => cons(a, as)),
      a
    )
  )
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 0.1.18
 */
export const map: <A, B>(f: (a: A) => B) => (fa: List<A>) => List<B> = (f) => (fa) => map_(fa, f)

/**
 * @category Foldable
 * @since 0.1.18
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: List<A>) => B = (b, f) => (fa) => reduce_(fa, b, f)

/**
 * @category Foldable
 * @since 0.1.18
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: List<A>) => B = (b, f) => (fa) =>
  reduceRight_(fa, b, f)

/**
 * @category Foldable
 * @since 0.1.18
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: List<A>) => M = (M) => (f) => (fa) =>
  foldMap_(M)(fa, f)

// TODO: add pipeable traverse when fp-ts version >= 2.6.3
// /**
//  * @category Traversable
//  * @since 0.1.18
//  */
// export const traverse: PipeableTraverse1<URI> = <F>(
//   F: Applicative<F>
// ): (<A, B>(f: (a: A) => HKT<F, B>) => (ta: List<A>) => HKT<F, List<B>>) => {
//   const traverseF = traverse_(F)
//   return f => ta => traverseF(ta, f)
// }

/**
 * @category Traversable
 * @since 0.1.18
 */
export const sequence: Traversable1<URI>['sequence'] = <F>(
  F: Applicative<F>
): (<A>(ta: List<HKT<F, A>>) => HKT<F, List<A>>) => sequence_(F)

/**
 * Creates a list with a single element.
 *
 * @example
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * assert.deepStrictEqual(L.of('a'), L.cons('a', L.nil))
 *
 * @category Applicative
 * @since 0.1.8
 */
export const of: <A>(head: A) => List<A> = (head) => cons(head, nil)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Finds the first index for which a predicate holds.
 *
 * @example
 * import * as O from 'fp-ts/lib/Option'
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * const f = (a: number): boolean => a % 2 === 0
 * const findIndexEven = L.findIndex(f)
 * assert.deepStrictEqual(findIndexEven(L.nil), O.none)
 * assert.deepStrictEqual(findIndexEven(L.cons(1, L.of(2))), O.some(1))
 * assert.deepStrictEqual(findIndexEven(L.of(1)), O.none)
 *
 * @since 0.1.8
 */
export const findIndex = <A>(predicate: Predicate<A>) => (fa: List<A>): O.Option<number> => {
  let l: List<A> = fa
  let i = 0
  while (isCons(l)) {
    if (predicate(l.head)) return O.some(i)
    l = l.tail
    i++
  }
  return O.none
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 0.1.8
 */
export const URI = 'List'

/**
 * @category instances
 * @since 0.1.8
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    List: List<A>
  }
}

/**
 * Derives an `Eq` over the `List` of a given element type from the `Eq` of that type.
 * The derived `Eq` defines two lists as equal if all elements of both lists
 * are compared equal pairwise with the given `E`. In case of lists of different
 * lengths, the result is non equality.
 *
 * @example
 * import { eqString } from 'fp-ts/lib/Eq'
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * const E = L.getEq(eqString)
 * assert.strictEqual(E.equals(L.cons('a', L.of('b')), L.cons('a', L.of('b'))), true)
 * assert.strictEqual(E.equals(L.of('x'), L.nil), false)
 *
 * @category instances
 * @since 0.1.8
 */
export const getEq = <A>(E: Eq.Eq<A>): Eq.Eq<List<A>> => ({
  equals: (x, y) => {
    if (x.length !== y.length) return false
    let lx = x
    let ly = y
    while (isCons(lx) && isCons(ly)) {
      if (!E.equals(lx.head, ly.head)) return false
      lx = lx.tail
      ly = ly.tail
    }
    return true
  }
})

/**
 * @category instances
 * @since 0.1.18
 */
export const Functor: Functor1<URI> = {
  URI,
  map: map_
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Foldable: Foldable1<URI> = {
  URI,
  foldMap: foldMap_,
  reduce: reduce_,
  reduceRight: reduceRight_
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Traversable: Traversable1<URI> = {
  URI,
  map: map_,
  foldMap: foldMap_,
  reduce: reduce_,
  reduceRight: reduceRight_,
  traverse: traverse_,
  sequence: sequence_
}

/**
 * @category instances
 * @since 0.1.8
 */
export const list: Functor1<URI> & Foldable1<URI> & Traversable1<URI> = {
  URI,
  map: map_,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  traverse: traverse_,
  sequence: sequence_
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Tests whether a list is an empty list.
 *
 * @example
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * assert.strictEqual(L.isNil(L.nil), true)
 * assert.strictEqual(L.isNil(L.of(6)), false)
 *
 * @since 0.1.8
 */
export const isNil = <A>(a: List<A>): a is Nil => a.type === 'Nil'

/**
 * Tests whether a list is a non empty list.
 *
 * @example
 * import * as L from 'fp-ts-contrib/lib/List'
 *
 * assert.strictEqual(L.isCons(L.nil), false)
 * assert.strictEqual(L.isCons(L.of(1)), true)
 *
 * @since 0.1.8
 */
export const isCons = <A>(a: List<A>): a is Cons<A> => a.type === 'Cons'
