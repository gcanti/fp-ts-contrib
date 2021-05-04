---
title: Zipper.ts
nav_order: 31
parent: Modules
---

## Zipper overview

Provides a pointed array, which is a non-empty zipper-like array structure that tracks an index (focus)
position in an array. Focus can be moved forward and backwards through the array.

The array `[1, 2, 3, 4]` with focus on `3` is represented by `Zipper([1, 2], 3, [4])`

Adapted from

- https://github.com/DavidHarrison/purescript-list-zipper
- https://github.com/thunklife/purescript-zipper
- https://github.com/scalaz/scalaz/blob/series/7.3.x/core/src/main/scala/scalaz/Zipper.scala

Added in v0.1.6

---

<h2 class="text-delta">Table of contents</h2>

- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [Comonad](#comonad)
  - [extract](#extract)
- [Extend](#extend)
  - [duplicate](#duplicate)
  - [extend](#extend)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [map](#map)
- [FunctorWithIndex](#functorwithindex)
  - [mapWithIndex](#mapwithindex)
- [Traversable](#traversable)
  - [sequence](#sequence)
- [combinators](#combinators)
  - [deleteLeft](#deleteleft)
  - [deleteRight](#deleteright)
  - [down](#down)
  - [end](#end)
  - [insertLeft](#insertleft)
  - [insertRight](#insertright)
  - [modify](#modify)
  - [move](#move)
  - [start](#start)
  - [up](#up)
  - [update](#update)
- [constructors](#constructors)
  - [fromArray](#fromarray)
  - [fromNonEmptyArray](#fromnonemptyarray)
  - [fromReadonlyArray](#fromreadonlyarray)
  - [fromReadonlyNonEmptyArray](#fromreadonlynonemptyarray)
  - [make](#make)
- [destructors](#destructors)
  - [isOutOfBound](#isoutofbound)
  - [length](#length)
  - [toNonEmptyArray](#tononemptyarray)
  - [toReadonlyNonEmptyArray](#toreadonlynonemptyarray)
  - [~~toArray~~](#toarray)
- [instances](#instances)
  - [Applicative](#applicative-1)
  - [Apply](#apply-1)
  - [Comonad](#comonad-1)
  - [Foldable](#foldable-1)
  - [Functor](#functor-1)
  - [FunctorWithIndex](#functorwithindex-1)
  - [Traversable](#traversable-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [zipper](#zipper)
- [model](#model)
  - [Zipper (interface)](#zipper-interface)

---

# Applicative

## of

**Signature**

```ts
export declare const of: <A>(focus: A) => Zipper<A>
```

Added in v0.1.6

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(fa: Zipper<A>) => <B>(fab: Zipper<(a: A) => B>) => Zipper<B>
```

Added in v0.1.18

## apFirst

**Signature**

```ts
export declare const apFirst: <B>(fb: Zipper<B>) => <A>(fa: Zipper<A>) => Zipper<A>
```

Added in v0.1.18

## apSecond

**Signature**

```ts
export declare const apSecond: <B>(fb: Zipper<B>) => <A>(fa: Zipper<A>) => Zipper<B>
```

Added in v0.1.18

# Comonad

## extract

**Signature**

```ts
export declare const extract: <A>(wa: Zipper<A>) => A
```

Added in v0.1.18

# Extend

## duplicate

**Signature**

```ts
export declare const duplicate: <A>(wa: Zipper<A>) => Zipper<Zipper<A>>
```

Added in v0.1.18

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (fa: Zipper<A>) => B) => (wa: Zipper<A>) => Zipper<B>
```

Added in v0.1.18

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Zipper<A>) => M
```

Added in v0.1.18

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Zipper<A>) => B
```

Added in v0.1.18

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Zipper<A>) => B
```

Added in v0.1.18

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: Zipper<A>) => Zipper<B>
```

Added in v0.1.18

# FunctorWithIndex

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: Zipper<A>) => Zipper<B>
```

Added in v0.1.18

# Traversable

## sequence

**Signature**

```ts
export declare const sequence: Sequence1<'Zipper'>
```

Added in v0.1.18

# combinators

## deleteLeft

Deletes the element at focus and moves the focus to the left. If there is no element on the left,
the focus is moved to the right.

**Signature**

```ts
export declare const deleteLeft: <A>(fa: Zipper<A>) => Option<Zipper<A>>
```

Added in v0.1.6

## deleteRight

Deletes the element at focus and moves the focus to the right. If there is no element on the right,
the focus is moved to the left.

**Signature**

```ts
export declare const deleteRight: <A>(fa: Zipper<A>) => Option<Zipper<A>>
```

Added in v0.1.6

## down

Moves focus of the zipper down.

**Signature**

```ts
export declare const down: <A>(fa: Zipper<A>) => Option<Zipper<A>>
```

Added in v0.1.6

## end

Moves focus to the end of the zipper.

**Signature**

```ts
export declare const end: <A>(fa: Zipper<A>) => Zipper<A>
```

Added in v0.1.6

## insertLeft

Inserts an element to the left of the focus and focuses on the new element.

**Signature**

```ts
export declare const insertLeft: <A>(a: A) => (fa: Zipper<A>) => Zipper<A>
```

Added in v0.1.6

## insertRight

Inserts an element to the right of the focus and focuses on the new element.

**Signature**

```ts
export declare const insertRight: <A>(a: A) => (fa: Zipper<A>) => Zipper<A>
```

Added in v0.1.6

## modify

Applies `f` to the focus and update with the result.

**Signature**

```ts
export declare const modify: <A>(f: (a: A) => A) => (fa: Zipper<A>) => Zipper<A>
```

Added in v0.1.6

## move

Moves focus in the zipper, or `None` if there is no such element.

**Signature**

```ts
export declare const move: <A>(f: (currentIndex: number) => number, fa: Zipper<A>) => Option<Zipper<A>>
```

Added in v0.1.6

## start

Moves focus to the start of the zipper.

**Signature**

```ts
export declare const start: <A>(fa: Zipper<A>) => Zipper<A>
```

Added in v0.1.6

## up

Moves focus of the zipper up.

**Signature**

```ts
export declare const up: <A>(fa: Zipper<A>) => Option<Zipper<A>>
```

Added in v0.1.6

## update

Updates the focus of the zipper.

**Signature**

```ts
export declare const update: <A>(a: A) => (fa: Zipper<A>) => Zipper<A>
```

Added in v0.1.6

# constructors

## fromArray

**Signature**

```ts
export declare const fromArray: <A>(as: A[], focusIndex?: number | undefined) => Option<Zipper<A>>
```

Added in v0.1.6

## fromNonEmptyArray

**Signature**

```ts
export declare const fromNonEmptyArray: <A>(nea: NEA.NonEmptyArray<A>) => Zipper<A>
```

Added in v0.1.6

## fromReadonlyArray

**Signature**

```ts
export declare const fromReadonlyArray: <A>(as: readonly A[], focusIndex?: number | undefined) => Option<Zipper<A>>
```

Added in v0.1.23

## fromReadonlyNonEmptyArray

**Signature**

```ts
export declare const fromReadonlyNonEmptyArray: <A>(rnea: ReadonlyNonEmptyArray<A>) => Zipper<A>
```

Added in v0.1.23

## make

Creates a new zipper.

**Signature**

```ts
export declare const make: <A>(lefts: readonly A[], focus: A, rights: readonly A[]) => Zipper<A>
```

Added in v0.1.6

# destructors

## isOutOfBound

**Signature**

```ts
export declare const isOutOfBound: <A>(index: number, fa: Zipper<A>) => boolean
```

Added in v0.1.18

## length

**Signature**

```ts
export declare const length: <A>(fa: Zipper<A>) => number
```

Added in v0.1.6

## toNonEmptyArray

**Signature**

```ts
export declare const toNonEmptyArray: <A>(fa: Zipper<A>) => NEA.NonEmptyArray<A>
```

Added in v0.1.23

## toReadonlyNonEmptyArray

**Signature**

```ts
export declare const toReadonlyNonEmptyArray: <A>(fa: Zipper<A>) => ReadonlyNonEmptyArray<A>
```

Added in v0.1.23

## ~~toArray~~

**Signature**

```ts
export declare const toArray: <A>(fa: Zipper<A>) => A[]
```

Added in v0.1.6

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'Zipper'>
```

Added in v0.1.18

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'Zipper'>
```

Added in v0.1.18

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad1<'Zipper'>
```

Added in v0.1.18

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'Zipper'>
```

Added in v0.1.18

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'Zipper'>
```

Added in v0.1.18

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: FunctorWithIndex1<'Zipper', number>
```

Added in v0.1.18

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'Zipper'>
```

Added in v0.1.18

## URI

**Signature**

```ts
export declare const URI: 'Zipper'
```

Added in v0.1.6

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.6

## getMonoid

**Signature**

```ts
export declare const getMonoid: <A>(M: Monoid<A>) => Monoid<Zipper<A>>
```

Added in v0.1.6

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <A>(S: Semigroup<A>) => Semigroup<Zipper<A>>
```

Added in v0.1.6

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<Zipper<A>>
```

Added in v0.1.6

## zipper

**Signature**

```ts
export declare const zipper: Applicative1<'Zipper'> &
  Foldable1<'Zipper'> &
  Traversable1<'Zipper'> &
  Comonad1<'Zipper'> &
  FunctorWithIndex1<'Zipper', number>
```

Added in v0.1.6

# model

## Zipper (interface)

**Signature**

```ts
export interface Zipper<A> {
  readonly lefts: Array<A>
  readonly focus: A
  readonly rights: Array<A>
}
```

Added in v0.1.6
