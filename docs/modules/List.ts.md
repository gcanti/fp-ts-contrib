---
title: List.ts
nav_order: 13
parent: Modules
---

## List overview

Adapted from https://github.com/purescript/purescript-lists

Added in v0.1.8

---

<h2 class="text-delta">Table of contents</h2>

- [Applicative](#applicative)
  - [of](#of)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [map](#map)
- [Traversable](#traversable)
  - [sequence](#sequence)
- [combinators](#combinators)
  - [dropLeft](#dropleft)
  - [reverse](#reverse)
- [constructors](#constructors)
  - [cons](#cons)
  - [fromArray](#fromarray)
  - [nil](#nil)
- [destructors](#destructors)
  - [foldLeft](#foldleft)
  - [head](#head)
  - [tail](#tail)
  - [toArray](#toarray)
  - [toReversedArray](#toreversedarray)
- [instances](#instances)
  - [Foldable](#foldable-1)
  - [Functor](#functor-1)
  - [Traversable](#traversable-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getEq](#geteq)
  - [list](#list)
- [model](#model)
  - [Cons (interface)](#cons-interface)
  - [List (type alias)](#list-type-alias)
  - [Nil (interface)](#nil-interface)
- [utils](#utils)
  - [dropLeftWhile](#dropleftwhile)
  - [findIndex](#findindex)
  - [isCons](#iscons)
  - [isNil](#isnil)

---

# Applicative

## of

Creates a list with a single element.

**Signature**

```ts
export declare const of: <A>(head: A) => List<A>
```

**Example**

```ts
import * as L from 'fp-ts-contrib/List'

assert.deepStrictEqual(L.of('a'), L.cons('a', L.nil))
```

Added in v0.1.8

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: List<A>) => M
```

Added in v0.1.18

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: List<A>) => B
```

Added in v0.1.18

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: List<A>) => B
```

Added in v0.1.18

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: List<A>) => List<B>
```

Added in v0.1.18

# Traversable

## sequence

**Signature**

```ts
export declare const sequence: Sequence1<'List'>
```

Added in v0.1.18

# combinators

## dropLeft

Drops the specified number of elements from the front of a list.

**Signature**

```ts
export declare const dropLeft: (n: number) => <A>(fa: List<A>) => List<A>
```

**Example**

```ts
import * as L from 'fp-ts-contrib/List'

assert.deepStrictEqual(L.dropLeft(1)(L.nil), L.nil)
assert.deepStrictEqual(L.dropLeft(1)(L.cons(1, L.of(2))), L.of(2))
assert.deepStrictEqual(L.dropLeft(3)(L.cons(1, L.of(2))), L.nil)
```

Added in v0.1.8

## reverse

Reverse a list.

**Signature**

```ts
export declare const reverse: <A>(fa: List<A>) => List<A>
```

**Example**

```ts
import * as L from 'fp-ts-contrib/List'

assert.deepStrictEqual(L.reverse(L.cons(1, L.cons(2, L.of(3)))), L.cons(3, L.cons(2, L.of(1))))
```

Added in v0.1.8

# constructors

## cons

Attaches an element to the front of a list.

**Signature**

```ts
export declare const cons: <A>(head: A, tail: List<A>) => List<A>
```

**Example**

```ts
import * as L from 'fp-ts-contrib/List'

assert.deepStrictEqual(L.cons('a', L.nil), { type: 'Cons', head: 'a', tail: L.nil, length: 1 })
```

Added in v0.1.8

## fromArray

Creates a list from an array

**Signature**

```ts
export declare const fromArray: <A>(as: A[]) => List<A>
```

**Example**

```ts
import * as L from 'fp-ts-contrib/List'

assert.deepStrictEqual(L.fromArray([]), L.nil)
assert.deepStrictEqual(L.fromArray(['a', 'b']), L.cons('a', L.of('b')))
```

Added in v0.1.8

## nil

**Signature**

```ts
export declare const nil: List<never>
```

Added in v0.1.8

# destructors

## foldLeft

Breaks a list into its first element and the remaining elements.

**Signature**

```ts
export declare const foldLeft: <A, B>(onNil: () => B, onCons: (head: A, tail: List<A>) => B) => (fa: List<A>) => B
```

**Example**

```ts
import * as L from 'fp-ts-contrib/List'

const len: <A>(as: L.List<A>) => number = L.foldLeft(
  () => 0,
  (_, tail) => 1 + len(tail)
)
assert.deepStrictEqual(len(L.cons('a', L.of('b'))), 2)
```

Added in v0.1.8

## head

Gets the first element in a list, or `None` if the list is empty.

**Signature**

```ts
export declare const head: <A>(fa: List<A>) => O.Option<A>
```

**Example**

```ts
import * as O from 'fp-ts/Option'
import * as L from 'fp-ts-contrib/List'

assert.deepStrictEqual(L.head(L.nil), O.none)
assert.deepStrictEqual(L.head(L.cons('x', L.of('a'))), O.some('x'))
```

Added in v0.1.8

## tail

Gets all but the first element of a list, or `None` if the list is empty.

**Signature**

```ts
export declare const tail: <A>(fa: List<A>) => O.Option<List<A>>
```

**Example**

```ts
import * as O from 'fp-ts/Option'
import * as L from 'fp-ts-contrib/List'

assert.deepStrictEqual(L.tail(L.nil), O.none)
assert.deepStrictEqual(L.tail(L.of('a')), O.some(L.nil))
assert.deepStrictEqual(L.tail(L.cons('x', L.of('a'))), O.some(L.of('a')))
```

Added in v0.1.8

## toArray

Gets an array from a list.

**Signature**

```ts
export declare const toArray: <A>(fa: List<A>) => A[]
```

**Example**

```ts
import * as L from 'fp-ts-contrib/List'

assert.deepStrictEqual(L.toArray(L.cons('a', L.of('b'))), ['a', 'b'])
```

Added in v0.1.8

## toReversedArray

Gets an array from a list in a reversed order.

**Signature**

```ts
export declare const toReversedArray: <A>(fa: List<A>) => A[]
```

**Example**

```ts
import * as L from 'fp-ts-contrib/List'

assert.deepStrictEqual(L.toReversedArray(L.cons('a', L.of('b'))), ['b', 'a'])
```

Added in v0.1.8

# instances

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'List'>
```

Added in v0.1.18

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'List'>
```

Added in v0.1.18

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'List'>
```

Added in v0.1.18

## URI

**Signature**

```ts
export declare const URI: 'List'
```

Added in v0.1.8

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.8

## getEq

Derives an `Eq` over the `List` of a given element type from the `Eq` of that type.
The derived `Eq` defines two lists as equal if all elements of both lists
are compared equal pairwise with the given `E`. In case of lists of different
lengths, the result is non equality.

**Signature**

```ts
export declare const getEq: <A>(E: Eq.Eq<A>) => Eq.Eq<List<A>>
```

**Example**

```ts
import { eqString } from 'fp-ts/Eq'
import * as L from 'fp-ts-contrib/List'

const E = L.getEq(eqString)
assert.strictEqual(E.equals(L.cons('a', L.of('b')), L.cons('a', L.of('b'))), true)
assert.strictEqual(E.equals(L.of('x'), L.nil), false)
```

Added in v0.1.8

## list

**Signature**

```ts
export declare const list: Functor1<'List'> & Foldable1<'List'> & Traversable1<'List'>
```

Added in v0.1.8

# model

## Cons (interface)

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

## List (type alias)

**Signature**

```ts
export type List<A> = Nil | Cons<A>
```

Added in v0.1.8

## Nil (interface)

**Signature**

```ts
export interface Nil {
  readonly type: 'Nil'
  readonly length: 0
}
```

Added in v0.1.8

# utils

## dropLeftWhile

Drops those elements from the front of a list which match a predicate.

**Signature**

```ts
export declare function dropLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (fa: List<A>) => List<B>
export declare function dropLeftWhile<A>(predicate: Predicate<A>): (fa: List<A>) => List<A>
```

**Example**

```ts
import * as L from 'fp-ts-contrib/List'

const isLTThree = (n: number) => n < 3
assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.nil), L.nil)
assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.cons(1, L.cons(2, L.of(3)))), L.of(3))
assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.cons(1, L.of(2))), L.nil)
```

Added in v0.1.8

## findIndex

Finds the first index for which a predicate holds.

**Signature**

```ts
export declare const findIndex: <A>(predicate: Predicate<A>) => (fa: List<A>) => O.Option<number>
```

**Example**

```ts
import * as O from 'fp-ts/Option'
import * as L from 'fp-ts-contrib/List'

const f = (a: number): boolean => a % 2 === 0
const findIndexEven = L.findIndex(f)
assert.deepStrictEqual(findIndexEven(L.nil), O.none)
assert.deepStrictEqual(findIndexEven(L.cons(1, L.of(2))), O.some(1))
assert.deepStrictEqual(findIndexEven(L.of(1)), O.none)
```

Added in v0.1.8

## isCons

Tests whether a list is a non empty list.

**Signature**

```ts
export declare const isCons: <A>(a: List<A>) => a is Cons<A>
```

**Example**

```ts
import * as L from 'fp-ts-contrib/List'

assert.strictEqual(L.isCons(L.nil), false)
assert.strictEqual(L.isCons(L.of(1)), true)
```

Added in v0.1.8

## isNil

Tests whether a list is an empty list.

**Signature**

```ts
export declare const isNil: <A>(a: List<A>) => a is Nil
```

**Example**

```ts
import * as L from 'fp-ts-contrib/List'

assert.strictEqual(L.isNil(L.nil), true)
assert.strictEqual(L.isNil(L.of(6)), false)
```

Added in v0.1.8
