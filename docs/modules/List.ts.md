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

Added in v###

# Nil (interface)

**Signature**

```ts
export interface Nil {
  readonly type: 'Nil'
  readonly length: 0
}
```

Added in v###

# List (type alias)

**Signature**

```ts
export type List<A> = Nil | Cons<A>
```

Added in v###

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v###

# URI (constant)

**Signature**

```ts
export const URI: "List" = ...
```

Added in v###

# list (constant)

**Signature**

```ts
export const list: Functor1<URI> & Foldable1<URI> & Traversable1<URI> = ...
```

Added in v###

# nil (constant)

**Signature**

```ts
export const nil: List<never> = ...
```

Added in v###

# cons (function)

**Signature**

```ts
export function cons<A>(head: A, tail: List<A>): List<A> { ... }
```

Added in v###

# dropLeft (function)

Drops the specified number of elements from the front of a list.

**Signature**

```ts
export function dropLeft(n: number): <A>(fa: List<A>) => List<A> { ... }
```

Added in v###

# dropLeftWhile (function)

Drops those elements from the front of a list which match a predicate.

**Signature**

```ts
export function dropLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (fa: List<A>) => List<B>
export function dropLeftWhile<A>(predicate: Predicate<A>): (fa: List<A>) => List<A> { ... }
```

Added in v###

# findIndex (function)

Finds the first index for which a predicate holds.

**Signature**

```ts
export function findIndex<A>(predicate: Predicate<A>): (fa: List<A>) => O.Option<number> { ... }
```

Added in v###

# foldLeft (function)

Breaks a list into its first element and the remaining elements.

**Signature**

```ts
export function foldLeft<A, B>(onNil: () => B, onCons: (head: A, tail: List<A>) => B): (fa: List<A>) => B { ... }
```

Added in v###

# fromArray (function)

Creates a list from an array

**Signature**

```ts
export function fromArray<A>(as: Array<A>): List<A> { ... }
```

Added in v###

# head (function)

Gets the first element in a list, or `None` if the list is empty.

**Signature**

```ts
export function head<A>(fa: List<A>): O.Option<A> { ... }
```

Added in v###

# isCons (function)

**Signature**

```ts
export function isCons<A>(a: List<A>): a is Cons<A> { ... }
```

Added in v###

# isNil (function)

**Signature**

```ts
export function isNil<A>(a: List<A>): a is Nil { ... }
```

Added in v###

# of (function)

Creates a list with a single element.

**Signature**

```ts
export function of<A>(head: A): List<A> { ... }
```

Added in v###

# reverse (function)

Reverse a list.

**Signature**

```ts
export function reverse<A>(fa: List<A>): List<A> { ... }
```

Added in v###

# tail (function)

Gets all but the first element of a list, or `None` if the list is empty.

**Signature**

```ts
export function tail<A>(fa: List<A>): O.Option<List<A>> { ... }
```

Added in v###

# toArray (function)

Gets an array from a list.

**Signature**

```ts
export function toArray<A>(fa: List<A>): Array<A> { ... }
```

Added in v###

# toReversedArray (function)

Gets an array from a list in a reversed order.

**Signature**

```ts
export function toReversedArray<A>(fa: List<A>): Array<A> { ... }
```

Added in v###

# foldMap (export)

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: List<A>) => M
```

Added in v###

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: List<A>) => List<B>
```

Added in v###

# reduce (export)

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: List<A>) => B
```

Added in v###

# reduceRight (export)

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: List<A>) => B
```

Added in v###
