---
title: StateTaskEither.ts
nav_order: 21
parent: Modules
---

## StateTaskEither overview

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
  - [chainEitherK](#chaineitherk)
  - [chainFirst](#chainfirst)
  - [chainIOEitherK](#chainioeitherk)
  - [chainTaskEitherK](#chaintaskeitherk)
  - [flatten](#flatten)
- [combinators](#combinators)
  - [filterOrElse](#filterorelse)
- [constructors](#constructors)
  - [fromEither](#fromeither)
  - [fromEitherK](#fromeitherk)
  - [fromIOEither](#fromioeither)
  - [fromIOEitherK](#fromioeitherk)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
  - [fromTaskEither](#fromtaskeither)
  - [fromTaskEitherK](#fromtaskeitherk)
  - [get](#get)
  - [gets](#gets)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftState](#leftstate)
  - [leftTask](#lefttask)
  - [modify](#modify)
  - [put](#put)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightState](#rightstate)
  - [rightTask](#righttask)
- [instances](#instances)
  - [Applicative](#applicative-1)
  - [Apply](#apply-1)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [stateTaskEither](#statetaskeither)
  - [stateTaskEitherSeq](#statetaskeitherseq)
- [model](#model)
  - [StateTaskEither (interface)](#statetaskeither-interface)
- [utils](#utils)
  - [evalState](#evalstate)
  - [execState](#execstate)
  - [run](#run)

---

# Applicative

## of

**Signature**

```ts
export declare const of: <R, E, A>(a: A) => StateTaskEither<R, E, A>
```

Added in v0.1.18

# Apply

## ap

**Signature**

```ts
export declare const ap: <R, E, A>(
  fa: StateTaskEither<R, E, A>
) => <B>(fab: StateTaskEither<R, E, (a: A) => B>) => StateTaskEither<R, E, B>
```

Added in v0.1.18

## apFirst

**Signature**

```ts
export declare const apFirst: <R, E, B>(
  fb: StateTaskEither<R, E, B>
) => <A>(fa: StateTaskEither<R, E, A>) => StateTaskEither<R, E, A>
```

Added in v0.1.18

## apSecond

**Signature**

```ts
export declare const apSecond: <R, E, B>(
  fb: StateTaskEither<R, E, B>
) => <A>(fa: StateTaskEither<R, E, A>) => StateTaskEither<R, E, B>
```

Added in v0.1.18

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(fa: StateTaskEither<R, E, A>) => StateTaskEither<R, E, B>
```

Added in v0.1.18

# Monad

## chain

**Signature**

```ts
export declare const chain: <R, E, A, B>(
  f: (a: A) => StateTaskEither<R, E, B>
) => (ma: StateTaskEither<R, E, A>) => StateTaskEither<R, E, B>
```

Added in v0.1.18

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(
  f: (a: A) => Either<E, B>
) => <S>(ma: StateTaskEither<S, E, A>) => StateTaskEither<S, E, B>
```

Added in v0.1.10

## chainFirst

**Signature**

```ts
export declare const chainFirst: <R, E, A, B>(
  f: (a: A) => StateTaskEither<R, E, B>
) => (ma: StateTaskEither<R, E, A>) => StateTaskEither<R, E, A>
```

Added in v0.1.18

## chainIOEitherK

**Signature**

```ts
export declare const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <S>(ma: StateTaskEither<S, E, A>) => StateTaskEither<S, E, B>
```

Added in v0.1.10

## chainTaskEitherK

**Signature**

```ts
export declare const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TE.TaskEither<E, B>
) => <S>(ma: StateTaskEither<S, E, A>) => StateTaskEither<S, E, B>
```

Added in v0.1.10

## flatten

**Signature**

```ts
export declare const flatten: <R, E, A>(
  mma: StateTaskEither<R, E, StateTaskEither<R, E, A>>
) => StateTaskEither<R, E, A>
```

Added in v0.1.18

# combinators

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: StateTaskEither<R, E, A>
  ) => StateTaskEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: StateTaskEither<R, E, A>) => StateTaskEither<R, E, A>
}
```

Added in v0.1.18

# constructors

## fromEither

**Signature**

```ts
export declare const fromEither: <R, E, A>(ma: Either<E, A>) => StateTaskEither<R, E, A>
```

Added in v0.1.18

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends unknown[], B>(
  f: (...a: A) => Either<E, B>
) => <S>(...a: A) => StateTaskEither<S, E, B>
```

Added in v0.1.10

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <S, E, A>(ma: IOEither<E, A>) => StateTaskEither<S, E, A>
```

Added in v0.1.0

## fromIOEitherK

**Signature**

```ts
export declare const fromIOEitherK: <E, A extends unknown[], B>(
  f: (...a: A) => IOEither<E, B>
) => <S>(...a: A) => StateTaskEither<S, E, B>
```

Added in v0.1.10

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: () => E) => <R, A>(ma: Option<A>) => StateTaskEither<R, E, A>
```

Added in v0.1.18

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(a: A) => StateTaskEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => StateTaskEither<R, E, A>
}
```

Added in v0.1.18

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <S, E, A>(ma: TE.TaskEither<E, A>) => StateTaskEither<S, E, A>
```

Added in v0.1.0

## fromTaskEitherK

**Signature**

```ts
export declare const fromTaskEitherK: <E, A extends unknown[], B>(
  f: (...a: A) => TE.TaskEither<E, B>
) => <S>(...a: A) => StateTaskEither<S, E, B>
```

Added in v0.1.10

## get

**Signature**

```ts
export declare const get: <S>() => StateTaskEither<S, never, S>
```

Added in v0.1.0

## gets

**Signature**

```ts
export declare const gets: <S, A>(f: (s: S) => A) => StateTaskEither<S, never, A>
```

Added in v0.1.0

## left

**Signature**

```ts
export declare const left: <S, E>(e: E) => StateTaskEither<S, E, never>
```

Added in v0.1.0

## leftIO

**Signature**

```ts
export declare const leftIO: <S, E>(me: IO<E>) => StateTaskEither<S, E, never>
```

Added in v0.1.0

## leftState

**Signature**

```ts
export declare const leftState: <S, E>(me: State<S, E>) => StateTaskEither<S, E, never>
```

Added in v0.1.0

## leftTask

**Signature**

```ts
export declare const leftTask: <S, E>(me: Task<E>) => StateTaskEither<S, E, never>
```

Added in v0.1.0

## modify

**Signature**

```ts
export declare const modify: <S>(f: (s: S) => S) => StateTaskEither<S, never, void>
```

Added in v0.1.0

## put

**Signature**

```ts
export declare const put: <S>(s: S) => StateTaskEither<S, never, void>
```

Added in v0.1.0

## right

**Signature**

```ts
export declare const right: <S, A>(a: A) => StateTaskEither<S, never, A>
```

Added in v0.1.0

## rightIO

**Signature**

```ts
export declare const rightIO: <S, A>(ma: IO<A>) => StateTaskEither<S, never, A>
```

Added in v0.1.0

## rightState

**Signature**

```ts
export declare const rightState: <S, A>(ma: State<S, A>) => StateTaskEither<S, never, A>
```

Added in v0.1.0

## rightTask

**Signature**

```ts
export declare const rightTask: <S, A>(ma: Task<A>) => StateTaskEither<S, never, A>
```

Added in v0.1.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative3<'StateTaskEither'>
```

Added in v0.1.18

## Apply

**Signature**

```ts
export declare const Apply: Apply3<'StateTaskEither'>
```

Added in v0.1.18

## Functor

**Signature**

```ts
export declare const Functor: Functor3<'StateTaskEither'>
```

Added in v0.1.18

## Monad

**Signature**

```ts
export declare const Monad: Monad3<'StateTaskEither'>
```

Added in v0.1.18

## URI

**Signature**

```ts
export declare const URI: 'StateTaskEither'
```

Added in v0.1.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.0

## stateTaskEither

**Signature**

```ts
export declare const stateTaskEither: Monad3<'StateTaskEither'> & MonadThrow3<'StateTaskEither'>
```

Added in v0.1.0

## stateTaskEitherSeq

Like `stateTaskEither` but `ap` is sequential

**Signature**

```ts
export declare const stateTaskEitherSeq: Monad3<'StateTaskEither'> & MonadThrow3<'StateTaskEither'>
```

Added in v0.1.0

# model

## StateTaskEither (interface)

**Signature**

```ts
export interface StateTaskEither<S, E, A> {
  (s: S): TaskEither<E, [A, S]>
}
```

Added in v0.1.0

# utils

## evalState

**Signature**

```ts
export declare const evalState: <S, E, A>(ma: StateTaskEither<S, E, A>, s: S) => TE.TaskEither<E, A>
```

Added in v0.1.0

## execState

**Signature**

```ts
export declare const execState: <S, E, A>(ma: StateTaskEither<S, E, A>, s: S) => TE.TaskEither<E, S>
```

Added in v0.1.0

## run

**Signature**

```ts
export declare const run: <S, E, A>(ma: StateTaskEither<S, E, A>, s: S) => Promise<Either<E, [A, S]>>
```

Added in v0.1.0
