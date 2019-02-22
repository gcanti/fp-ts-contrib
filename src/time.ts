import { now } from 'fp-ts/lib/Date'
import { tuple } from 'fp-ts/lib/function'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { MonadIO, MonadIO1, MonadIO2, MonadIO2C, MonadIO3, MonadIO3C } from 'fp-ts/lib/MonadIO'

/**
 * Mimics the analogous Unix command
 */
export function time<M extends URIS3>(M: MonadIO3<M>): <U, L, A>(ma: Type3<M, U, L, A>) => Type3<M, U, L, [A, number]>
export function time<M extends URIS3, U, L>(
  M: MonadIO3C<M, U, L>
): <A>(ma: Type3<M, U, L, A>) => Type3<M, U, L, [A, number]>
export function time<M extends URIS2>(M: MonadIO2<M>): <L, A>(ma: Type2<M, L, A>) => Type2<M, L, [A, number]>
export function time<M extends URIS2, L>(M: MonadIO2C<M, L>): <A>(ma: Type2<M, L, A>) => Type2<M, L, [A, number]>
export function time<M extends URIS>(M: MonadIO1<M>): <A>(ma: Type<M, A>) => Type<M, [A, number]>
export function time<M>(M: MonadIO<M>): <A>(ma: HKT<M, A>) => HKT<M, [A, number]>
export function time<M>(M: MonadIO<M>): <A>(ma: HKT<M, A>) => HKT<M, [A, number]> {
  const nowM = M.fromIO(now)
  return ma => M.chain(nowM, start => M.chain(ma, a => M.map(nowM, end => tuple(a, end - start))))
}
