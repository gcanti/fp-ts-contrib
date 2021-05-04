/**
 * @since 0.1.24
 */
import { HKT4, Kind3, Kind4, URIS3, URIS4 } from 'fp-ts/HKT'

import { IxFunctor3, IxFunctor4 } from './IxFunctor'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 0.1.24
 */
export interface IxApply4<F extends URIS4> extends IxFunctor4<F> {
  readonly iap: <I, O, Z, E, A, B>(fab: HKT4<F, I, O, E, (a: A) => B>, fa: HKT4<F, O, Z, E, A>) => HKT4<F, I, Z, E, B>
}

/**
 * @category type classes
 * @since 0.1.24
 */
export interface IxApply3<F extends URIS3> extends IxFunctor3<F> {
  readonly iap: <I, O, Z, A, B>(fab: Kind3<F, I, O, (a: A) => B>, fa: Kind3<F, O, Z, A>) => Kind3<F, I, Z, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category Combinators
 * @since 0.1.24
 */
export function iapFirst<F extends URIS4>(
  F: IxApply4<F>
): <O, Z, E, B>(second: Kind4<F, O, Z, E, B>) => <I, A>(first: Kind4<F, I, O, E, A>) => Kind4<F, I, Z, E, A>
export function iapFirst<F extends URIS3>(
  F: IxApply3<F>
): <O, Z, B>(second: Kind3<F, O, Z, B>) => <I, A>(first: Kind3<F, I, O, A>) => Kind3<F, I, Z, A>
export function iapFirst<F extends URIS3>(
  F: IxApply3<F>
): <O, Z, B>(second: Kind3<F, O, Z, B>) => <I, A>(first: Kind3<F, I, O, A>) => Kind3<F, I, Z, A> {
  return (second) => (first) =>
    F.iap(
      F.imap(first, (a) => () => a),
      second
    )
}

/**
 * @category Combinators
 * @since 0.1.24
 */
export function iapSecond<F extends URIS4>(
  F: IxApply4<F>
): <I, O, Z, E, A, B>(second: Kind4<F, O, Z, E, B>) => (first: Kind4<F, I, O, E, A>) => Kind4<F, I, Z, E, B>
export function iapSecond<F extends URIS3>(
  F: IxApply3<F>
): <I, O, Z, A, B>(second: Kind3<F, O, Z, B>) => (first: Kind3<F, I, O, A>) => Kind3<F, I, Z, B>
export function iapSecond<F extends URIS3>(F: IxApply3<F>) {
  return <I, O, Z, A, B>(second: Kind3<F, O, Z, B>) => (first: Kind3<F, I, O, A>): unknown =>
    F.iap(
      F.imap(first, () => (b: B) => b),
      second
    )
}

/**
 * @category Combinators
 * @since 0.1.24
 */
export function iapS<F extends URIS4>(
  F: IxApply4<F>
): <N extends string, A, I, O, E, B>(
  name: Exclude<N, keyof A>,
  fb: Kind4<F, I, O, E, B>
) => (fa: Kind4<F, I, O, E, A>) => Kind4<F, I, O, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function iapS<F extends URIS3>(
  F: IxApply3<F>
): <N extends string, A, O, S, B>(
  name: Exclude<N, keyof A>,
  fb: Kind3<F, O, S, B>
) => <First, O>(fa: Kind3<F, First, O, A>) => Kind3<F, First, S, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function iapS<F extends URIS3>(F: IxApply3<F>) {
  return <N extends string, A, Second, Third, B>(name: Exclude<N, keyof A>, fb: Kind3<F, Second, Third, B>) => <First>(
    fa: Kind3<F, First, Second, A>
  ): Kind3<F, First, Third, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> =>
    F.iap(
      F.imap(fa, (a) => (b: B) => Object.assign({}, a, { [name]: b }) as any),
      fb
    )
}
