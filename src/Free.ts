/**
 * @since 0.1.3
 */
import { Applicative2 } from 'fp-ts/lib/Applicative'
import { Apply2 } from 'fp-ts/lib/Apply'
import { identity } from 'fp-ts/lib/function'
import { Functor2 } from 'fp-ts/lib/Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3 } from 'fp-ts/lib/Monad'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @data
 * @constructor Pure
 * @constructor Impure
 * @category model
 * @since 0.1.3
 */
export type Free<F, A> = Pure<F, A> | Impure<F, A, any>

interface Pure<_F, A> {
  readonly _tag: 'Pure'
  readonly value: A
}

interface Impure<F, A, X> {
  readonly _tag: 'Impure'
  readonly fx: HKT<F, X>
  readonly f: (x: X) => Free<F, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

const impure = <F, A, X>(fx: HKT<F, X>, f: (x: X) => Free<F, A>): Free<F, A> => ({ _tag: 'Impure', fx, f })

/**
 * Lift an impure value described by the generating type constructor `F` into the free monad
 *
 * @category constructors
 * @since 0.1.3
 */
export const liftF = <F, A>(fa: HKT<F, A>): Free<F, A> => impure(fa, a => free.of(a))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 0.1.3
 */
export interface FoldFree3<M extends URIS3> {
  <F extends URIS3, U, L, A>(nt: <X>(fa: Kind3<F, U, L, X>) => Kind3<M, U, L, X>, fa: Free<F, A>): Kind3<M, U, L, A>
  <F extends URIS2, U, L, A>(nt: <X>(fa: Kind2<F, L, X>) => Kind3<M, U, L, X>, fa: Free<F, A>): Kind3<M, U, L, A>
  <F extends URIS, U, L, A>(nt: <X>(fa: Kind<F, X>) => Kind3<M, U, L, X>, fa: Free<F, A>): Kind3<M, U, L, A>
}

/**
 * @category destructors
 * @since 0.1.3
 */
export interface FoldFree2<M extends URIS2> {
  <F extends URIS2, L, A>(nt: <X>(fa: Kind2<F, L, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
  <F extends URIS, L, A>(nt: <X>(fa: Kind<F, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
}

/**
 * @category destructors
 * @since 0.1.3
 */
export interface FoldFree2C<M extends URIS2, L> {
  <F extends URIS2, A>(nt: <X>(fa: Kind2<F, L, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
  <F extends URIS, A>(nt: <X>(fa: Kind<F, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
}

/**
 * Perform folding of a free monad using given natural transformation as an interpreter
 *
 * @category destructors
 * @since 0.1.3
 */
export function foldFree<M extends URIS3>(M: Monad3<M>): FoldFree3<M>
export function foldFree<M extends URIS2>(M: Monad2<M>): FoldFree2<M>
export function foldFree<M extends URIS2, L>(M: Monad2C<M, L>): FoldFree2C<M, L>
export function foldFree<M extends URIS>(
  M: Monad1<M>
): <F extends URIS, A>(nt: <X>(fa: Kind<F, X>) => Kind<M, X>, fa: Free<F, A>) => Kind<M, A>
export function foldFree<M>(M: Monad<M>): <F, A>(nt: <X>(fa: HKT<F, X>) => HKT<M, X>, fa: Free<F, A>) => HKT<M, A>
export function foldFree<M>(M: Monad<M>): <F, A>(nt: any, fa: Free<F, A>) => HKT<M, A> {
  return (nt, fa) => {
    if (isPure(fa)) {
      return M.of(fa.value)
    } else {
      return M.chain(nt(fa.fx), x => foldFree(M)(nt, fa.f(x)))
    }
  }
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

const substFree = <F, G>(f: <A>(fa: HKT<F, A>) => Free<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>) => {
  function go<A>(fa: Free<F, A>): Free<G, A> {
    switch (fa._tag) {
      case 'Pure':
        return free.of(fa.value)
      case 'Impure':
        return free.chain(f(fa.fx), x => go(fa.f(x)))
    }
  }
  return go
}

/**
 * Use a natural transformation to change the generating type constructor of a free monad
 *
 * @category combinators
 * @since 0.1.3
 */
export function hoistFree<F extends URIS3 = never, G extends URIS3 = never>(
  nt: <U, L, A>(fa: Kind3<F, U, L, A>) => Kind3<G, U, L, A>
): <A>(fa: Free<F, A>) => Free<G, A>
export function hoistFree<F extends URIS2 = never, G extends URIS2 = never>(
  nt: <L, A>(fa: Kind2<F, L, A>) => Kind2<G, L, A>
): <A>(fa: Free<F, A>) => Free<G, A>
export function hoistFree<F extends URIS = never, G extends URIS = never>(
  nt: <A>(fa: Kind<F, A>) => Kind<G, A>
): <A>(fa: Free<F, A>) => Free<G, A>
export function hoistFree<F, G>(nt: <A>(fa: HKT<F, A>) => HKT<G, A>): <A>(fa: Free<F, A>) => Free<G, A>
export function hoistFree<F, G>(nt: <A>(fa: HKT<F, A>) => HKT<G, A>): <A>(fa: Free<F, A>) => Free<G, A> {
  return substFree(fa => liftF(nt(fa)))
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const map_: <F, A, B>(fa: Free<F, A>, f: (a: A) => B) => Free<F, B> = (fa, f) =>
  isPure(fa) ? free.of(f(fa.value)) : impure(fa.fx, x => free.map(fa.f(x), f))
const ap_: <F, A, B>(fab: Free<F, (a: A) => B>, fa: Free<F, A>) => Free<F, B> = (fab, fa) =>
  free.chain(fab, f => free.map(fa, f))
const chain_: <F, A, B>(ma: Free<F, A>, f: (a: A) => Free<F, B>) => Free<F, B> = (ma, f) =>
  isPure(ma) ? f(ma.value) : impure(ma.fx, x => free.chain(ma.f(x), f))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 0.1.18
 */
export const map: <A, B>(f: (a: A) => B) => <F>(fa: Free<F, A>) => Free<F, B> = f => fa => map_(fa, f)

/**
 * @category Apply
 * @since 0.1.18
 */
export const ap: <F, A, B>(fa: Free<F, A>) => (fab: Free<F, (a: A) => B>) => Free<F, B> = fa => fab => ap_(fab, fa)

/**
 * @category Monad
 * @since 0.1.18
 */
export const chain: <F, A, B>(f: (a: A) => Free<F, B>) => (ma: Free<F, A>) => Free<F, B> = f => ma => chain_(ma, f)

/**
 * @category Monad
 * @since 0.1.18
 */
export const flatten: <E, A>(mma: Free<E, Free<E, A>>) => Free<E, A> = mma => chain_(mma, identity)

/**
 * @category Applicative
 * @since 0.1.18
 */
export const of: <F, A>(a: A) => Free<F, A> = a => ({ _tag: 'Pure', value: a })

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 0.1.3
 */
export const URI = 'Free'

/**
 * @category instances
 * @since 0.1.3
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    Free: Free<E, A>
  }
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Functor: Functor2<URI> = {
  URI,
  map: map_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Applicative: Applicative2<URI> = {
  URI,
  map: map_,
  ap: ap_,
  of
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Apply: Apply2<URI> = {
  URI,
  ap: ap_,
  map: map_
}

/**
 * Monad instance for Free
 *
 * @category instances
 * @since 0.1.3
 */
export const free: Monad2<URI> = {
  URI,
  ap: ap_,
  chain: chain_,
  map: map_,
  of
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Check if given Free instance is Pure
 *
 * @since 0.1.3
 */
export const isPure = <F, A>(fa: Free<F, A>): fa is Pure<F, A> => fa._tag === 'Pure'

/**
 * Check if given Free instance is Impure
 *
 * @since 0.1.3
 */
export const isImpure = <F, A>(fa: Free<F, A>): fa is Impure<F, A, any> => fa._tag === 'Impure'
