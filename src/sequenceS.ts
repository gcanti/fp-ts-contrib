import { URIS2, Type2, HKT, URIS, URIS3, Type3, Type } from 'fp-ts/lib/HKT'
import { Apply2, Apply, Apply3, Apply2C, Apply3C, Apply1 } from 'fp-ts/lib/Apply'

type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R

/**
 * Like `Apply.sequenceT` but works with structs instead of tuples.
 *
 * **Note**. `sequenceS` may return a union when working with type constructors with kind `* -> * -> *` (or higher).
 * This behaviour may change in next releases without notice, so applying values with different types is not warranted.
 *
 * @example
 * import { either, right, left } from 'fp-ts/lib/Either'
 * import { sequenceS } from 'fp-ts-contrib/lib/sequenceS'
 *
 * const ado = sequenceS(either)
 *
 * assert.deepStrictEqual(
 *   ado({
 *     a: right<string, number>(1), // the left types must align
 *     b: right<string, boolean>(true) // the left types must align
 *   }),
 *   right({ a: 1, b: true })
 * )
 * assert.deepStrictEqual(
 *   ado({
 *     a: right(1),
 *     b: left('error')
 *   }),
 *   left('error')
 * )
 *
 * @since 0.0.1
 */
export function sequenceS<F extends URIS3>(
  F: Apply3<F>
): <R extends Record<string, Type3<F, any, any, any>>>(
  r: EnforceNonEmptyRecord<R>
) => Type3<
  F,
  { [K in keyof R]: R[K] extends Type3<F, infer U, any, any> ? U : never }[keyof R],
  { [K in keyof R]: R[K] extends Type3<F, any, infer L, any> ? L : never }[keyof R],
  { [K in keyof R]: R[K] extends Type3<F, any, any, infer A> ? A : never }
>
export function sequenceS<F extends URIS3, U, L>(
  F: Apply3C<F, U, L>
): <R extends Record<string, Type3<F, U, L, any>>>(
  r: EnforceNonEmptyRecord<R>
) => Type3<F, U, L, { [K in keyof R]: R[K] extends Type3<F, any, any, infer A> ? A : never }>
export function sequenceS<F extends URIS2>(
  F: Apply2<F>
): <R extends Record<string, Type2<F, any, any>>>(
  r: EnforceNonEmptyRecord<R>
) => Type2<
  F,
  { [K in keyof R]: R[K] extends Type2<F, infer L, any> ? L : never }[keyof R],
  { [K in keyof R]: R[K] extends Type2<F, any, infer A> ? A : never }
>
export function sequenceS<F extends URIS2, L>(
  F: Apply2C<F, L>
): <R extends Record<string, Type2<F, L, any>>>(
  r: EnforceNonEmptyRecord<R>
) => Type2<F, L, { [K in keyof R]: R[K] extends Type2<F, any, infer A> ? A : never }>
export function sequenceS<F extends URIS>(
  F: Apply1<F>
): <R extends Record<string, Type<F, any>>>(
  r: EnforceNonEmptyRecord<R>
) => Type<F, { [K in keyof R]: R[K] extends Type<F, infer A> ? A : never }>
export function sequenceS<F>(F: Apply<F>): (r: Record<string, HKT<F, any>>) => HKT<F, Record<string, any>>
export function sequenceS<F>(F: Apply<F>): (r: Record<string, HKT<F, any>>) => HKT<F, Record<string, any>> {
  return r => {
    const keys = Object.keys(r)
    const fst = keys[0]
    const others = keys.slice(1)
    let fr: HKT<F, Record<string, any>> = F.map(r[fst], a => ({ [fst]: a }))
    for (const key of others) {
      fr = F.ap(
        F.map(fr, r => (a: any) => {
          r[key] = a
          return r
        }),
        r[key]
      )
    }
    return fr
  }
}
