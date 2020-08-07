/**
 * Provides a pointed array, which is a non-empty zipper-like array structure that tracks an index (focus)
 * position in an array. Focus can be moved forward and backwards through the array.
 *
 * The array `[1, 2, 3, 4]` with focus on `3` is represented by `Zipper([1, 2], 3, [4])`
 *
 * Adapted from
 *
 * - https://github.com/DavidHarrison/purescript-list-zipper
 * - https://github.com/thunklife/purescript-zipper
 * - https://github.com/scalaz/scalaz/blob/series/7.3.x/core/src/main/scala/scalaz/Zipper.scala
 *
 * @since 0.1.6
 */
import { Applicative as ApplicativeHKT, Applicative1 } from 'fp-ts/lib/Applicative'
import { Apply1 } from 'fp-ts/lib/Apply'
import * as A from 'fp-ts/lib/Array'
import { Comonad1 } from 'fp-ts/lib/Comonad'
import { Extend1 } from 'fp-ts/lib/Extend'
import { Foldable1 } from 'fp-ts/lib/Foldable'
import { decrement, increment, identity } from 'fp-ts/lib/function'
import { Functor1 } from 'fp-ts/lib/Functor'
import { FunctorWithIndex1 } from 'fp-ts/lib/FunctorWithIndex'
import { HKT } from 'fp-ts/lib/HKT'
import { Monoid } from 'fp-ts/lib/Monoid'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { none, Option, some } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { Show } from 'fp-ts/lib/Show'
import { Traversable1 } from 'fp-ts/lib/Traversable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 0.1.6
 */
export interface Zipper<A> {
  readonly lefts: Array<A>
  readonly focus: A
  readonly rights: Array<A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Creates a new zipper.
 *
 * @category constructors
 * @since 0.1.6
 */
export const make: <A>(lefts: Array<A>, focus: A, rights: Array<A>) => Zipper<A> = (lefts, focus, rights) => ({
  lefts,
  focus,
  rights,
})

/**
 * @category constructors
 * @since 0.1.6
 */
export const fromArray: <A>(as: Array<A>, focusIndex?: number) => Option<Zipper<A>> = (as, focusIndex = 0) => {
  if (A.isEmpty(as) || A.isOutOfBound(focusIndex, as)) {
    return none
  } else {
    return some(make(pipe(as, A.takeLeft(focusIndex)), as[focusIndex], pipe(as, A.dropLeft(focusIndex + 1))))
  }
}

/**
 * @category constructors
 * @since 0.1.6
 */
export const fromNonEmptyArray: <A>(nea: NonEmptyArray<A>) => Zipper<A> = (nea) => make(A.empty, nea[0], nea.slice(1))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 0.1.18
 */
export const isOutOfBound: <A>(index: number, fa: Zipper<A>) => boolean = (index, fa) =>
  index < 0 || index >= length(fa)

/**
 * @category destructors
 * @since 0.1.6
 */
export const length: <A>(fa: Zipper<A>) => number = (fa) => fa.lefts.length + 1 + fa.rights.length

/**
 * @category destructors
 * @since 0.1.6
 */
export const toArray: <A>(fa: Zipper<A>) => Array<A> = (fa) => A.snoc(fa.lefts, fa.focus).concat(fa.rights)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Updates the focus of the zipper.
 *
 * @category combinators
 * @since 0.1.6
 */
export const update: <A>(a: A) => (fa: Zipper<A>) => Zipper<A> = (a) => (fa) => make(fa.lefts, a, fa.rights)

/**
 * Applies `f` to the focus and update with the result.
 *
 * @category combinators
 * @since 0.1.6
 */
export const modify: <A>(f: (a: A) => A) => (fa: Zipper<A>) => Zipper<A> = (f) => (fa) => pipe(fa, update(f(fa.focus)))

/**
 * Moves focus in the zipper, or `None` if there is no such element.
 *
 * @category combinators
 * @since 0.1.6
 */
export const move: <A>(f: (currentIndex: number) => number, fa: Zipper<A>) => Option<Zipper<A>> = (f, fa) => {
  const newIndex = f(fa.lefts.length)
  if (isOutOfBound(newIndex, fa)) {
    return none
  } else {
    return fromArray(toArray(fa), newIndex)
  }
}

/**
 * Moves focus of the zipper up.
 *
 * @category combinators
 * @since 0.1.6
 */
export const up: <A>(fa: Zipper<A>) => Option<Zipper<A>> = (fa) => move(decrement, fa)

/**
 * Moves focus of the zipper down.
 *
 * @category combinators
 * @since 0.1.6
 */
export const down: <A>(fa: Zipper<A>) => Option<Zipper<A>> = (fa) => move(increment, fa)

/**
 * Moves focus to the start of the zipper.
 *
 * @category combinators
 * @since 0.1.6
 */
export const start: <A>(fa: Zipper<A>) => Zipper<A> = (fa) => {
  if (A.isEmpty(fa.lefts)) {
    return fa
  } else {
    return make(A.empty, fa.lefts[0], A.snoc(pipe(fa.lefts, A.dropLeft(1)), fa.focus).concat(fa.rights))
  }
}

/**
 * Moves focus to the end of the zipper.
 *
 * @category combinators
 * @since 0.1.6
 */
export const end: <A>(fa: Zipper<A>) => Zipper<A> = (fa) => {
  const len = fa.rights.length
  if (len === 0) {
    return fa
  } else {
    return make(A.snoc(fa.lefts, fa.focus).concat(pipe(fa.rights, A.takeLeft(len - 1))), fa.rights[len - 1], A.empty)
  }
}

/**
 * Inserts an element to the left of the focus and focuses on the new element.
 *
 * @category combinators
 * @since 0.1.6
 */
export const insertLeft: <A>(a: A) => (fa: Zipper<A>) => Zipper<A> = (a) => (fa) =>
  make(fa.lefts, a, A.cons(fa.focus, fa.rights))

/**
 * Inserts an element to the right of the focus and focuses on the new element.
 *
 * @category combinators
 * @since 0.1.6
 */
export const insertRight: <A>(a: A) => (fa: Zipper<A>) => Zipper<A> = (a) => (fa) =>
  make(A.snoc(fa.lefts, fa.focus), a, fa.rights)

/**
 * Deletes the element at focus and moves the focus to the left. If there is no element on the left,
 * the focus is moved to the right.
 *
 * @category combinators
 * @since 0.1.6
 */
export const deleteLeft: <A>(fa: Zipper<A>) => Option<Zipper<A>> = (fa) => {
  const len = fa.lefts.length
  return fromArray(fa.lefts.concat(fa.rights), len > 0 ? len - 1 : 0)
}

/**
 * Deletes the element at focus and moves the focus to the right. If there is no element on the right,
 * the focus is moved to the left.
 *
 * @category combinators
 * @since 0.1.6
 */
export const deleteRight: <A>(fa: Zipper<A>) => Option<Zipper<A>> = (fa) => {
  const lenl = fa.lefts.length
  const lenr = fa.rights.length
  return fromArray(fa.lefts.concat(fa.rights), lenr > 0 ? lenl : lenl - 1)
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const map_: Functor1<URI>['map'] = (fa, f) => make(fa.lefts.map(f), f(fa.focus), fa.rights.map(f))
const mapWithIndex_: FunctorWithIndex1<URI, number>['mapWithIndex'] = (fa, f) => {
  const l = fa.lefts.length
  return make(
    fa.lefts.map((a, i) => f(i, a)),
    f(l, fa.focus),
    fa.rights.map((a, i) => f(l + 1 + i, a))
  )
}
const ap_: Apply1<URI>['ap'] = (fab, fa) =>
  make(A.array.ap(fab.lefts, fa.lefts), fab.focus(fa.focus), A.array.ap(fab.rights, fa.rights))
const extend_: Extend1<URI>['extend'] = (fa, f) => {
  const lefts = fa.lefts.map((a, i) =>
    f(make(pipe(fa.lefts, A.takeLeft(i)), a, A.snoc(pipe(fa.lefts, A.dropLeft(i + 1)), fa.focus).concat(fa.rights)))
  )
  const rights = fa.rights.map((a, i) =>
    f(make(A.snoc(fa.lefts, fa.focus).concat(pipe(fa.rights, A.takeLeft(i))), a, pipe(fa.rights, A.dropLeft(i + 1))))
  )
  return make(lefts, f(fa), rights)
}
const reduce_: Foldable1<URI>['reduce'] = (fa, b, f) => fa.rights.reduce(f, f(fa.lefts.reduce(f, b), fa.focus))
const reduceRight_: Foldable1<URI>['reduceRight'] = (fa, b, f) => {
  const rights = fa.rights.reduceRight((acc, a) => f(a, acc), b)
  const focus = f(fa.focus, rights)
  return fa.lefts.reduceRight((acc, a) => f(a, acc), focus)
}
const foldMap_: Foldable1<URI>['foldMap'] = (M) => (fa, f) => {
  const lefts = fa.lefts.reduce((acc, a) => M.concat(acc, f(a)), M.empty)
  const rights = fa.rights.reduce((acc, a) => M.concat(acc, f(a)), M.empty)
  return M.concat(M.concat(lefts, f(fa.focus)), rights)
}
// TODO: add pipeable traverse fp-ts version >= 2.6.3
const traverse_ = <F>(F: ApplicativeHKT<F>): (<A, B>(ta: Zipper<A>, f: (a: A) => HKT<F, B>) => HKT<F, Zipper<B>>) => {
  const traverseF = A.array.traverse(F)
  return <A, B>(ta: Zipper<A>, f: (a: A) => HKT<F, B>) =>
    F.ap(
      F.ap(
        F.map(traverseF(ta.lefts, f), (lefts) => (focus: B) => (rights: Array<B>) => make(lefts, focus, rights)),
        f(ta.focus)
      ),
      traverseF(ta.rights, f)
    )
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 0.1.18
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Zipper<A>) => Zipper<B> = (f) => (fa) => map_(fa, f)

/**
 * @category FunctorWithIndex
 * @since 0.1.18
 */
export const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: Zipper<A>) => Zipper<B> = (f) => (fa) =>
  mapWithIndex_(fa, f)

/**
 * @category Apply
 * @since 0.1.18
 */
export const ap: <A>(fa: Zipper<A>) => <B>(fab: Zipper<(a: A) => B>) => Zipper<B> = (fa) => (fab) => ap_(fab, fa)

/**
 * @category Apply
 * @since 0.1.18
 */
export const apFirst = <B>(fb: Zipper<B>) => <A>(fa: Zipper<A>): Zipper<A> =>
  pipe(
    fa,
    map((a) => (_: B) => a),
    ap(fb)
  )

/**
 * @category Apply
 * @since 0.1.18
 */
export const apSecond = <B>(fb: Zipper<B>) => <A>(fa: Zipper<A>): Zipper<B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @category Applicative
 * @since 0.1.6
 */
export const of: <A>(focus: A) => Zipper<A> = (focus) => make(A.empty, focus, A.empty)

/**
 * @category Extend
 * @since 0.1.18
 */
export const extend: <A, B>(f: (fa: Zipper<A>) => B) => (wa: Zipper<A>) => Zipper<B> = (f) => (wa) => extend_(wa, f)

/**
 * @category Extend
 * @since 0.1.18
 */
export const duplicate: <A>(wa: Zipper<A>) => Zipper<Zipper<A>> = extend(identity)

/**
 * @category Foldable
 * @since 0.1.18
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Zipper<A>) => M = (M) => (f) => (fa) =>
  foldMap_(M)(fa, f)

/**
 * @category Foldable
 * @since 0.1.18
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Zipper<A>) => B = (b, f) => (fa) => reduce_(fa, b, f)

/**
 * @category Foldable
 * @since 0.1.18
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Zipper<A>) => B = (b, f) => (fa) =>
  reduceRight_(fa, b, f)

/**
 * @category Traversable
 * @since 0.1.18
 */
export const sequence: Traversable1<URI>['sequence'] = <F>(
  F: ApplicativeHKT<F>
): (<A>(ta: Zipper<HKT<F, A>>) => HKT<F, Zipper<A>>) => {
  const sequenceF = A.array.sequence(F)
  return <A>(ta: Zipper<HKT<F, A>>) =>
    F.ap(
      F.ap(
        F.map(sequenceF(ta.lefts), (lefts) => (focus: A) => (rights: Array<A>) => make(lefts, focus, rights)),
        ta.focus
      ),
      sequenceF(ta.rights)
    )
}

/**
 * @category Comonad
 * @since 0.1.18
 */
export const extract: Comonad1<URI>['extract'] = (fa) => fa.focus

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 0.1.6
 */
export const URI = 'Zipper'

/**
 * @category instances
 * @since 0.1.6
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    Zipper: Zipper<A>
  }
}

/**
 * @category instances
 * @since 0.1.6
 */
export const getShow: <A>(S: Show<A>) => Show<Zipper<A>> = (S) => {
  const SA = A.getShow(S)
  return {
    show: (fa) => `Zipper(${SA.show(fa.lefts)}, ${S.show(fa.focus)}, ${SA.show(fa.rights)})`,
  }
}

/**
 * @category instances
 * @since 0.1.6
 */
export const getSemigroup: <A>(S: Semigroup<A>) => Semigroup<Zipper<A>> = (S) => ({
  concat: (x, y) => make(x.lefts.concat(y.lefts), S.concat(x.focus, y.focus), x.rights.concat(y.rights)),
})

/**
 * @category instances
 * @since 0.1.6
 */
export const getMonoid: <A>(M: Monoid<A>) => Monoid<Zipper<A>> = (M) => ({
  ...getSemigroup(M),
  empty: make(A.empty, M.empty, A.empty),
})

/**
 * @category instances
 * @since 0.1.18
 */
export const Functor: Functor1<URI> = {
  URI,
  map: map_,
}

/**
 * @category instances
 * @since 0.1.18
 */
export const FunctorWithIndex: FunctorWithIndex1<URI, number> = {
  URI,
  map: map_,
  mapWithIndex: mapWithIndex_,
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Applicative: Applicative1<URI> = {
  URI,
  map: map_,
  ap: ap_,
  of,
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Apply: Apply1<URI> = {
  URI,
  map: map_,
  ap: ap_,
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Foldable: Foldable1<URI> = {
  URI,
  foldMap: foldMap_,
  reduce: reduce_,
  reduceRight: reduceRight_,
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
  sequence,
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Comonad: Comonad1<URI> = {
  URI,
  map: map_,
  extend: extend_,
  extract,
}

/**
 * @category instances
 * @since 0.1.6
 */
export const zipper: Applicative1<URI> &
  Foldable1<URI> &
  Traversable1<URI> &
  Comonad1<URI> &
  FunctorWithIndex1<URI, number> = {
  URI,
  map: map_,
  of,
  ap: ap_,
  extend: extend_,
  extract,
  reduce: reduce_,
  reduceRight: reduceRight_,
  foldMap: foldMap_,
  traverse: traverse_,
  sequence,
  mapWithIndex: mapWithIndex_,
}
