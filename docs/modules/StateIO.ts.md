---
title: StateIO.ts
nav_order: 21
parent: Modules
---

## StateIO overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [chainIOK](#chainiok)
  - [flatten](#flatten)
- [constructors](#constructors)
  - [fromIO](#fromio)
  - [fromIOK](#fromiok)
  - [fromState](#fromstate)
  - [get](#get)
  - [gets](#gets)
  - [modify](#modify)
  - [put](#put)
- [instances](#instances)
  - [Applicative](#applicative-1)
  - [Apply](#apply-1)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [stateIO](#stateio)
- [model](#model)
  - [StateIO (interface)](#stateio-interface)
- [utils](#utils)
  - [evalState](#evalstate)
  - [execState](#execstate)
  - [run](#run)

---

# Applicative

## of

**Signature**

```ts
export declare const of: <E, A>(a: A) => StateIO<E, A>
```

Added in v0.1.18

# Apply

## ap

**Signature**

```ts
export declare const ap: <E, A>(fa: StateIO<E, A>) => <B>(fab: StateIO<E, (a: A) => B>) => StateIO<E, B>
```

Added in v0.1.18

## apFirst

**Signature**

```ts
export declare const apFirst: <E, B>(fb: StateIO<E, B>) => <A>(fa: StateIO<E, A>) => StateIO<E, A>
```

Added in v0.1.18

## apSecond

**Signature**

```ts
export declare const apSecond: <E, B>(fb: StateIO<E, B>) => <A>(fa: StateIO<E, A>) => StateIO<E, B>
```

Added in v0.1.18

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: StateIO<E, A>) => StateIO<E, B>
```

Added in v0.1.18

# Monad

## chain

**Signature**

```ts
export declare const chain: <E, A, B>(f: (a: A) => StateIO<E, B>) => (ma: StateIO<E, A>) => StateIO<E, B>
```

Added in v0.1.18

## chainFirst

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => StateIO<E, B>) => (ma: StateIO<E, A>) => StateIO<E, A>
```

Added in v0.1.18

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => I.IO<B>) => <R>(ma: StateIO<R, A>) => StateIO<R, B>
```

Added in v0.1.10

## flatten

**Signature**

```ts
export declare const flatten: <E, A>(mma: StateIO<E, StateIO<E, A>>) => StateIO<E, A>
```

Added in v0.1.18

# constructors

## fromIO

**Signature**

```ts
export declare const fromIO: <S, A>(ma: I.IO<A>) => StateIO<S, A>
```

Added in v0.1.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends unknown[], B>(f: (...a: A) => I.IO<B>) => <R>(...a: A) => StateIO<R, B>
```

Added in v0.1.10

## fromState

**Signature**

```ts
export declare const fromState: <S, A>(ma: State<S, A>) => StateIO<S, A>
```

Added in v0.1.0

## get

**Signature**

```ts
export declare const get: <S>() => StateIO<S, S>
```

Added in v0.1.0

## gets

**Signature**

```ts
export declare const gets: <S, A>(f: (s: S) => A) => StateIO<S, A>
```

Added in v0.1.0

## modify

**Signature**

```ts
export declare const modify: <S>(f: (s: S) => S) => StateIO<S, void>
```

Added in v0.1.0

## put

**Signature**

```ts
export declare const put: <S>(s: S) => StateIO<S, void>
```

Added in v0.1.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'StateIO'>
```

Added in v0.1.18

## Apply

**Signature**

```ts
export declare const Apply: Apply2<'StateIO'>
```

Added in v0.1.18

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'StateIO'>
```

Added in v0.1.18

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'StateIO'>
```

Added in v0.1.18

## URI

**Signature**

```ts
export declare const URI: 'StateIO'
```

Added in v0.1.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.0

## stateIO

**Signature**

```ts
export declare const stateIO: Monad2<'StateIO'>
```

Added in v0.1.0

# model

## StateIO (interface)

**Signature**

```ts
export interface StateIO<S, A> {
  (s: S): IO<[A, S]>
}
```

Added in v0.1.0

# utils

## evalState

**Signature**

```ts
export declare const evalState: <S, A>(ma: StateIO<S, A>, s: S) => I.IO<A>
```

Added in v0.1.0

## execState

**Signature**

```ts
export declare const execState: <S, A>(ma: StateIO<S, A>, s: S) => I.IO<S>
```

Added in v0.1.0

## run

**Signature**

```ts
export declare const run: <S, A>(ma: StateIO<S, A>, s: S) => A
```

Added in v0.1.0
