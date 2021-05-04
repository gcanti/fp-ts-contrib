/**
 * @since 0.1.24
 */
import { Kind3, Kind4, URIS3, URIS4 } from 'fp-ts/HKT'

import { IxApply3, IxApply4 } from './IxApply'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 0.1.24
 */
export interface IxChain3<F extends URIS3> extends IxApply3<F> {
  readonly ichain: <A, B, I, O, Z>(fa: Kind3<F, I, O, A>, f: (a: A) => Kind3<F, O, Z, B>) => Kind3<F, I, Z, B>
}

/**
 * @category type classes
 * @since 0.1.24
 */
export interface IxChain4<F extends URIS4> extends IxApply4<F> {
  readonly ichain: <I, O, Z, E, A, B>(
    fa: Kind4<F, I, O, E, A>,
    f: (a: A) => Kind4<F, O, Z, E, B>
  ) => Kind4<F, I, Z, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 0.1.24
 */
export function ichainFirst<M extends URIS4>(
  M: IxChain4<M>
): <I, O, Z, E, A, B>(f: (a: A) => Kind4<M, O, Z, E, B>) => (first: Kind4<M, I, O, E, A>) => Kind4<M, I, Z, E, A>
export function ichainFirst<M extends URIS3>(
  M: IxChain3<M>
): <I, O, Z, A, B>(f: (a: A) => Kind3<M, O, Z, B>) => (first: Kind3<M, I, O, A>) => Kind3<M, I, Z, A>
export function ichainFirst<M extends URIS3>(
  M: IxChain3<M>
): <I, O, Z, A, B>(f: (a: A) => Kind3<M, O, Z, B>) => (first: Kind3<M, I, O, A>) => Kind3<M, I, Z, A> {
  return (f) => (first) => M.ichain(first, (a) => M.imap(f(a), () => a))
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 0.1.24
 */
export function ibind<M extends URIS4>(
  M: IxChain4<M>
): <N extends string, A, Second, Third, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind4<M, Second, Third, E, B>
) => <First>(
  ma: Kind4<M, First, Second, E, A>
) => Kind4<M, First, Third, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function ibind<M extends URIS3>(
  M: IxChain3<M>
): <N extends string, A, Second, Third, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind3<M, Second, Third, B>
) => <First>(
  ma: Kind3<M, First, Second, A>
) => Kind3<M, First, Third, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function ibind<M extends URIS3>(
  M: IxChain3<M>
): <N extends string, A, Second, Third, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind3<M, Second, Third, B>
) => <First>(
  ma: Kind3<M, First, Second, A>
) => Kind3<M, First, Third, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> {
  return (name, f) => (ma) => M.ichain(ma, (a) => M.imap(f(a), (b) => Object.assign({}, a, { [name]: b }) as any))
}
