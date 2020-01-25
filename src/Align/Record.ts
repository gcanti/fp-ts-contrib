/**
 * @since 0.1.0
 */
import * as R from 'fp-ts/lib/Record'
import { These, left, right, both } from 'fp-ts/lib/These'
import { identity } from 'fp-ts/lib/function'

/**
 * @since 0.1.0
 */
export function alignWith<K extends string, P extends string, A, B, C>(
  fa: Record<K, A>,
  fb: Record<P, B>,
  f: (x: These<A, B>) => C
): Record<K | P, C>
export function alignWith<A, B, C>(
  fa: Record<string, A>,
  fb: Record<string, B>,
  f: (x: These<A, B>) => C
): Record<string, C>
export function alignWith<A, B, C>(
  fa: Record<string, A>,
  fb: Record<string, B>,
  f: (x: These<A, B>) => C
): Record<string, C> {
  const r: Record<string, C> = {}
  for (const key of Object.keys(fa)) {
    if (fb.hasOwnProperty(key)) {
      r[key] = f(both(fa[key], fb[key]))
    } else {
      r[key] = f(left(fa[key]))
    }
  }
  for (const key of Object.keys(fb)) {
    if (!fa.hasOwnProperty(key)) {
      r[key] = f(right(fb[key]))
    }
  }
  return r
}

/**
 * @since 0.1.0
 */
export function align<K extends string, P extends string, A, B>(
  fa: Record<K, A>,
  fb: Record<P, B>
): Record<K | P, These<A, B>>
export function align<A, B>(fa: Record<string, A>, fb: Record<string, B>): Record<string, These<A, B>>
export function align<A, B>(fa: Record<string, A>, fb: Record<string, B>): Record<string, These<A, B>> {
  return alignWith<A, B, These<A, B>>(fa, fb, identity)
}

/**
 * @since 0.1.0
 */
export function nil<A>(): Record<string, A> {
  return R.empty
}
