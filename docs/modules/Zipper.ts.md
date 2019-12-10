---
title: Zipper.ts
nav_order: 21
parent: Modules
---

# Overview

Provides a pointed array, which is a non-empty zipper-like array structure that tracks an index (focus)
position in an array. Focus can be moved forward and backwards through the array.

The array `[1, 2, 3, 4]` with focus on `3` is represented by `Zipper([1, 2], 3, [4])`

Adapted from

- https://github.com/DavidHarrison/purescript-list-zipper
- https://github.com/thunklife/purescript-zipper
- https://github.com/scalaz/scalaz/blob/series/7.3.x/core/src/main/scala/scalaz/Zipper.scala

---

<h2 class="text-delta">Table of contents</h2>

- [Zipper (interface)](#zipper-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [zipper (constant)](#zipper-constant)
- [deleteLeft (function)](#deleteleft-function)
- [deleteRight (function)](#deleteright-function)
- [down (function)](#down-function)
- [end (function)](#end-function)
- [fromArray (function)](#fromarray-function)
- [fromNonEmptyArray (function)](#fromnonemptyarray-function)
- [getMonoid (function)](#getmonoid-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getShow (function)](#getshow-function)
- [insertLeft (function)](#insertleft-function)
- [insertRight (function)](#insertright-function)
- [isOutOfBound (function)](#isoutofbound-function)
- [length (function)](#length-function)
- [make (function)](#make-function)
- [modify (function)](#modify-function)
- [move (function)](#move-function)
- [of (function)](#of-function)
- [start (function)](#start-function)
- [toArray (function)](#toarray-function)
- [up (function)](#up-function)
- [update (function)](#update-function)
- [ap (export)](#ap-export)
- [foldMap (export)](#foldmap-export)
- [map (export)](#map-export)
- [reduce (export)](#reduce-export)
- [reduceRight (export)](#reduceright-export)

---

# Zipper (interface)

**Signature**

```ts
export interface Zipper<A> {
  readonly lefts: Array<A>
  readonly focus: A
  readonly rights: Array<A>
}
```

Added in v0.1.6

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.6

# URI (constant)

**Signature**

```ts
export const URI: "Zipper" = ...
```

Added in v0.1.6

# zipper (constant)

**Signature**

```ts
export const zipper: Applicative1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI> = ...
```

Added in v0.1.6

# deleteLeft (function)

Deletes the element at focus and moves the focus to the left. If there is no element on the left,
the focus is moved to the right.

**Signature**

```ts
export function deleteLeft<A>(fa: Zipper<A>): Option<Zipper<A>> { ... }
```

Added in v0.1.6

# deleteRight (function)

Deletes the element at focus and moves the focus to the right. If there is no element on the right,
the focus is moved to the left.

**Signature**

```ts
export function deleteRight<A>(fa: Zipper<A>): Option<Zipper<A>> { ... }
```

Added in v0.1.6

# down (function)

Moves focus of the zipper down.

**Signature**

```ts
export function down<A>(fa: Zipper<A>): Option<Zipper<A>> { ... }
```

Added in v0.1.6

# end (function)

Moves focus to the end of the zipper.

**Signature**

```ts
export function end<A>(fa: Zipper<A>): Zipper<A> { ... }
```

Added in v0.1.6

# fromArray (function)

**Signature**

```ts
export function fromArray<A>(as: Array<A>, focusIndex: number = 0): Option<Zipper<A>> { ... }
```

Added in v0.1.6

# fromNonEmptyArray (function)

**Signature**

```ts
export function fromNonEmptyArray<A>(nea: NonEmptyArray<A>): Zipper<A> { ... }
```

Added in v0.1.6

# getMonoid (function)

**Signature**

```ts
export function getMonoid<A>(M: Monoid<A>): Monoid<Zipper<A>> { ... }
```

Added in v0.1.6

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<A>(S: Semigroup<A>): Semigroup<Zipper<A>> { ... }
```

Added in v0.1.6

# getShow (function)

**Signature**

```ts
export function getShow<A>(S: Show<A>): Show<Zipper<A>> { ... }
```

Added in v0.1.6

# insertLeft (function)

Inserts an element to the left of the focus and focuses on the new element.

**Signature**

```ts
export function insertLeft<A>(a: A): (fa: Zipper<A>) => Zipper<A> { ... }
```

Added in v0.1.6

# insertRight (function)

Inserts an element to the right of the focus and focuses on the new element.

**Signature**

```ts
export function insertRight<A>(a: A): (fa: Zipper<A>) => Zipper<A> { ... }
```

Added in v0.1.6

# isOutOfBound (function)

**Signature**

```ts
export function isOutOfBound<A>(index: number, fa: Zipper<A>): boolean { ... }
```

Added in v0.1.6

# length (function)

**Signature**

```ts
export function length<A>(fa: Zipper<A>): number { ... }
```

Added in v0.1.6

# make (function)

Creates a new zipper.

**Signature**

```ts
export function make<A>(lefts: Array<A>, focus: A, rights: Array<A>): Zipper<A> { ... }
```

Added in v0.1.6

# modify (function)

Applies `f` to the focus and update with the result.

**Signature**

```ts
export function modify<A>(f: (a: A) => A): (fa: Zipper<A>) => Zipper<A> { ... }
```

Added in v0.1.6

# move (function)

Moves focus in the zipper, or `None` if there is no such element.

**Signature**

```ts
export function move<A>(f: (currentIndex: number) => number, fa: Zipper<A>): Option<Zipper<A>> { ... }
```

Added in v0.1.6

# of (function)

**Signature**

```ts
export function of<A>(focus: A): Zipper<A> { ... }
```

Added in v0.1.6

# start (function)

Moves focus to the start of the zipper.

**Signature**

```ts
export function start<A>(fa: Zipper<A>): Zipper<A> { ... }
```

Added in v0.1.6

# toArray (function)

**Signature**

```ts
export function toArray<A>(fa: Zipper<A>): Array<A> { ... }
```

Added in v0.1.6

# up (function)

Moves focus of the zipper up.

**Signature**

```ts
export function up<A>(fa: Zipper<A>): Option<Zipper<A>> { ... }
```

Added in v0.1.6

# update (function)

Updates the focus of the zipper.

**Signature**

```ts
export function update<A>(a: A): (fa: Zipper<A>) => Zipper<A> { ... }
```

Added in v0.1.6

# ap (export)

**Signature**

```ts
<A>(fa: Zipper<A>) => <B>(fab: Zipper<(a: A) => B>) => Zipper<B>
```

Added in v0.1.6

# foldMap (export)

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Zipper<A>) => M
```

Added in v0.1.6

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: Zipper<A>) => Zipper<B>
```

Added in v0.1.6

# reduce (export)

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: Zipper<A>) => B
```

Added in v0.1.6

# reduceRight (export)

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: Zipper<A>) => B
```

Added in v0.1.6
