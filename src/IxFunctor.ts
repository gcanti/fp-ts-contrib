/**
 * @since 0.1.24
 */
import { Kind3, Kind4, URIS3, URIS4 } from 'fp-ts/HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 0.1.24
 */
export interface IxFunctor3<F extends URIS3> {
  readonly URI: F
  readonly imap: <I, O, A, B>(fa: Kind3<F, I, O, A>, f: (a: A) => B) => Kind3<F, I, O, B>
}

/**
 * @category type classes
 * @since 0.1.24
 */
export interface IxFunctor4<F extends URIS4> {
  readonly URI: F
  readonly imap: <I, O, E, A, B>(fa: Kind4<F, I, O, E, A>, f: (a: A) => B) => Kind4<F, I, O, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 0.1.24
 */
export function iflap<F extends URIS4>(
  F: IxFunctor4<F>
): <A>(a: A) => <I, O, E, B>(fab: Kind4<F, I, O, E, (a: A) => B>) => Kind4<F, I, O, E, B>
export function iflap<F extends URIS3>(
  F: IxFunctor3<F>
): <A>(a: A) => <I, O, B>(fab: Kind3<F, I, O, (a: A) => B>) => Kind3<F, I, O, B>
export function iflap<F extends URIS3>(
  F: IxFunctor3<F>
): <A>(a: A) => <I, O, B>(fab: Kind3<F, I, O, (a: A) => B>) => Kind3<F, I, O, B> {
  return (a) => (fab) => F.imap(fab, (f) => f(a))
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 0.1.24
 */
export function ibindTo<F extends URIS4>(
  F: IxFunctor4<F>
): <N extends string>(name: N) => <I, O, E, A>(fa: Kind4<F, I, O, E, A>) => Kind4<F, I, O, E, { [K in N]: A }>
export function ibindTo<F extends URIS3>(
  F: IxFunctor3<F>
): <N extends string>(name: N) => <I, O, A>(fa: Kind3<F, I, O, A>) => Kind3<F, I, O, { [K in N]: A }>
export function ibindTo<F extends URIS3>(
  F: IxFunctor3<F>
): <N extends string>(name: N) => <I, O, A>(fa: Kind3<F, I, O, A>) => Kind3<F, I, O, { [K in N]: A }> {
  return (name) => (fa) => F.imap(fa, (a) => ({ [name]: a } as any))
}
