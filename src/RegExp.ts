/**
 * Provides regular expression matching.
 *
 * Adapted from https://hackage.haskell.org/package/regex-compat-0.95.1/docs/Text-Regex.html
 *
 * @since 0.1.8
 */

import * as O from 'fp-ts/lib/Option'
import { Predicate } from 'fp-ts/lib/function'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

/**
 * Returns the list of subexpression matches, or `None` if the match fails.
 *
 * @example
 * import * as O from 'fp-ts/lib/Option'
 * import { match } from 'fp-ts-contrib/lib/RegExp'
 * import { pipe } from 'fp-ts/lib/pipeable'
 *
 * const myMatch = match(/^(\d)(\w)$/)
 * assert.deepStrictEqual(pipe('2e', myMatch, O.map(Array.from)), O.some(['2e', '2', 'e']))
 * assert.deepStrictEqual(myMatch('foo'), O.none)
 *
 * @since 0.1.8
 */
export function match(r: RegExp): (s: string) => O.Option<RegExpMatchArray> {
  return s => O.fromNullable(s.match(r))
}

/**
 * Returns `true` if the string matches the regular expression,
 * otherwise `false`.
 *
 * @example
 * import { test } from 'fp-ts-contrib/lib/RegExp'
 *
 * const myTest = test(/^(\d)(\w)$/)
 * assert.strictEqual(myTest('6s'), true)
 * assert.strictEqual(myTest('bar'), false)
 *
 * @since 0.1.8
 */
export function test(r: RegExp): Predicate<string> {
  return s => r.test(s)
}

/**
 * Replaces every occurance of the given regular expression
 * with the replacement string.
 *
 * @example
 * import { sub } from 'fp-ts-contrib/lib/RegExp'
 *
 * const sanitiseSpaces = sub(/\s/g, '_')
 * assert.strictEqual(sanitiseSpaces('foo bar owl'), 'foo_bar_owl')
 *
 * @since 0.1.8
 */
export function sub(r: RegExp, replacement: string): (s: string) => string {
  return s => s.replace(r, replacement)
}

/**
 * Splits a string based on a regular expression. The regular expression
 * should identify one delimiter.
 *
 * @example
 * import { split } from 'fp-ts-contrib/lib/RegExp'
 *
 * const splitByHash = split(/#/)
 * assert.deepStrictEqual(splitByHash('foo#bar#beer'), ['foo', 'bar', 'beer'])
 * assert.deepStrictEqual(splitByHash('noHashes'), ['noHashes'])
 *
 * @since 0.1.8
 */
export function split(r: RegExp): (s: string) => NonEmptyArray<string> {
  return s => s.split(r) as any
}
