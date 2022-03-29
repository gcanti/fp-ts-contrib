---
title: IOOption.ts
nav_order: 12
parent: Modules
---

## IOOption overview

Added in v0.1.14

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
- [Alternative](#alternative)
  - [zero](#zero)
- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Filterable](#filterable)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [chainFirstIOK](#chainfirstiok)
  - [chainIOK](#chainiok)
  - [chainOptionK](#chainoptionk)
  - [flatten](#flatten)
- [combinators](#combinators)
  - [mapNullable](#mapnullable)
- [constructors](#constructors)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromIOK](#fromiok)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromOptionK](#fromoptionk)
  - [fromPredicate](#frompredicate)
  - [none](#none)
  - [some](#some)
- [destructors](#destructors)
  - [fold](#fold)
  - [getOrElse](#getorelse)
  - [toNullable](#tonullable)
  - [toUndefined](#toundefined)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Alternative](#alternative-1)
  - [Applicative](#applicative-1)
  - [Apply](#apply-1)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getApplyMonoid](#getapplymonoid)
  - [getApplySemigroup](#getapplysemigroup)
- [model](#model)
  - [IOOption (interface)](#iooption-interface)
- [utils](#utils)
  - [ioOption](#iooption)

---

# Alt

## alt

**Signature**

```ts
export declare const alt: <A>(that: () => IOOption<A>) => (fa: IOOption<A>) => IOOption<A>
```

Added in v0.1.18

# Alternative

## zero

**Signature**

```ts
export declare const zero: <A>() => IOOption<A>
```

Added in v0.1.18

# Applicative

## of

**Signature**

```ts
export declare const of: <A>(a: A) => IOOption<A>
```

Added in v0.1.18

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(fa: IOOption<A>) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B>
```

Added in v0.1.18

## apFirst

**Signature**

```ts
export declare const apFirst: <B>(fb: IOOption<B>) => <A>(fa: IOOption<A>) => IOOption<A>
```

Added in v0.1.18

## apSecond

**Signature**

```ts
export declare const apSecond: <B>(fb: IOOption<B>) => <A>(fa: IOOption<A>) => IOOption<B>
```

Added in v0.1.18

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(fa: IOOption<O.Option<A>>) => IOOption<A>
```

Added in v0.1.18

## separate

**Signature**

```ts
export declare const separate: <A, B>(fa: IOOption<Either<A, B>>) => Separated<IOOption<A>, IOOption<B>>
```

Added in v0.1.18

# Filterable

## filter

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: IOOption<A>) => IOOption<B>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => IOOption<A>
}
```

Added in v0.1.18

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fa: IOOption<A>) => IOOption<B>
```

Added in v0.1.18

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: IOOption<A>) => Separated<IOOption<A>, IOOption<B>>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => Separated<IOOption<A>, IOOption<A>>
}
```

Added in v0.1.18

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: IOOption<A>) => Separated<IOOption<B>, IOOption<C>>
```

Added in v0.1.18

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: IOOption<A>) => IOOption<B>
```

Added in v0.1.18

# Monad

## chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => IOOption<B>) => (ma: IOOption<A>) => IOOption<B>
```

Added in v0.1.18

## chainFirst

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => IOOption<B>) => (ma: IOOption<A>) => IOOption<A>
```

Added in v0.1.18

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(f: (a: A) => IO<B>) => (ma: IOOption<A>) => IOOption<A>
```

Added in v0.1.28

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => (ma: IOOption<A>) => IOOption<B>
```

Added in v0.1.28

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <A, B>(f: (a: A) => O.Option<B>) => (ma: IOOption<A>) => IOOption<B>
```

Added in v0.1.14

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: IOOption<IOOption<A>>) => IOOption<A>
```

Added in v0.1.18

# combinators

## mapNullable

**Signature**

```ts
export declare const mapNullable: <A, B>(f: (a: A) => B | null | undefined) => (ma: IOOption<A>) => IOOption<B>
```

Added in v0.1.14

# constructors

## fromIO

**Signature**

```ts
export declare const fromIO: <A = never>(ma: IO<A>) => IOOption<A>
```

Added in v0.1.14

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <A>(ma: IOEither<any, A>) => IOOption<A>
```

Added in v0.1.14

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends unknown[], B>(f: (...a: A) => IO<B>) => (...a: A) => IOOption<B>
```

Added in v0.1.28

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => IOOption<NonNullable<A>>
```

Added in v0.1.14

## fromOption

**Signature**

```ts
export declare const fromOption: <A = never>(ma: O.Option<A>) => IOOption<A>
```

Added in v0.1.14

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends unknown[], B>(f: (...a: A) => O.Option<B>) => (...a: A) => IOOption<B>
```

Added in v0.1.14

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => IOOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => IOOption<B>
  <A>(predicate: Predicate<A>): (a: A) => IOOption<A>
}
```

Added in v0.1.29

## none

**Signature**

```ts
export declare const none: IOOption<never>
```

Added in v0.1.14

## some

**Signature**

```ts
export declare const some: <A = never>(a: A) => IOOption<A>
```

Added in v0.1.14

# destructors

## fold

**Signature**

```ts
export declare const fold: <A, B>(onNone: () => IO<B>, onSome: (a: A) => IO<B>) => (ma: IOOption<A>) => IO<B>
```

Added in v0.1.14

## getOrElse

**Signature**

```ts
export declare const getOrElse: <A>(onNone: () => IO<A>) => (ma: IOOption<A>) => IO<A>
```

Added in v0.1.14

## toNullable

**Signature**

```ts
export declare const toNullable: <A>(ma: IOOption<A>) => IO<A | null>
```

Added in v0.1.14

## toUndefined

**Signature**

```ts
export declare const toUndefined: <A>(ma: IOOption<A>) => IO<A | undefined>
```

Added in v0.1.14

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'IOOption'>
```

Added in v0.1.18

## Alternative

**Signature**

```ts
export declare const Alternative: Alternative1<'IOOption'>
```

Added in v0.1.18

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'IOOption'>
```

Added in v0.1.18

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'IOOption'>
```

Added in v0.1.18

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable1<'IOOption'>
```

Added in v0.1.18

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable1<'IOOption'>
```

Added in v0.1.18

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'IOOption'>
```

Added in v0.1.18

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'IOOption'>
```

Added in v0.1.18

## URI

**Signature**

```ts
export declare const URI: 'IOOption'
```

Added in v0.1.14

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.14

## getApplyMonoid

**Signature**

```ts
export declare const getApplyMonoid: <A>(M: Monoid<A>) => Monoid<IOOption<A>>
```

Added in v0.1.14

## getApplySemigroup

**Signature**

```ts
export declare const getApplySemigroup: <A>(S: Semigroup<A>) => Semigroup<IOOption<A>>
```

Added in v0.1.14

# model

## IOOption (interface)

**Signature**

```ts
export interface IOOption<A> extends IO<Option<A>> {}
```

Added in v0.1.14

# utils

## ioOption

**Signature**

```ts
export declare const ioOption: Monad1<'IOOption'> & Alt1<'IOOption'> & MonadIO1<'IOOption'> & Filterable1<'IOOption'>
```

Added in v0.1.14
