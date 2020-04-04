---
title: StateIO.ts
nav_order: 19
parent: Modules
---

# StateIO overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [StateIO (interface)](#stateio-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [chainIOK](#chainiok)
- [evalState](#evalstate)
- [execState](#execstate)
- [flatten](#flatten)
- [fromIO](#fromio)
- [fromIOK](#fromiok)
- [fromState](#fromstate)
- [get](#get)
- [gets](#gets)
- [map](#map)
- [modify](#modify)
- [put](#put)
- [run](#run)
- [stateIO](#stateio)

---

# StateIO (interface)

**Signature**

```ts
export interface StateIO<S, A> {
  (s: S): IO<[A, S]>
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
export const URI: "StateIO" = ...
```

Added in v0.1.0

# ap

**Signature**

```ts
<E, A>(fa: StateIO<E, A>) => <B>(fab: StateIO<E, (a: A) => B>) => StateIO<E, B>
```

Added in v0.1.0

# apFirst

**Signature**

```ts
<E, B>(fb: StateIO<E, B>) => <A>(fa: StateIO<E, A>) => StateIO<E, A>
```

Added in v0.1.0

# apSecond

**Signature**

```ts
<E, B>(fb: StateIO<E, B>) => <A>(fa: StateIO<E, A>) => StateIO<E, B>
```

Added in v0.1.0

# chain

**Signature**

```ts
<E, A, B>(f: (a: A) => StateIO<E, B>) => (ma: StateIO<E, A>) => StateIO<E, B>
```

Added in v0.1.0

# chainFirst

**Signature**

```ts
<E, A, B>(f: (a: A) => StateIO<E, B>) => (ma: StateIO<E, A>) => StateIO<E, A>
```

Added in v0.1.0

# chainIOK

**Signature**

```ts
export function chainIOK<A, B>(f: (a: A) => IO<B>): <R>(ma: StateIO<R, A>) => StateIO<R, B> { ... }
```

Added in v0.1.10

# evalState

**Signature**

```ts
export const evalState: <S, A>(ma: StateIO<S, A>, s: S) => IO<A> = ...
```

Added in v0.1.0

# execState

**Signature**

```ts
export const execState: <S, A>(ma: StateIO<S, A>, s: S) => IO<S> = ...
```

Added in v0.1.0

# flatten

**Signature**

```ts
<E, A>(mma: StateIO<E, StateIO<E, A>>) => StateIO<E, A>
```

Added in v0.1.0

# fromIO

**Signature**

```ts
export const fromIO: <S, A>(ma: IO<A>) => StateIO<S, A> = ...
```

Added in v0.1.0

# fromIOK

**Signature**

```ts
export function fromIOK<A extends Array<unknown>, B>(f: (...a: A) => IO<B>): <R>(...a: A) => StateIO<R, B> { ... }
```

Added in v0.1.10

# fromState

**Signature**

```ts
export const fromState: <S, A>(ma: State<S, A>) => StateIO<S, A> = ...
```

Added in v0.1.0

# get

**Signature**

```ts
export const get: <S>() => StateIO<S, S> = ...
```

Added in v0.1.0

# gets

**Signature**

```ts
export const gets: <S, A>(f: (s: S) => A) => StateIO<S, A> = ...
```

Added in v0.1.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: StateIO<E, A>) => StateIO<E, B>
```

Added in v0.1.0

# modify

**Signature**

```ts
export const modify: <S>(f: (s: S) => S) => StateIO<S, void> = ...
```

Added in v0.1.0

# put

**Signature**

```ts
export const put: <S>(s: S) => StateIO<S, void> = ...
```

Added in v0.1.0

# run

**Signature**

```ts
export function run<S, A>(ma: StateIO<S, A>, s: S): A { ... }
```

Added in v0.1.0

# stateIO

**Signature**

```ts
export const stateIO: Monad2<URI> = ...
```

Added in v0.1.0
