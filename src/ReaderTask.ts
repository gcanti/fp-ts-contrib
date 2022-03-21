/**
 * @since 0.1.27
 */
import * as R from 'fp-ts/lib/Reader'
import * as RT from 'fp-ts/lib/ReaderTask'
import * as T from 'fp-ts/lib/Task'
import * as RIO from './ReaderIO'

import ReaderIO = RIO.ReaderIO
import ReaderTask = RT.ReaderTask

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 0.1.27
 */
// TODO use NaturalTransformation<RIO.URI, RT.URI> when fp-ts version >= 2.11.0
export const fromReaderIO: <R, A>(fa: ReaderIO<R, A>) => ReaderTask<R, A> = R.map(T.fromIO)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 0.1.27
 */
export const fromReaderIOK = <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => ReaderIO<R, B>
): ((...a: A) => ReaderTask<R, B>) => (...a) => fromReaderIO(f(...a))

/**
 * Less strict version of [`chainReaderIOK`](#chainreaderiok).
 *
 * @category combinators
 * @since 0.1.27
 */
export const chainReaderIOKW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B> = (f) => RT.chainW(fromReaderIOK(f))

/**
 * @category combinators
 * @since 0.1.27
 */
export const chainReaderIOK: <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
) => (ma: ReaderTask<R, A>) => ReaderTask<R, B> = chainReaderIOKW

/**
 * Less strict version of [`chainFirstReaderIOK`](#chainfirstreaderiok).
 *
 * @category combinators
 * @since 0.1.27
 */
// TODO use RT.chainFirstW when fp-ts version >= 2.11.0
export const chainFirstReaderIOKW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, A> = (f) => RT.chainFirst(fromReaderIOK(f)) as any

/**
 * @category combinators
 * @since 0.1.27
 */
export const chainFirstReaderIOK: <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
) => (ma: ReaderTask<R, A>) => ReaderTask<R, A> = chainFirstReaderIOKW
