/**
 * @file Provides regular expression matching.
 *
 * Adapted from https://hackage.haskell.org/package/regex-compat-0.95.1/docs/Text-Regex.html
 */

import * as O from 'fp-ts/lib/Option'
import { Predicate } from 'fp-ts/lib/function'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

/**
 * Returns the list of subexpression matches, or `None` if the match fails.
 * @since 0.1.8
 */
export function match(r: RegExp): (s: string) => O.Option<RegExpMatchArray> {
  return s => O.fromNullable(s.match(r))
}

/**
 * Returns `true` if the string matches the regular expression,
 * otherwise `false`.
 * @since 0.1.8
 */
export function test(r: RegExp): Predicate<string> {
  return s => r.test(s)
}

/**
 * Replaces every occurance of the given regular expression
 * with the replacement string.
 * @since 0.1.8
 */
export function sub(r: RegExp, replacement: string): (s: string) => string {
  return s => s.replace(r, replacement)
}

/**
 * Splits a string based on a regular expression. The regular expression
 * should identify one delimiter.
 * @since 0.1.8
 */
export function split(r: RegExp): (s: string) => NonEmptyArray<string> {
  return s => s.split(r) as any
}
