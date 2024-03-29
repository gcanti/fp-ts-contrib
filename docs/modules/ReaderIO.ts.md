---
title: ReaderIO.ts
nav_order: 14
parent: Modules
---

## ReaderIO overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [apW](#apw)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [chainIOK](#chainiok)
  - [chainW](#chainw)
  - [flatten](#flatten)
  - [flattenW](#flattenw)
- [combinators](#combinators)
  - [asksReaderIO](#asksreaderio)
  - [asksReaderIOW](#asksreaderiow)
  - [chainFirstW](#chainfirstw)
  - [local](#local)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [fromIO](#fromio)
  - [fromIOK](#fromiok)
  - [fromReader](#fromreader)
- [instances](#instances)
  - [Applicative](#applicative-1)
  - [Apply](#apply-1)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [readerIO](#readerio)
- [model](#model)
  - [ReaderIO (interface)](#readerio-interface)
- [utils](#utils)
  - [run](#run)

---

# Applicative

## of

**Signature**

```ts
export declare const of: <E, A>(a: A) => ReaderIO<E, A>
```

Added in v0.1.18

# Apply

## ap

**Signature**

```ts
export declare const ap: <E, A>(fa: ReaderIO<E, A>) => <B>(fab: ReaderIO<E, (a: A) => B>) => ReaderIO<E, B>
```

Added in v0.1.18

## apFirst

**Signature**

```ts
export declare const apFirst: <E, B>(fb: ReaderIO<E, B>) => <A>(fa: ReaderIO<E, A>) => ReaderIO<E, A>
```

Added in v0.1.18

## apSecond

**Signature**

```ts
export declare const apSecond: <E, B>(fb: ReaderIO<E, B>) => <A>(fa: ReaderIO<E, A>) => ReaderIO<E, B>
```

Added in v0.1.18

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <R2, A>(
  fa: ReaderIO<R2, A>
) => <R1, B>(fab: ReaderIO<R1, (a: A) => B>) => ReaderIO<R1 & R2, B>
```

Added in v0.1.28

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: ReaderIO<E, A>) => ReaderIO<E, B>
```

Added in v0.1.18

# Monad

## chain

**Signature**

```ts
export declare const chain: <E, A, B>(f: (a: A) => ReaderIO<E, B>) => (ma: ReaderIO<E, A>) => ReaderIO<E, B>
```

Added in v0.1.18

## chainFirst

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => ReaderIO<E, B>) => (ma: ReaderIO<E, A>) => ReaderIO<E, A>
```

Added in v0.1.18

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => I.IO<B>) => <R>(ma: ReaderIO<R, A>) => ReaderIO<R, B>
```

Added in v0.1.10

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <R2, A, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, B>
```

Added in v0.1.28

## flatten

**Signature**

```ts
export declare const flatten: <E, A>(mma: ReaderIO<E, ReaderIO<E, A>>) => ReaderIO<E, A>
```

Added in v0.1.18

## flattenW

Less strict version of [`flatten`](#flatten).

**Signature**

```ts
export declare const flattenW: <R1, R2, A>(mma: ReaderIO<R1, ReaderIO<R2, A>>) => ReaderIO<R1 & R2, A>
```

Added in v0.1.28

# combinators

## asksReaderIO

Effectfully accesses the environment.

**Signature**

```ts
export declare const asksReaderIO: <R, A>(f: (r: R) => ReaderIO<R, A>) => ReaderIO<R, A>
```

Added in v0.1.27

## asksReaderIOW

Less strict version of [`asksReaderIO`](#asksreaderio).

**Signature**

```ts
export declare const asksReaderIOW: <R1, R2, A>(f: (r1: R1) => ReaderIO<R2, A>) => ReaderIO<R1 & R2, A>
```

Added in v0.1.27

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst).

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirstW: <R2, A, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, A>
```

Added in v0.1.28

## local

**Signature**

```ts
export declare const local: <Q, R>(f: (f: Q) => R) => <A>(ma: ReaderIO<R, A>) => ReaderIO<Q, A>
```

Added in v0.1.0

# constructors

## ask

**Signature**

```ts
export declare const ask: <R>() => ReaderIO<R, R>
```

Added in v0.1.0

## asks

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderIO<R, A>
```

Added in v0.1.0

## fromIO

**Signature**

```ts
export declare const fromIO: <R, A>(ma: I.IO<A>) => ReaderIO<R, A>
```

Added in v0.1.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends unknown[], B>(f: (...a: A) => I.IO<B>) => <R>(...a: A) => ReaderIO<R, B>
```

Added in v0.1.10

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A>(ma: Reader<R, A>) => ReaderIO<R, A>
```

Added in v0.1.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'ReaderIO'>
```

Added in v0.1.18

## Apply

**Signature**

```ts
export declare const Apply: Apply2<'ReaderIO'>
```

Added in v0.1.18

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'ReaderIO'>
```

Added in v0.1.18

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'ReaderIO'>
```

Added in v0.1.18

## URI

**Signature**

```ts
export declare const URI: 'ReaderIO'
```

Added in v0.1.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.0

## readerIO

**Signature**

```ts
export declare const readerIO: Monad2<'ReaderIO'>
```

Added in v0.1.0

# model

## ReaderIO (interface)

**Signature**

```ts
export interface ReaderIO<R, A> {
  (r: R): IO<A>
}
```

Added in v0.1.0

# utils

## run

**Signature**

```ts
export declare const run: <R, A>(ma: ReaderIO<R, A>, r: R) => A
```

Added in v0.1.0
