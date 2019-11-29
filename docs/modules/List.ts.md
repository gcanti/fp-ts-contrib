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
- [length (function)](#length-function)
- [reverse (function)](#reverse-function)
- [singleton (function)](#singleton-function)
- [tail (function)](#tail-function)
- [toArray (function)](#toarray-function)
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
}
```

Added in v2.1.1

# Nil (interface)

**Signature**

```ts
export interface Nil {
  readonly type: 'Nil'
}
```

Added in v2.1.1

# List (type alias)

**Signature**

```ts
export type List<A> = Nil | Cons<A>
```

Added in v2.1.1

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.1.1

# URI (constant)

**Signature**

```ts
export const URI: "List" = ...
```

Added in v2.1.1

# list (constant)

**Signature**

```ts
export const list: Functor1<URI> & Foldable1<URI> & Traversable1<URI> = ...
```

Added in v2.1.1

# nil (constant)

**Signature**

```ts
export const nil: List<never> = ...
```

Added in v2.1.1

# cons (function)

**Signature**

```ts
export function cons<A>(head: A, tail: List<A>): List<A> { ... }
```

Added in v2.1.1

# dropLeft (function)

Drops the specified number of elements from the front of a list.

**Signature**

```ts
export function dropLeft(n: number): <A>(fa: List<A>) => List<A> { ... }
```

Added in v2.1.1

# dropLeftWhile (function)

Drops those elements from the front of a list which match a predicate.

**Signature**

```ts
export function dropLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (fa: List<A>) => List<B>
export function dropLeftWhile<A>(predicate: Predicate<A>): (fa: List<A>) => List<A> { ... }
```

Added in v2.1.1

# findIndex (function)

Finds the first index for which a predicate holds.

**Signature**

```ts
export function findIndex<A>(predicate: Predicate<A>, fa: List<A>): O.Option<number> { ... }
```

Added in v2.1.1

# foldLeft (function)

Breaks a list into its first element and the remaining elements.

**Signature**

```ts
export function foldLeft<A, B>(onNil: () => B, onCons: (head: A, tail: List<A>) => B): (fa: List<A>) => B { ... }
```

Added in v2.1.1

# fromArray (function)

Creates a list from an array

**Signature**

```ts
export function fromArray<A>(as: Array<A>): List<A> { ... }
```

Added in v2.1.1

# head (function)

Gets the first element in a list, or `None` if the list is empty.

**Signature**

```ts
export function head<A>(fa: List<A>): O.Option<A> { ... }
```

Added in v2.1.1

# isCons (function)

**Signature**

```ts
export function isCons<A>(a: List<A>): a is Cons<A> { ... }
```

Added in v2.1.1

# isNil (function)

**Signature**

```ts
export function isNil<A>(a: List<A>): a is Nil { ... }
```

Added in v2.1.1

# length (function)

Gets the length of a list.

**Signature**

```ts
export function length<A>(fa: List<A>): number { ... }
```

Added in v2.1.1

# reverse (function)

Reverse a list.

**Signature**

```ts
export function reverse<A>(fa: List<A>): List<A> { ... }
```

Added in v2.1.1

# singleton (function)

Creates a list with a single element.

**Signature**

```ts
export function singleton<A>(head: A): List<A> { ... }
```

Added in v2.1.1

# tail (function)

Gets all but the first element of a list, or `None` if the list is empty.

**Signature**

```ts
export function tail<A>(fa: List<A>): O.Option<List<A>> { ... }
```

Added in v2.1.1

# toArray (function)

Gets an array from a list.

**Signature**

```ts
export function toArray<A>(fa: List<A>): Array<A> { ... }
```

Added in v2.1.1

# foldMap (export)

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: List<A>) => M
```

Added in v2.1.1

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: List<A>) => List<B>
```

Added in v2.1.1

# reduce (export)

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: List<A>) => B
```

Added in v2.1.1

# reduceRight (export)

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: List<A>) => B
```

Added in v2.1.1
