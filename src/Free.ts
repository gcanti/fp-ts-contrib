/**
 * @since 0.1.3
 */
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3 } from 'fp-ts/lib/Monad'
import { pipeable } from 'fp-ts/lib/pipeable'

/**
 * @since 0.1.3
 */
export const URI = 'Free'

/**
 * @since 0.1.3
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    Free: Free<E, A>
  }
}

/**
 * @data
 * @constructor Pure
 * @constructor Impure
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

const impure = <F, A, X>(fx: HKT<F, X>, f: (x: X) => Free<F, A>): Free<F, A> => ({ _tag: 'Impure', fx, f })

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

/**
 * Lift an impure value described by the generating type constructor `F` into the free monad
 *
 * @since 0.1.3
 */
export const liftF = <F, A>(fa: HKT<F, A>): Free<F, A> => impure(fa, a => free.of(a))

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

/**
 * @since 0.1.3
 */
export interface FoldFree3<M extends URIS3> {
  <F extends URIS3, U, L, A>(nt: <X>(fa: Kind3<F, U, L, X>) => Kind3<M, U, L, X>, fa: Free<F, A>): Kind3<M, U, L, A>
  <F extends URIS2, U, L, A>(nt: <X>(fa: Kind2<F, L, X>) => Kind3<M, U, L, X>, fa: Free<F, A>): Kind3<M, U, L, A>
  <F extends URIS, U, L, A>(nt: <X>(fa: Kind<F, X>) => Kind3<M, U, L, X>, fa: Free<F, A>): Kind3<M, U, L, A>
}

/**
 * @since 0.1.3
 */
export interface FoldFree2<M extends URIS2> {
  <F extends URIS2, L, A>(nt: <X>(fa: Kind2<F, L, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
  <F extends URIS, L, A>(nt: <X>(fa: Kind<F, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
}

/**
 * @since 0.1.3
 */
export interface FoldFree2C<M extends URIS2, L> {
  <F extends URIS2, A>(nt: <X>(fa: Kind2<F, L, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
  <F extends URIS, A>(nt: <X>(fa: Kind<F, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
}

/**
 * Perform folding of a free monad using given natural transformation as an interpreter
 *
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

/**
 * Monad instance for Free
 *
 * @since 0.1.3
 */
export const free: Monad2<URI> = {
  URI,
  /**
   * @since 0.1.3
   */
  of: <F, A>(value: A): Free<F, A> => ({ _tag: 'Pure', value }),
  /**
   * @since 0.1.3
   */
  chain: <F, A, B>(ma: Free<F, A>, f: (a: A) => Free<F, B>): Free<F, B> =>
    isPure(ma) ? f(ma.value) : impure(ma.fx, x => free.chain(ma.f(x), f)),
  /**
   * @since 0.1.3
   */
  map: (fa, f) => (isPure(fa) ? free.of(f(fa.value)) : impure(fa.fx, x => free.map(fa.f(x), f))),
  /**
   * @since 0.1.3
   */
  ap: (fab, fa) => free.chain(fab, f => free.map(fa, f))
}

const { ap, chain, map, flatten } = pipeable(free)

export {
  /**
   * @since 0.1.3
   */
  ap,
  /**
   * @since 0.1.3
   */
  chain,
  /**
   * @since 0.1.3
   */
  map,
  /**
   * @since 0.1.3
   */
  flatten
}
