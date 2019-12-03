/**
 * @file Adapted from https://github.com/purescript/purescript-lists
 */

import { Foldable1 } from 'fp-ts/lib/Foldable'
import { Functor1 } from 'fp-ts/lib/Functor'
import * as A from 'fp-ts/lib/Array'
import { Traversable1 } from 'fp-ts/lib/Traversable'
import { Applicative } from 'fp-ts/lib/Applicative'
import { HKT } from 'fp-ts/lib/HKT'
import * as O from 'fp-ts/lib/Option'
import { pipeable } from 'fp-ts/lib/pipeable'
import { Predicate, Refinement } from 'fp-ts/lib/function'

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    List: List<A>
  }
}

/**
 * @since ###
 */
export const URI = 'List'

/**
 * @since ###
 */
export type URI = typeof URI

/**
 * @since ###
 */
export interface Nil {
  readonly type: 'Nil'
  readonly length: 0
}

/**
 * @since ###
 */
export interface Cons<A> {
  readonly type: 'Cons'
  readonly head: A
  readonly tail: List<A>
  readonly length: number
}

/**
 * @since ###
 */
export type List<A> = Nil | Cons<A>

/**
 * @since ###
 */
export const nil: List<never> = { type: 'Nil', length: 0 }

/**
 * @since ###
 */
export function cons<A>(head: A, tail: List<A>): List<A> {
  return { type: 'Cons', head, tail, length: 1 + tail.length }
}

/**
 * Creates a list with a single element.
 *
 * @since ###
 */
export function of<A>(head: A): List<A> {
  return cons(head, nil)
}

/**
 * @since ###
 */
export function isNil<A>(a: List<A>): a is Nil {
  return a.type === 'Nil'
}

/**
 * @since ###
 */
export function isCons<A>(a: List<A>): a is Cons<A> {
  return a.type === 'Cons'
}

/**
 * Gets the first element in a list, or `None` if the list is empty.
 *
 * @since ###
 */
export function head<A>(fa: List<A>): O.Option<A> {
  return isCons(fa) ? O.some(fa.head) : O.none
}

/**
 * Gets all but the first element of a list, or `None` if the list is empty.
 *
 * @since ###
 */
export function tail<A>(fa: List<A>): O.Option<List<A>> {
  return isCons(fa) ? O.some(fa.tail) : O.none
}

/**
 * Breaks a list into its first element and the remaining elements.
 *
 * @since ###
 */
export function foldLeft<A, B>(onNil: () => B, onCons: (head: A, tail: List<A>) => B): (fa: List<A>) => B {
  return fa => (isNil(fa) ? onNil() : onCons(fa.head, fa.tail))
}

/**
 * Finds the first index for which a predicate holds.
 *
 * @since ###
 */
export function findIndex<A>(predicate: Predicate<A>): (fa: List<A>) => O.Option<number> {
  return fa => {
    let l: List<A> = fa
    let i = 0
    while (isCons(l)) {
      if (predicate(l.head)) return O.some(i)
      l = l.tail
      i++
    }
    return O.none
  }
}

/**
 * Reverse a list.
 *
 * @since ###
 */
export function reverse<A>(fa: List<A>): List<A> {
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
 * @since ###
 */
export function dropLeft(n: number): <A>(fa: List<A>) => List<A> {
  return <A>(fa: List<A>) => {
    if (isNil(fa)) return nil

    let i = 0
    let l: List<A> = fa
    while (isCons(l) && i < n) {
      i++
      l = l.tail
    }
    return l
  }
}

/**
 * Drops those elements from the front of a list which match a predicate.
 *
 * @since ###
 */
export function dropLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (fa: List<A>) => List<B>
export function dropLeftWhile<A>(predicate: Predicate<A>): (fa: List<A>) => List<A>
export function dropLeftWhile<A>(predicate: Predicate<A>): (fa: List<A>) => List<A> {
  return fa => {
    if (isNil(fa)) return nil

    let l: List<A> = fa
    while (isCons(l) && predicate(l.head)) {
      l = l.tail
    }
    return l
  }
}

/**
 * Gets an array from a list.
 *
 * @since ###
 */
export function toArray<A>(fa: List<A>): Array<A> {
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
 * @since ###
 */
export function toReversedArray<A>(fa: List<A>): Array<A> {
  const length = fa.length
  const out: Array<A> = new Array(length)
  let l: List<A> = fa
  for (let i = 0; i < length; i++) {
    out[length - i - 1] = (l as Cons<A>).head
    l = (l as Cons<A>).tail
  }
  return out
}

/**
 * Creates a list from an array
 *
 * @since ###
 */
export function fromArray<A>(as: Array<A>): List<A> {
  return A.array.reduceRight<A, List<A>>(as, nil, cons)
}

/**
 * @since ###
 */
export const list: Functor1<URI> & Foldable1<URI> & Traversable1<URI> = {
  URI,
  map: <A, B>(fa: List<A>, f: (a: A) => B) => list.reduceRight<A, List<B>>(fa, nil, (a, b) => cons(f(a), b)),
  reduce: (fa, b, f) => {
    let out = b
    let l = fa
    while (isCons(l)) {
      out = f(out, l.head)
      l = l.tail
    }
    return out
  },
  foldMap: M => (fa, f) => {
    let out = M.empty
    let l = fa
    while (isCons(l)) {
      out = M.concat(out, f(l.head))
      l = l.tail
    }
    return out
  },
  reduceRight: (fa, b, f) => A.array.reduceRight(toArray(fa), b, f),
  traverse: <F>(F: Applicative<F>): (<A, B>(ta: List<A>, f: (a: A) => HKT<F, B>) => HKT<F, List<B>>) => {
    return <A, B>(ta: List<A>, f: (a: A) => HKT<F, B>) =>
      list.reduceRight(ta, F.of<List<B>>(nil), (a, fbs) =>
        F.ap(
          F.map(fbs, bs => (b: B) => cons(b, bs)),
          f(a)
        )
      )
  },
  sequence: <F>(F: Applicative<F>) => <A>(ta: List<HKT<F, A>>): HKT<F, List<A>> => {
    return list.reduceRight(ta, F.of<List<A>>(nil), (a, fas) =>
      F.ap(
        F.map(fas, as => (a: A) => cons(a, as)),
        a
      )
    )
  }
}

const { map, reduce, foldMap, reduceRight } = pipeable(list)

export {
  /**
   * @since ###
   */
  map,
  /**
   * @since ###
   */
  reduce,
  /**
   * @since ###
   */
  foldMap,
  /**
   * @since ###
   */
  reduceRight
}
