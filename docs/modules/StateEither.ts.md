---
title: StateEither.ts
nav_order: 16
parent: Modules
---

# StateEither overview

Added in v2.4.4

---

<h2 class="text-delta">Table of contents</h2>

- [StateEither (interface)](#stateeither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [chain](#chain)
- [chainEitherK](#chaineitherk)
- [chainFirst](#chainfirst)
- [evalState](#evalstate)
- [execState](#execstate)
- [filterOrElse](#filterorelse)
- [flatten](#flatten)
- [fromEither](#fromeither)
- [fromEitherK](#fromeitherk)
- [fromOption](#fromoption)
- [fromPredicate](#frompredicate)
- [get](#get)
- [gets](#gets)
- [left](#left)
- [leftState](#leftstate)
- [map](#map)
- [modify](#modify)
- [put](#put)
- [right](#right)
- [rightState](#rightstate)
- [stateEither](#stateeither)

---

# StateEither (interface)

**Signature**

```ts
export interface StateEither<S, E, A> {
  (s: S): E.Either<E, [A, S]>
}
```

Added in v0.1.12

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.12

# URI

**Signature**

```ts
export const URI: "StateEither" = ...
```

Added in v0.1.12

# ap

**Signature**

```ts
<R, E, A>(fa: StateEither<R, E, A>) => <B>(fab: StateEither<R, E, (a: A) => B>) => StateEither<R, E, B>
```

Added in v0.1.12

# apFirst

**Signature**

```ts
<R, E, B>(fb: StateEither<R, E, B>) => <A>(fa: StateEither<R, E, A>) => StateEither<R, E, A>
```

Added in v0.1.12

# apSecond

**Signature**

```ts
<R, E, B>(fb: StateEither<R, E, B>) => <A>(fa: StateEither<R, E, A>) => StateEither<R, E, B>
```

Added in v0.1.12

# chain

**Signature**

```ts
<R, E, A, B>(f: (a: A) => StateEither<R, E, B>) => (ma: StateEither<R, E, A>) => StateEither<R, E, B>
```

Added in v0.1.12

# chainEitherK

**Signature**

```ts
export function chainEitherK<E, A, B>(
  f: (a: A) => E.Either<E, B>
): <S>(ma: StateEither<S, E, A>) => StateEither<S, E, B> { ... }
```

Added in v0.1.12

# chainFirst

**Signature**

```ts
<R, E, A, B>(f: (a: A) => StateEither<R, E, B>) => (ma: StateEither<R, E, A>) => StateEither<R, E, A>
```

Added in v0.1.12

# evalState

**Signature**

```ts
export const evalState: <S, E, A>(ma: StateEither<S, E, A>, s: S) => E.Either<E, A> = ...
```

Added in v0.1.12

# execState

**Signature**

```ts
export const execState: <S, E, A>(ma: StateEither<S, E, A>, s: S) => E.Either<E, S> = ...
```

Added in v0.1.12

# filterOrElse

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(ma: StateEither<R, E, A>) => StateEither<R, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: StateEither<R, E, A>) => StateEither<R, E, A>; }
```

Added in v0.1.12

# flatten

**Signature**

```ts
<R, E, A>(mma: StateEither<R, E, StateEither<R, E, A>>) => StateEither<R, E, A>
```

Added in v0.1.12

# fromEither

**Signature**

```ts
export const fromEither: <S, E, A>(ma: E.Either<E, A>) => StateEither<S, E, A> = ...
```

Added in v0.1.0

# fromEitherK

**Signature**

```ts
export function fromEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => E.Either<E, B>
): <S>(...a: A) => StateEither<S, E, B> { ... }
```

Added in v0.1.12

# fromOption

**Signature**

```ts
<E>(onNone: () => E) => <R, A>(ma: Option<A>) => StateEither<R, E, A>
```

Added in v0.1.12

# fromPredicate

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => StateEither<U, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => StateEither<R, E, A>; }
```

Added in v0.1.12

# get

**Signature**

```ts
export const get: <S>() => StateEither<S, never, S> = ...
```

Added in v0.1.12

# gets

**Signature**

```ts
export const gets: <S, E = never, A = never>(f: (s: S) => A) => StateEither<S, E, A> = ...
```

Added in v0.1.12

# left

**Signature**

```ts
export function left<S, E = never, A = never>(e: E): StateEither<S, E, A> { ... }
```

Added in v0.1.12

# leftState

**Signature**

```ts
export function leftState<S, E>(me: State<S, E>): StateEither<S, E, never> { ... }
```

Added in v0.1.12

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <R, E>(fa: StateEither<R, E, A>) => StateEither<R, E, B>
```

Added in v0.1.12

# modify

**Signature**

```ts
export const modify: <S>(f: (s: S) => S) => StateEither<S, never, void> = ...
```

Added in v0.1.12

# put

**Signature**

```ts
export const put: <S>(s: S) => StateEither<S, never, void> = ...
```

Added in v0.1.12

# right

**Signature**

```ts
export const right: <S, A>(a: A) => StateEither<S, never, A> = ...
```

Added in v0.1.12

# rightState

**Signature**

```ts
export const rightState: <S, A>(ma: State<S, A>) => StateEither<S, never, A> = ...
```

Added in v0.1.12

# stateEither

**Signature**

```ts
export const stateEither: Monad3<URI> & MonadThrow3<URI> = ...
```

Added in v0.1.12
