---
title: RegExp.ts
nav_order: 17
parent: Modules
---

## RegExp overview

Provides regular expression matching.

Adapted from https://hackage.haskell.org/package/regex-compat-0.95.1/docs/Text-Regex.html

Added in v0.1.8

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [match](#match)
  - [split](#split)
  - [sub](#sub)
  - [test](#test)

---

# utils

## match

Returns the list of subexpression matches, or `None` if the match fails.

**Signature**

```ts
export declare const match: (r: RegExp) => (s: string) => O.Option<RegExpMatchArray>
```

**Example**

```ts
import * as O from 'fp-ts/Option'
import { match } from 'fp-ts-contrib/RegExp'
import { pipe } from 'fp-ts/function'

const myMatch = match(/^(\d)(\w)$/)
assert.deepStrictEqual(pipe('2e', myMatch, O.map(Array.from)), O.some(['2e', '2', 'e']))
assert.deepStrictEqual(myMatch('foo'), O.none)
```

Added in v0.1.8

## split

Splits a string based on a regular expression. The regular expression
should identify one delimiter.

**Signature**

```ts
export declare const split: (r: RegExp) => (s: string) => NonEmptyArray<string>
```

**Example**

```ts
import { split } from 'fp-ts-contrib/RegExp'

const splitByHash = split(/#/)
assert.deepStrictEqual(splitByHash('foo#bar#beer'), ['foo', 'bar', 'beer'])
assert.deepStrictEqual(splitByHash('noHashes'), ['noHashes'])
```

Added in v0.1.8

## sub

Replaces every occurance of the given regular expression
with the replacement string.

**Signature**

```ts
export declare const sub: (r: RegExp, replacement: string) => (s: string) => string
```

**Example**

```ts
import { sub } from 'fp-ts-contrib/RegExp'

const sanitiseSpaces = sub(/\s/g, '_')
assert.strictEqual(sanitiseSpaces('foo bar owl'), 'foo_bar_owl')
```

Added in v0.1.8

## test

Returns `true` if the string matches the regular expression,
otherwise `false`.

**Signature**

```ts
export declare const test: (r: RegExp) => Predicate<string>
```

**Example**

```ts
import { test } from 'fp-ts-contrib/RegExp'

const myTest = test(/^(\d)(\w)$/)
assert.strictEqual(myTest('6s'), true)
assert.strictEqual(myTest('bar'), false)
```

Added in v0.1.8
