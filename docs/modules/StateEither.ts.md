---
title: StateEither.ts
nav_order: 19
parent: Modules
---

## StateEither overview

Added in v0.1.12

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
  - [flatten](#flatten)
- [combinators](#combinators)
  - [filterOrElse](#filterorelse)
- [constructors](#constructors)
  - [fromEither](#fromeither)
  - [fromEitherK](#fromeitherk)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
  - [get](#get)
  - [gets](#gets)
  - [left](#left)
  - [leftState](#leftstate)
  - [modify](#modify)
  - [put](#put)
  - [right](#right)
  - [rightState](#rightstate)
- [instances](#instances)
  - [Applicative](#applicative-1)
  - [Apply](#apply-1)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [MonadThrow](#monadthrow)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [stateEither](#stateeither)
- [model](#model)
  - [StateEither (interface)](#stateeither-interface)
- [utils](#utils)
  - [chainEitherK](#chaineitherk)
  - [evalState](#evalstate)
  - [execState](#execstate)

---

# Applicative

## of

**Signature**

```ts
export declare const of: <R, E, A>(a: A) => StateEither<R, E, A>
```

Added in v0.1.18

# Apply

## ap

**Signature**

```ts
export declare const ap: <R, E, A>(
  fa: StateEither<R, E, A>
) => <B>(fab: StateEither<R, E, (a: A) => B>) => StateEither<R, E, B>
```

Added in v0.1.18

## apFirst

**Signature**

```ts
export declare const apFirst: <R, E, B>(
  fb: StateEither<R, E, B>
) => <A>(fa: StateEither<R, E, A>) => StateEither<R, E, A>
```

Added in v0.1.18

## apSecond

**Signature**

```ts
export declare const apSecond: <R, E, B>(
  fb: StateEither<R, E, B>
) => <A>(fa: StateEither<R, E, A>) => StateEither<R, E, B>
```

Added in v0.1.18

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(fa: StateEither<R, E, A>) => StateEither<R, E, B>
```

Added in v0.1.18

# Monad

## chain

**Signature**

```ts
export declare const chain: <R, E, A, B>(
  f: (a: A) => StateEither<R, E, B>
) => (ma: StateEither<R, E, A>) => StateEither<R, E, B>
```

Added in v0.1.18

## chainFirst

**Signature**

```ts
export declare const chainFirst: <R, E, A, B>(
  f: (a: A) => StateEither<R, E, B>
) => (ma: StateEither<R, E, A>) => StateEither<R, E, A>
```

Added in v0.1.18

## flatten

**Signature**

```ts
export declare const flatten: <R, E, A>(mma: StateEither<R, E, StateEither<R, E, A>>) => StateEither<R, E, A>
```

Added in v0.1.18

# combinators

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: StateEither<R, E, A>
  ) => StateEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: StateEither<R, E, A>) => StateEither<R, E, A>
}
```

Added in v0.1.18

# constructors

## fromEither

**Signature**

```ts
export declare const fromEither: <S, E, A>(ma: E.Either<E, A>) => StateEither<S, E, A>
```

Added in v0.1.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends unknown[], B>(
  f: (...a: A) => E.Either<E, B>
) => <S>(...a: A) => StateEither<S, E, B>
```

Added in v0.1.12

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: () => E) => <R, A>(ma: Option<A>) => StateEither<R, E, A>
```

Added in v0.1.18

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(a: A) => StateEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => StateEither<R, E, A>
}
```

Added in v0.1.18

## get

**Signature**

```ts
export declare const get: <S, E = never>() => StateEither<S, E, S>
```

Added in v0.1.12

## gets

**Signature**

```ts
export declare const gets: <S, E = never, A = never>(f: (s: S) => A) => StateEither<S, E, A>
```

Added in v0.1.12

## left

**Signature**

```ts
export declare const left: <S, E, A = never>(e: E) => StateEither<S, E, A>
```

Added in v0.1.12

## leftState

**Signature**

```ts
export declare const leftState: <S, E = never, A = never>(me: State<S, E>) => StateEither<S, E, A>
```

Added in v0.1.12

## modify

**Signature**

```ts
export declare const modify: <S, E = never>(f: (s: S) => S) => StateEither<S, E, void>
```

Added in v0.1.12

## put

**Signature**

```ts
export declare const put: <S, E = never>(s: S) => StateEither<S, E, void>
```

Added in v0.1.12

## right

**Signature**

```ts
export declare const right: <S, E = never, A = never>(a: A) => StateEither<S, E, A>
```

Added in v0.1.12

## rightState

**Signature**

```ts
export declare const rightState: <S, E = never, A = never>(ma: State<S, A>) => StateEither<S, E, A>
```

Added in v0.1.12

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative3<'StateEither'>
```

Added in v0.1.18

## Apply

**Signature**

```ts
export declare const Apply: Apply3<'StateEither'>
```

Added in v0.1.18

## Functor

**Signature**

```ts
export declare const Functor: Functor3<'StateEither'>
```

Added in v0.1.18

## Monad

**Signature**

```ts
export declare const Monad: Monad3<'StateEither'>
```

Added in v0.1.18

## MonadThrow

**Signature**

```ts
export declare const MonadThrow: MonadThrow3<'StateEither'>
```

Added in v0.1.18

## URI

**Signature**

```ts
export declare const URI: 'StateEither'
```

Added in v0.1.12

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.12

## stateEither

**Signature**

```ts
export declare const stateEither: Monad3<'StateEither'> & MonadThrow3<'StateEither'>
```

Added in v0.1.12

# model

## StateEither (interface)

**Signature**

```ts
export interface StateEither<S, E, A> {
  (s: S): E.Either<E, [A, S]>
}
```

Added in v0.1.12

# utils

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => <S>(ma: StateEither<S, E, A>) => StateEither<S, E, B>
```

Added in v0.1.12

## evalState

**Signature**

```ts
export declare const evalState: <S, E, A>(ma: StateEither<S, E, A>, s: S) => E.Either<E, A>
```

Added in v0.1.12

## execState

**Signature**

```ts
export declare const execState: <S, E, A>(ma: StateEither<S, E, A>, s: S) => E.Either<E, S>
```

Added in v0.1.12
