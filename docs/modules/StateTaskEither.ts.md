---
title: StateTaskEither.ts
nav_order: 17
parent: Modules
---

# StateTaskEither overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [StateTaskEither (interface)](#statetaskeither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [chain](#chain)
- [chainEitherK](#chaineitherk)
- [chainFirst](#chainfirst)
- [chainIOEitherK](#chainioeitherk)
- [chainTaskEitherK](#chaintaskeitherk)
- [evalState](#evalstate)
- [execState](#execstate)
- [filterOrElse](#filterorelse)
- [flatten](#flatten)
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
- [map](#map)
- [modify](#modify)
- [put](#put)
- [right](#right)
- [rightIO](#rightio)
- [rightState](#rightstate)
- [rightTask](#righttask)
- [run](#run)
- [stateTaskEither](#statetaskeither)
- [stateTaskEitherSeq](#statetaskeitherseq)

---

# StateTaskEither (interface)

**Signature**

```ts
export interface StateTaskEither<S, E, A> {
  (s: S): TaskEither<E, [A, S]>
}
```

Added in v0.1.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.0

# URI

**Signature**

```ts
export const URI: "StateTaskEither" = ...
```

Added in v0.1.0

# ap

**Signature**

```ts
<R, E, A>(fa: StateTaskEither<R, E, A>) => <B>(fab: StateTaskEither<R, E, (a: A) => B>) => StateTaskEither<R, E, B>
```

Added in v0.1.0

# apFirst

**Signature**

```ts
<R, E, B>(fb: StateTaskEither<R, E, B>) => <A>(fa: StateTaskEither<R, E, A>) => StateTaskEither<R, E, A>
```

Added in v0.1.0

# apSecond

**Signature**

```ts
<R, E, B>(fb: StateTaskEither<R, E, B>) => <A>(fa: StateTaskEither<R, E, A>) => StateTaskEither<R, E, B>
```

Added in v0.1.0

# chain

**Signature**

```ts
<R, E, A, B>(f: (a: A) => StateTaskEither<R, E, B>) => (ma: StateTaskEither<R, E, A>) => StateTaskEither<R, E, B>
```

Added in v0.1.0

# chainEitherK

**Signature**

```ts
export function chainEitherK<E, A, B>(
  f: (a: A) => Either<E, B>
): <S>(ma: StateTaskEither<S, E, A>) => StateTaskEither<S, E, B> { ... }
```

Added in v0.1.10

# chainFirst

**Signature**

```ts
<R, E, A, B>(f: (a: A) => StateTaskEither<R, E, B>) => (ma: StateTaskEither<R, E, A>) => StateTaskEither<R, E, A>
```

Added in v0.1.0

# chainIOEitherK

**Signature**

```ts
export function chainIOEitherK<E, A, B>(
  f: (a: A) => IOEither<E, B>
): <S>(ma: StateTaskEither<S, E, A>) => StateTaskEither<S, E, B> { ... }
```

Added in v0.1.10

# chainTaskEitherK

**Signature**

```ts
export function chainTaskEitherK<E, A, B>(
  f: (a: A) => TaskEither<E, B>
): <S>(ma: StateTaskEither<S, E, A>) => StateTaskEither<S, E, B> { ... }
```

Added in v0.1.10

# evalState

**Signature**

```ts
export const evalState: <S, E, A>(ma: StateTaskEither<S, E, A>, s: S) => TaskEither<E, A> = ...
```

Added in v0.1.0

# execState

**Signature**

```ts
export const execState: <S, E, A>(ma: StateTaskEither<S, E, A>, s: S) => TaskEither<E, S> = ...
```

Added in v0.1.0

# filterOrElse

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(ma: StateTaskEither<R, E, A>) => StateTaskEither<R, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: StateTaskEither<R, E, A>) => StateTaskEither<R, E, A>; }
```

Added in v0.1.0

# flatten

**Signature**

```ts
<R, E, A>(mma: StateTaskEither<R, E, StateTaskEither<R, E, A>>) => StateTaskEither<R, E, A>
```

Added in v0.1.0

# fromEither

**Signature**

```ts
<R, E, A>(ma: Either<E, A>) => StateTaskEither<R, E, A>
```

Added in v0.1.0

# fromEitherK

**Signature**

```ts
export function fromEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <S>(...a: A) => StateTaskEither<S, E, B> { ... }
```

Added in v0.1.10

# fromIOEither

**Signature**

```ts
export function fromIOEither<S, E, A>(ma: IOEither<E, A>): StateTaskEither<S, E, A> { ... }
```

Added in v0.1.0

# fromIOEitherK

**Signature**

```ts
export function fromIOEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): <S>(...a: A) => StateTaskEither<S, E, B> { ... }
```

Added in v0.1.10

# fromOption

**Signature**

```ts
<E>(onNone: () => E) => <R, A>(ma: Option<A>) => StateTaskEither<R, E, A>
```

Added in v0.1.0

# fromPredicate

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => StateTaskEither<U, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => StateTaskEither<R, E, A>; }
```

Added in v0.1.0

# fromTaskEither

**Signature**

```ts
export const fromTaskEither: <S, E, A>(ma: TaskEither<E, A>) => StateTaskEither<S, E, A> = ...
```

Added in v0.1.0

# fromTaskEitherK

**Signature**

```ts
export function fromTaskEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): <S>(...a: A) => StateTaskEither<S, E, B> { ... }
```

Added in v0.1.10

# get

**Signature**

```ts
export const get: <S>() => StateTaskEither<S, never, S> = ...
```

Added in v0.1.0

# gets

**Signature**

```ts
export const gets: <S, A>(f: (s: S) => A) => StateTaskEither<S, never, A> = ...
```

Added in v0.1.0

# left

**Signature**

```ts
export function left<S, E>(e: E): StateTaskEither<S, E, never> { ... }
```

Added in v0.1.0

# leftIO

**Signature**

```ts
export function leftIO<S, E>(me: IO<E>): StateTaskEither<S, E, never> { ... }
```

Added in v0.1.0

# leftState

**Signature**

```ts
export function leftState<S, E>(me: State<S, E>): StateTaskEither<S, E, never> { ... }
```

Added in v0.1.0

# leftTask

**Signature**

```ts
export function leftTask<S, E>(me: Task<E>): StateTaskEither<S, E, never> { ... }
```

Added in v0.1.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <R, E>(fa: StateTaskEither<R, E, A>) => StateTaskEither<R, E, B>
```

Added in v0.1.0

# modify

**Signature**

```ts
export const modify: <S>(f: (s: S) => S) => StateTaskEither<S, never, void> = ...
```

Added in v0.1.0

# put

**Signature**

```ts
export const put: <S>(s: S) => StateTaskEither<S, never, void> = ...
```

Added in v0.1.0

# right

**Signature**

```ts
export const right: <S, A>(a: A) => StateTaskEither<S, never, A> = ...
```

Added in v0.1.0

# rightIO

**Signature**

```ts
export function rightIO<S, A>(ma: IO<A>): StateTaskEither<S, never, A> { ... }
```

Added in v0.1.0

# rightState

**Signature**

```ts
export const rightState: <S, A>(ma: State<S, A>) => StateTaskEither<S, never, A> = ...
```

Added in v0.1.0

# rightTask

**Signature**

```ts
export function rightTask<S, A>(ma: Task<A>): StateTaskEither<S, never, A> { ... }
```

Added in v0.1.0

# run

**Signature**

```ts
export function run<S, E, A>(ma: StateTaskEither<S, E, A>, s: S): Promise<Either<E, [A, S]>> { ... }
```

Added in v0.1.0

# stateTaskEither

**Signature**

```ts
export const stateTaskEither: Monad3<URI> & MonadThrow3<URI> = ...
```

Added in v0.1.0

# stateTaskEitherSeq

Like `stateTaskEither` but `ap` is sequential

**Signature**

```ts
export const stateTaskEitherSeq: typeof stateTaskEither = ...
```

Added in v0.1.0
