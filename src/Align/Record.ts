import * as R from 'fp-ts/lib/Record'
import { These, this_, that, both } from 'fp-ts/lib/These'
import { identity } from 'fp-ts/lib/function'

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
      r[key] = f(this_(fa[key]))
    }
  }
  for (const key of Object.keys(fb)) {
    if (!fa.hasOwnProperty(key)) {
      r[key] = f(that(fb[key]))
    }
  }
  return r
}

export function align<K extends string, P extends string, A, B>(
  fa: Record<K, A>,
  fb: Record<P, B>
): Record<K | P, These<A, B>>
export function align<A, B>(fa: Record<string, A>, fb: Record<string, B>): Record<string, These<A, B>>
export function align<A, B>(fa: Record<string, A>, fb: Record<string, B>): Record<string, These<A, B>> {
  return alignWith<A, B, These<A, B>>(fa, fb, identity)
}

export const nil = <A>(): Record<string, A> => R.empty
