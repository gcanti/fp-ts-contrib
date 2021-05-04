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
export interface IxPointed3<F extends URIS3> {
  readonly URI: F
  readonly iof: <I, A>(a: A) => Kind3<F, I, I, A>
}

/**
 * @category type classes
 * @since 0.1.24
 */
export interface IxPointed4<F extends URIS4> {
  readonly URI: F
  readonly iof: <I, E, A>(a: A) => Kind4<F, I, I, E, A>
}
