---
title: ReaderIO.ts
nav_order: 11
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ReaderIO (interface)](#readerio-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [ask (constant)](#ask-constant)
- [asks (constant)](#asks-constant)
- [fromIO (constant)](#fromio-constant)
- [fromReader (constant)](#fromreader-constant)
- [readerIO (constant)](#readerio-constant)
- [local (function)](#local-function)
- [run (function)](#run-function)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [flatten (export)](#flatten-export)
- [map (export)](#map-export)

---

# ReaderIO (interface)

**Signature**

```ts
export interface ReaderIO<R, A> {
  (r: R): IO<A>
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
export const URI: "ReaderIO" = ...
```

Added in v0.1.0

# ask (constant)

**Signature**

```ts
export const ask: <R>() => ReaderIO<R, R> = ...
```

Added in v0.1.0

# asks (constant)

**Signature**

```ts
export const asks: <R, A>(f: (r: R) => A) => ReaderIO<R, A> = ...
```

Added in v0.1.0

# fromIO (constant)

**Signature**

```ts
export const fromIO: <R, A>(ma: IO<A>) => ReaderIO<R, A> = ...
```

Added in v0.1.0

# fromReader (constant)

**Signature**

```ts
export const fromReader: <R, A>(ma: Reader<R, A>) => ReaderIO<R, A> = ...
```

Added in v0.1.0

# readerIO (constant)

**Signature**

```ts
export const readerIO: Monad2<URI> = ...
```

Added in v0.1.0

# local (function)

**Signature**

```ts
export function local<Q, R>(f: (f: Q) => R): <A>(ma: ReaderIO<R, A>) => ReaderIO<Q, A> { ... }
```

Added in v0.1.0

# run (function)

**Signature**

```ts
export function run<R, A>(ma: ReaderIO<R, A>, r: R): A { ... }
```

Added in v0.1.0

# ap (export)

**Signature**

```ts
<E, A>(fa: ReaderIO<E, A>) => <B>(fab: ReaderIO<E, (a: A) => B>) => ReaderIO<E, B>
```

Added in v0.1.0

# apFirst (export)

**Signature**

```ts
<E, B>(fb: ReaderIO<E, B>) => <A>(fa: ReaderIO<E, A>) => ReaderIO<E, A>
```

Added in v0.1.0

# apSecond (export)

**Signature**

```ts
<E, B>(fb: ReaderIO<E, B>) => <A>(fa: ReaderIO<E, A>) => ReaderIO<E, B>
```

Added in v0.1.0

# chain (export)

**Signature**

```ts
<E, A, B>(f: (a: A) => ReaderIO<E, B>) => (ma: ReaderIO<E, A>) => ReaderIO<E, B>
```

Added in v0.1.0

# chainFirst (export)

**Signature**

```ts
<E, A, B>(f: (a: A) => ReaderIO<E, B>) => (ma: ReaderIO<E, A>) => ReaderIO<E, A>
```

Added in v0.1.0

# flatten (export)

**Signature**

```ts
<E, A>(mma: ReaderIO<E, ReaderIO<E, A>>) => ReaderIO<E, A>
```

Added in v0.1.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: ReaderIO<E, A>) => ReaderIO<E, B>
```

Added in v0.1.0
