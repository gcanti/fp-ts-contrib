---
title: StateTaskEither.ts
nav_order: 16
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [StateTaskEither (interface)](#statetaskeither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [evalState (constant)](#evalstate-constant)
- [execState (constant)](#execstate-constant)
- [fromTaskEither (constant)](#fromtaskeither-constant)
- [get (constant)](#get-constant)
- [gets (constant)](#gets-constant)
- [modify (constant)](#modify-constant)
- [put (constant)](#put-constant)
- [right (constant)](#right-constant)
- [rightState (constant)](#rightstate-constant)
- [stateTaskEither (constant)](#statetaskeither-constant)
- [stateTaskEitherSeq (constant)](#statetaskeitherseq-constant)
- [fromIOEither (function)](#fromioeither-function)
- [left (function)](#left-function)
- [leftIO (function)](#leftio-function)
- [leftState (function)](#leftstate-function)
- [leftTask (function)](#lefttask-function)
- [rightIO (function)](#rightio-function)
- [rightTask (function)](#righttask-function)
- [run (function)](#run-function)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [filterOrElse (export)](#filterorelse-export)
- [flatten (export)](#flatten-export)
- [fromEither (export)](#fromeither-export)
- [fromOption (export)](#fromoption-export)
- [fromPredicate (export)](#frompredicate-export)
- [map (export)](#map-export)

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

# URI (constant)

**Signature**

```ts
export const URI: "StateTaskEither" = ...
```

Added in v0.1.0

# evalState (constant)

**Signature**

```ts
export const evalState: <S, E, A>(ma: StateTaskEither<S, E, A>, s: S) => TaskEither<E, A> = ...
```

Added in v0.1.0

# execState (constant)

**Signature**

```ts
export const execState: <S, E, A>(ma: StateTaskEither<S, E, A>, s: S) => TaskEither<E, S> = ...
```

Added in v0.1.0

# fromTaskEither (constant)

**Signature**

```ts
export const fromTaskEither: <S, E, A>(ma: TaskEither<E, A>) => StateTaskEither<S, E, A> = ...
```

Added in v0.1.0

# get (constant)

**Signature**

```ts
export const get: <S>() => StateTaskEither<S, never, S> = ...
```

Added in v0.1.0

# gets (constant)

**Signature**

```ts
export const gets: <S, A>(f: (s: S) => A) => StateTaskEither<S, never, A> = ...
```

Added in v0.1.0

# modify (constant)

**Signature**

```ts
export const modify: <S>(f: (s: S) => S) => StateTaskEither<S, never, void> = ...
```

Added in v0.1.0

# put (constant)

**Signature**

```ts
export const put: <S>(s: S) => StateTaskEither<S, never, void> = ...
```

Added in v0.1.0

# right (constant)

**Signature**

```ts
export const right: <S, A>(a: A) => StateTaskEither<S, never, A> = ...
```

Added in v0.1.0

# rightState (constant)

**Signature**

```ts
export const rightState: <S, A>(ma: State<S, A>) => StateTaskEither<S, never, A> = ...
```

Added in v0.1.0

# stateTaskEither (constant)

**Signature**

```ts
export const stateTaskEither: Monad3<URI> & MonadThrow3<URI> = ...
```

Added in v0.1.0

# stateTaskEitherSeq (constant)

Like `stateTaskEither` but `ap` is sequential

**Signature**

```ts
export const stateTaskEitherSeq: typeof stateTaskEither = ...
```

Added in v0.1.0

# fromIOEither (function)

**Signature**

```ts
export function fromIOEither<S, E, A>(ma: IOEither<E, A>): StateTaskEither<S, E, A> { ... }
```

Added in v0.1.0

# left (function)

**Signature**

```ts
export function left<S, E>(e: E): StateTaskEither<S, E, never> { ... }
```

Added in v0.1.0

# leftIO (function)

**Signature**

```ts
export function leftIO<S, E>(me: IO<E>): StateTaskEither<S, E, never> { ... }
```

Added in v0.1.0

# leftState (function)

**Signature**

```ts
export function leftState<S, E>(me: State<S, E>): StateTaskEither<S, E, never> { ... }
```

Added in v0.1.0

# leftTask (function)

**Signature**

```ts
export function leftTask<S, E>(me: Task<E>): StateTaskEither<S, E, never> { ... }
```

Added in v0.1.0

# rightIO (function)

**Signature**

```ts
export function rightIO<S, A>(ma: IO<A>): StateTaskEither<S, never, A> { ... }
```

Added in v0.1.0

# rightTask (function)

**Signature**

```ts
export function rightTask<S, A>(ma: Task<A>): StateTaskEither<S, never, A> { ... }
```

Added in v0.1.0

# run (function)

**Signature**

```ts
export function run<S, E, A>(ma: StateTaskEither<S, E, A>, s: S): Promise<Either<E, [A, S]>> { ... }
```

Added in v0.1.0

# ap (export)

**Signature**

```ts
<R, E, A>(fa: StateTaskEither<R, E, A>) => <B>(fab: StateTaskEither<R, E, (a: A) => B>) => StateTaskEither<R, E, B>
```

Added in v0.1.0

# apFirst (export)

**Signature**

```ts
<R, E, B>(fb: StateTaskEither<R, E, B>) => <A>(fa: StateTaskEither<R, E, A>) => StateTaskEither<R, E, A>
```

Added in v0.1.0

# apSecond (export)

**Signature**

```ts
<R, E, B>(fb: StateTaskEither<R, E, B>) => <A>(fa: StateTaskEither<R, E, A>) => StateTaskEither<R, E, B>
```

Added in v0.1.0

# chain (export)

**Signature**

```ts
<R, E, A, B>(f: (a: A) => StateTaskEither<R, E, B>) => (ma: StateTaskEither<R, E, A>) => StateTaskEither<R, E, B>
```

Added in v0.1.0

# chainFirst (export)

**Signature**

```ts
<R, E, A, B>(f: (a: A) => StateTaskEither<R, E, B>) => (ma: StateTaskEither<R, E, A>) => StateTaskEither<R, E, A>
```

Added in v0.1.0

# filterOrElse (export)

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(ma: StateTaskEither<R, E, A>) => StateTaskEither<R, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: StateTaskEither<R, E, A>) => StateTaskEither<R, E, A>; }
```

Added in v0.1.0

# flatten (export)

**Signature**

```ts
<R, E, A>(mma: StateTaskEither<R, E, StateTaskEither<R, E, A>>) => StateTaskEither<R, E, A>
```

Added in v0.1.0

# fromEither (export)

**Signature**

```ts
<R, E, A>(ma: Either<E, A>) => StateTaskEither<R, E, A>
```

Added in v0.1.0

# fromOption (export)

**Signature**

```ts
<E>(onNone: () => E) => <R, A>(ma: Option<A>) => StateTaskEither<R, E, A>
```

Added in v0.1.0

# fromPredicate (export)

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => StateTaskEither<U, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => StateTaskEither<R, E, A>; }
```

Added in v0.1.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <R, E>(fa: StateTaskEither<R, E, A>) => StateTaskEither<R, E, B>
```

Added in v0.1.0
