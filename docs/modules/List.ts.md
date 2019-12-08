---
title: List.ts
nav_order: 10
parent: Modules
---

# Overview

Adapted from https://github.com/purescript/purescript-lists

---

<h2 class="text-delta">Table of contents</h2>

- [Cons (interface)](#cons-interface)
- [Nil (interface)](#nil-interface)
- [List (type alias)](#list-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [list (constant)](#list-constant)
- [nil (constant)](#nil-constant)
- [cons (function)](#cons-function)
- [dropLeft (function)](#dropleft-function)
- [dropLeftWhile (function)](#dropleftwhile-function)
- [findIndex (function)](#findindex-function)
- [foldLeft (function)](#foldleft-function)
- [fromArray (function)](#fromarray-function)
- [getEq (function)](#geteq-function)
- [head (function)](#head-function)
- [isCons (function)](#iscons-function)
- [isNil (function)](#isnil-function)
- [of (function)](#of-function)
- [reverse (function)](#reverse-function)
- [tail (function)](#tail-function)
- [toArray (function)](#toarray-function)
- [toReversedArray (function)](#toreversedarray-function)
- [foldMap (export)](#foldmap-export)
- [map (export)](#map-export)
- [reduce (export)](#reduce-export)
- [reduceRight (export)](#reduceright-export)

---

# Cons (interface)

**Signature**

```ts
export interface Cons<A> {
  readonly type: 'Cons'
  readonly head: A
  readonly tail: List<A>
  readonly length: number
}
```

Added in v0.1.8

# Nil (interface)

**Signature**

```ts
export interface Nil {
  readonly type: 'Nil'
  readonly length: 0
}
```

Added in v0.1.8

# List (type alias)

**Signature**

```ts
export type List<A> = Nil | Cons<A>
```

Added in v0.1.8

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.8

# URI (constant)

**Signature**

```ts
export const URI: "List" = ...
```

Added in v0.1.8

# list (constant)

**Signature**

```ts
export const list: Functor1<URI> & Foldable1<URI> & Traversable1<URI> = ...
```

Added in v0.1.8

# nil (constant)

**Signature**

```ts
export const nil: List<never> = ...
```

Added in v0.1.8

# cons (function)

Attaches an element to the front of a list.

**Signature**

```ts
export function cons<A>(head: A, tail: List<A>): List<A> { ... }
```

**Example**

```ts
import * as L from 'fp-ts-contrib/lib/List'

assert.deepStrictEqual(L.cons('a', L.nil), { type: 'Cons', head: 'a', tail: L.nil, length: 1 })
```

Added in v0.1.8

# dropLeft (function)

Drops the specified number of elements from the front of a list.

**Signature**

```ts
export function dropLeft(n: number): <A>(fa: List<A>) => List<A> { ... }
```

**Example**

```ts
import * as L from 'fp-ts-contrib/lib/List'

assert.deepStrictEqual(L.dropLeft(1)(L.nil), L.nil)
assert.deepStrictEqual(L.dropLeft(1)(L.cons(1, L.of(2))), L.of(2))
assert.deepStrictEqual(L.dropLeft(3)(L.cons(1, L.of(2))), L.nil)
```

Added in v0.1.8

# dropLeftWhile (function)

Drops those elements from the front of a list which match a predicate.

**Signature**

```ts
export function dropLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (fa: List<A>) => List<B>
export function dropLeftWhile<A>(predicate: Predicate<A>): (fa: List<A>) => List<A> { ... }
```

**Example**

```ts
import * as L from 'fp-ts-contrib/lib/List'

const isLTThree = (n: number) => n < 3
assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.nil), L.nil)
assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.cons(1, L.cons(2, L.of(3)))), L.of(3))
assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.cons(1, L.of(2))), L.nil)
```

Added in v0.1.8

# findIndex (function)

Finds the first index for which a predicate holds.

**Signature**

```ts
export function findIndex<A>(predicate: Predicate<A>): (fa: List<A>) => O.Option<number> { ... }
```

**Example**

```ts
import * as O from 'fp-ts/lib/Option'
import * as L from 'fp-ts-contrib/lib/List'

const f = (a: number): boolean => a % 2 === 0
const findIndexEven = L.findIndex(f)
assert.deepStrictEqual(findIndexEven(L.nil), O.none)
assert.deepStrictEqual(findIndexEven(L.cons(1, L.of(2))), O.some(1))
assert.deepStrictEqual(findIndexEven(L.of(1)), O.none)
```

Added in v0.1.8

# foldLeft (function)

Breaks a list into its first element and the remaining elements.

**Signature**

```ts
export function foldLeft<A, B>(onNil: () => B, onCons: (head: A, tail: List<A>) => B): (fa: List<A>) => B { ... }
```

**Example**

```ts
import * as L from 'fp-ts-contrib/lib/List'

const len: <A>(as: L.List<A>) => number = L.foldLeft(
  () => 0,
  (_, tail) => 1 + len(tail)
)
assert.deepStrictEqual(len(L.cons('a', L.of('b'))), 2)
```

Added in v0.1.8

# fromArray (function)

Creates a list from an array

**Signature**

```ts
export function fromArray<A>(as: Array<A>): List<A> { ... }
```

**Example**

```ts
import * as L from 'fp-ts-contrib/lib/List'

assert.deepStrictEqual(L.fromArray([]), L.nil)
assert.deepStrictEqual(L.fromArray(['a', 'b']), L.cons('a', L.of('b')))
```

Added in v0.1.8

# getEq (function)

Derives an `Eq` over the `List` of a given element type from the `Eq` of that type.
The derived `Eq` defines two lists as equal if all elements of both lists
are compared equal pairwise with the given `E`. In case of lists of different
lengths, the result is non equality.

**Signature**

```ts
export function getEq<A>(E: Eq.Eq<A>): Eq.Eq<List<A>> { ... }
```

**Example**

```ts
import { eqString } from 'fp-ts/lib/Eq'
import * as L from 'fp-ts-contrib/lib/List'

const E = L.getEq(eqString)
assert.strictEqual(E.equals(L.cons('a', L.of('b')), L.cons('a', L.of('b'))), true)
assert.strictEqual(E.equals(L.of('x'), L.nil), false)
```

Added in v0.1.8

# head (function)

Gets the first element in a list, or `None` if the list is empty.

**Signature**

```ts
export function head<A>(fa: List<A>): O.Option<A> { ... }
```

**Example**

```ts
import * as O from 'fp-ts/lib/Option'
import * as L from 'fp-ts-contrib/lib/List'

assert.deepStrictEqual(L.head(L.nil), O.none)
assert.deepStrictEqual(L.head(L.cons('x', L.of('a'))), O.some('x'))
```

Added in v0.1.8

# isCons (function)

Tests whether a list is a non empty list.

**Signature**

```ts
export function isCons<A>(a: List<A>): a is Cons<A> { ... }
```

**Example**

```ts
import * as L from 'fp-ts-contrib/lib/List'

assert.strictEqual(L.isCons(L.nil), false)
assert.strictEqual(L.isCons(L.of(1)), true)
```

Added in v0.1.8

# isNil (function)

Tests whether a list is an empty list.

**Signature**

```ts
export function isNil<A>(a: List<A>): a is Nil { ... }
```

**Example**

```ts
import * as L from 'fp-ts-contrib/lib/List'

assert.strictEqual(L.isNil(L.nil), true)
assert.strictEqual(L.isNil(L.of(6)), false)
```

Added in v0.1.8

# of (function)

Creates a list with a single element.

**Signature**

```ts
export function of<A>(head: A): List<A> { ... }
```

**Example**

```ts
import * as L from 'fp-ts-contrib/lib/List'

assert.deepStrictEqual(L.of('a'), L.cons('a', L.nil))
```

Added in v0.1.8

# reverse (function)

Reverse a list.

**Signature**

```ts
export function reverse<A>(fa: List<A>): List<A> { ... }
```

**Example**

```ts
import * as L from 'fp-ts-contrib/lib/List'

assert.deepStrictEqual(L.reverse(L.cons(1, L.cons(2, L.of(3)))), L.cons(3, L.cons(2, L.of(1))))
```

Added in v0.1.8

# tail (function)

Gets all but the first element of a list, or `None` if the list is empty.

**Signature**

```ts
export function tail<A>(fa: List<A>): O.Option<List<A>> { ... }
```

**Example**

```ts
import * as O from 'fp-ts/lib/Option'
import * as L from 'fp-ts-contrib/lib/List'

assert.deepStrictEqual(L.tail(L.nil), O.none)
assert.deepStrictEqual(L.tail(L.of('a')), O.some(L.nil))
assert.deepStrictEqual(L.tail(L.cons('x', L.of('a'))), O.some(L.of('a')))
```

Added in v0.1.8

# toArray (function)

Gets an array from a list.

**Signature**

```ts
export function toArray<A>(fa: List<A>): Array<A> { ... }
```

**Example**

```ts
import * as L from 'fp-ts-contrib/lib/List'

assert.deepStrictEqual(L.toArray(L.cons('a', L.of('b'))), ['a', 'b'])
```

Added in v0.1.8

# toReversedArray (function)

Gets an array from a list in a reversed order.

**Signature**

```ts
export function toReversedArray<A>(fa: List<A>): Array<A> { ... }
```

**Example**

```ts
import * as L from 'fp-ts-contrib/lib/List'

assert.deepStrictEqual(L.toReversedArray(L.cons('a', L.of('b'))), ['b', 'a'])
```

Added in v0.1.8

# foldMap (export)

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: List<A>) => M
```

Added in v0.1.8

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: List<A>) => List<B>
```

Added in v0.1.8

# reduce (export)

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: List<A>) => B
```

Added in v0.1.8

# reduceRight (export)

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: List<A>) => B
```

Added in v0.1.8
