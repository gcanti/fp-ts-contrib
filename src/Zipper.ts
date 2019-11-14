/**
 * @file Provides a pointed array, which is a non-empty zipper-like array structure that tracks an index (focus)
 * position in an array. Focus can be moved forward and backwards through the array.
 *
 * The array `[1, 2, 3, 4]` with focus on `3` is represented by `Zipper([1, 2], 3, [4])`
 *
 * Adapted from
 *
 * - https://github.com/DavidHarrison/purescript-list-zipper
 * - https://github.com/thunklife/purescript-zipper
 * - https://github.com/scalaz/scalaz/blob/series/7.3.x/core/src/main/scala/scalaz/Zipper.scala
 */
import { Applicative, Applicative1 } from 'fp-ts/lib/Applicative'
import * as A from 'fp-ts/lib/Array'
import { Comonad1 } from 'fp-ts/lib/Comonad'
import { decrement, increment } from 'fp-ts/lib/function'
import { HKT } from 'fp-ts/lib/HKT'
import { Monoid } from 'fp-ts/lib/Monoid'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { none, Option, some } from 'fp-ts/lib/Option'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { Show } from 'fp-ts/lib/Show'
import { pipe, pipeable } from 'fp-ts/lib/pipeable'
import { Foldable1 } from 'fp-ts/lib/Foldable'
import { Traversable1 } from 'fp-ts/lib/Traversable'

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    Zipper: Zipper<A>
  }
}

/**
 * @since 0.1.6
 */
export const URI = 'Zipper'

/**
 * @since 0.1.6
 */
export type URI = typeof URI

/**
 * @since 0.1.6
 */
export interface Zipper<A> {
  readonly lefts: Array<A>
  readonly focus: A
  readonly rights: Array<A>
}

/**
 * Creates a new zipper.
 * @since 0.1.6
 */
export function make<A>(lefts: Array<A>, focus: A, rights: Array<A>): Zipper<A> {
  return { lefts, focus, rights }
}

/**
 * @since 0.1.6
 */
export function length<A>(fa: Zipper<A>): number {
  return fa.lefts.length + 1 + fa.rights.length
}

/**
 * Updates the focus of the zipper.
 * @since 0.1.6
 */
export function update<A>(a: A): (fa: Zipper<A>) => Zipper<A> {
  return fa => make(fa.lefts, a, fa.rights)
}

/**
 * Applies `f` to the focus and update with the result.
 * @since 0.1.6
 */
export function modify<A>(f: (a: A) => A): (fa: Zipper<A>) => Zipper<A> {
  return fa => pipe(fa, update(f(fa.focus)))
}

/**
 * @since 0.1.6
 */
export function toArray<A>(fa: Zipper<A>): Array<A> {
  return A.snoc(fa.lefts, fa.focus).concat(fa.rights)
}

/**
 * @since 0.1.6
 */
export function isOutOfBound<A>(index: number, fa: Zipper<A>): boolean {
  return index < 0 || index >= length(fa)
}

/**
 * Moves focus in the zipper, or `None` if there is no such element.
 * @since 0.1.6
 */
export function move<A>(f: (currentIndex: number) => number, fa: Zipper<A>): Option<Zipper<A>> {
  const newIndex = f(fa.lefts.length)
  if (isOutOfBound(newIndex, fa)) {
    return none
  } else {
    return fromArray(toArray(fa), newIndex)
  }
}

/**
 * Moves focus of the zipper up.
 * @since 0.1.6
 */
export function up<A>(fa: Zipper<A>): Option<Zipper<A>> {
  return move(decrement, fa)
}

/**
 * Moves focus of the zipper down.
 * @since 0.1.6
 */
export function down<A>(fa: Zipper<A>): Option<Zipper<A>> {
  return move(increment, fa)
}

/**
 * Moves focus to the start of the zipper.
 * @since 0.1.6
 */
export function start<A>(fa: Zipper<A>): Zipper<A> {
  if (A.isEmpty(fa.lefts)) {
    return fa
  } else {
    return make(A.empty, fa.lefts[0], A.snoc(pipe(fa.lefts, A.dropLeft(1)), fa.focus).concat(fa.rights))
  }
}

/**
 * Moves focus to the end of the zipper.
 * @since 0.1.6
 */
export function end<A>(fa: Zipper<A>): Zipper<A> {
  const len = fa.rights.length
  if (len === 0) {
    return fa
  } else {
    return make(A.snoc(fa.lefts, fa.focus).concat(pipe(fa.rights, A.takeLeft(len - 1))), fa.rights[len - 1], A.empty)
  }
}

/**
 * Inserts an element to the left of the focus and focuses on the new element.
 * @since 0.1.6
 */
export function insertLeft<A>(a: A): (fa: Zipper<A>) => Zipper<A> {
  return fa => make(fa.lefts, a, A.cons(fa.focus, fa.rights))
}

/**
 * Inserts an element to the right of the focus and focuses on the new element.
 * @since 0.1.6
 */
export function insertRight<A>(a: A): (fa: Zipper<A>) => Zipper<A> {
  return fa => make(A.snoc(fa.lefts, fa.focus), a, fa.rights)
}

/**
 * Deletes the element at focus and moves the focus to the left. If there is no element on the left,
 * the focus is moved to the right.
 * @since 0.1.6
 */
export function deleteLeft<A>(fa: Zipper<A>): Option<Zipper<A>> {
  const len = fa.lefts.length
  return fromArray(fa.lefts.concat(fa.rights), len > 0 ? len - 1 : 0)
}

/**
 * Deletes the element at focus and moves the focus to the right. If there is no element on the right,
 * the focus is moved to the left.
 * @since 0.1.6
 */
export function deleteRight<A>(fa: Zipper<A>): Option<Zipper<A>> {
  const lenl = fa.lefts.length
  const lenr = fa.rights.length
  return fromArray(fa.lefts.concat(fa.rights), lenr > 0 ? lenl : lenl - 1)
}

/**
 * @since 0.1.6
 */
export function getShow<A>(S: Show<A>): Show<Zipper<A>> {
  const SA = A.getShow(S)
  return {
    show: fa => `Zipper(${SA.show(fa.lefts)}, ${S.show(fa.focus)}, ${SA.show(fa.rights)})`
  }
}

/**
 * @since 0.1.6
 */
export function fromArray<A>(as: Array<A>, focusIndex: number = 0): Option<Zipper<A>> {
  if (A.isEmpty(as) || A.isOutOfBound(focusIndex, as)) {
    return none
  } else {
    return some(make(pipe(as, A.takeLeft(focusIndex)), as[focusIndex], pipe(as, A.dropLeft(focusIndex + 1))))
  }
}

/**
 * @since 0.1.6
 */
export function fromNonEmptyArray<A>(nea: NonEmptyArray<A>): Zipper<A> {
  return make(A.empty, nea[0], nea.slice(1))
}

/**
 * @since 0.1.6
 */
export function of<A>(focus: A): Zipper<A> {
  return make(A.empty, focus, A.empty)
}

function traverse<F>(F: Applicative<F>): <A, B>(ta: Zipper<A>, f: (a: A) => HKT<F, B>) => HKT<F, Zipper<B>> {
  const traverseF = A.array.traverse(F)
  return <A, B>(ta: Zipper<A>, f: (a: A) => HKT<F, B>) =>
    F.ap(
      F.ap(
        F.map(traverseF(ta.lefts, f), lefts => (focus: B) => (rights: Array<B>) => make(lefts, focus, rights)),
        f(ta.focus)
      ),
      traverseF(ta.rights, f)
    )
}

function sequence<F>(F: Applicative<F>): <A>(ta: Zipper<HKT<F, A>>) => HKT<F, Zipper<A>> {
  const sequenceF = A.array.sequence(F)
  return <A>(ta: Zipper<HKT<F, A>>) =>
    F.ap(
      F.ap(
        F.map(sequenceF(ta.lefts), lefts => (focus: A) => (rights: Array<A>) => make(lefts, focus, rights)),
        ta.focus
      ),
      sequenceF(ta.rights)
    )
}

function extend<A, B>(fa: Zipper<A>, f: (fa: Zipper<A>) => B): Zipper<B> {
  const lefts = fa.lefts.map((a, i) =>
    f(make(pipe(fa.lefts, A.takeLeft(i)), a, A.snoc(pipe(fa.lefts, A.dropLeft(i + 1)), fa.focus).concat(fa.rights)))
  )
  const rights = fa.rights.map((a, i) =>
    f(make(A.snoc(fa.lefts, fa.focus).concat(pipe(fa.rights, A.takeLeft(i))), a, pipe(fa.rights, A.dropLeft(i + 1))))
  )
  return make(lefts, f(fa), rights)
}

/**
 * @since 0.1.6
 */
export function getSemigroup<A>(S: Semigroup<A>): Semigroup<Zipper<A>> {
  return {
    concat: (x, y) => make(x.lefts.concat(y.lefts), S.concat(x.focus, y.focus), x.rights.concat(y.rights))
  }
}

/**
 * @since 0.1.6
 */
export function getMonoid<A>(M: Monoid<A>): Monoid<Zipper<A>> {
  return {
    ...getSemigroup(M),
    empty: make(A.empty, M.empty, A.empty)
  }
}

/**
 * @since 0.1.6
 */
export const zipper: Applicative1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI> = {
  URI,
  map: (z, f) => make(z.lefts.map(f), f(z.focus), z.rights.map(f)),
  of,
  ap: (fab, fa) => make(A.array.ap(fab.lefts, fa.lefts), fab.focus(fa.focus), A.array.ap(fab.rights, fa.rights)),
  extend,
  extract: <A>(fa: Zipper<A>): A => fa.focus,
  reduce: (fa, b, f) => fa.rights.reduce(f, f(fa.lefts.reduce(f, b), fa.focus)),
  reduceRight: (fa, b, f) => {
    const rights = fa.rights.reduceRight((acc, a) => f(a, acc), b)
    const focus = f(fa.focus, rights)
    return fa.lefts.reduceRight((acc, a) => f(a, acc), focus)
  },
  foldMap: M => (fa, f) => {
    const lefts = fa.lefts.reduce((acc, a) => M.concat(acc, f(a)), M.empty)
    const rights = fa.rights.reduce((acc, a) => M.concat(acc, f(a)), M.empty)
    return M.concat(M.concat(lefts, f(fa.focus)), rights)
  },
  traverse,
  sequence
}

const { ap, foldMap, map, reduce, reduceRight } = pipeable(zipper)

export {
  /**
   * @since 0.1.6
   */
  ap,
  /**
   * @since 0.1.6
   */
  foldMap,
  /**
   * @since 0.1.6
   */
  map,
  /**
   * @since 0.1.6
   */
  reduce,
  /**
   * @since 0.1.6
   */
  reduceRight
}
