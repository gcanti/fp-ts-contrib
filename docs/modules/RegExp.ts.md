---
title: RegExp.ts
nav_order: 11
parent: Modules
---

# Overview

Provides regular expression matching.

Adapted from https://hackage.haskell.org/package/regex-compat-0.95.1/docs/Text-Regex.html

---

<h2 class="text-delta">Table of contents</h2>

- [match (function)](#match-function)
- [split (function)](#split-function)
- [sub (function)](#sub-function)
- [test (function)](#test-function)

---

# match (function)

Returns the list of subexpression matches, or `None` if the match fails.

**Signature**

```ts
export function match(r: RegExp): (s: string) => O.Option<RegExpMatchArray> { ... }
```

Added in v0.1.8

# split (function)

Splits a string based on a regular expression. The regular expression
should identify one delimiter.

**Signature**

```ts
export function split(r: RegExp): (s: string) => NonEmptyArray<string> { ... }
```

Added in v0.1.8

# sub (function)

Replaces every occurance of the given regular expression
with the replacement string.

**Signature**

```ts
export function sub(r: RegExp, replacement: string): (s: string) => string { ... }
```

Added in v0.1.8

# test (function)

Returns `true` if the string matches the regular expression,
otherwise `false`.

**Signature**

```ts
export function test(r: RegExp): Predicate<string> { ... }
```

Added in v0.1.8
