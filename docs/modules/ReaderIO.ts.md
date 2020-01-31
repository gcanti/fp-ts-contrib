---
title: ReaderIO.ts
nav_order: 12
parent: Modules
---

# ReaderIO overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [ReaderIO (interface)](#readerio-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [ask](#ask)
- [asks](#asks)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [chainIOK](#chainiok)
- [flatten](#flatten)
- [fromIO](#fromio)
- [fromIOK](#fromiok)
- [fromReader](#fromreader)
- [local](#local)
- [map](#map)
- [readerIO](#readerio)
- [run](#run)

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

# URI

**Signature**

```ts
export const URI: "ReaderIO" = ...
```

Added in v0.1.0

# ap

**Signature**

```ts
<E, A>(fa: ReaderIO<E, A>) => <B>(fab: ReaderIO<E, (a: A) => B>) => ReaderIO<E, B>
```

Added in v0.1.0

# apFirst

**Signature**

```ts
<E, B>(fb: ReaderIO<E, B>) => <A>(fa: ReaderIO<E, A>) => ReaderIO<E, A>
```

Added in v0.1.0

# apSecond

**Signature**

```ts
<E, B>(fb: ReaderIO<E, B>) => <A>(fa: ReaderIO<E, A>) => ReaderIO<E, B>
```

Added in v0.1.0

# ask

**Signature**

```ts
export const ask: <R>() => ReaderIO<R, R> = ...
```

Added in v0.1.0

# asks

**Signature**

```ts
export const asks: <R, A>(f: (r: R) => A) => ReaderIO<R, A> = ...
```

Added in v0.1.0

# chain

**Signature**

```ts
<E, A, B>(f: (a: A) => ReaderIO<E, B>) => (ma: ReaderIO<E, A>) => ReaderIO<E, B>
```

Added in v0.1.0

# chainFirst

**Signature**

```ts
<E, A, B>(f: (a: A) => ReaderIO<E, B>) => (ma: ReaderIO<E, A>) => ReaderIO<E, A>
```

Added in v0.1.0

# chainIOK

**Signature**

```ts
export function chainIOK<A, B>(f: (a: A) => IO<B>): <R>(ma: ReaderIO<R, A>) => ReaderIO<R, B> { ... }
```

Added in v0.1.10

# flatten

**Signature**

```ts
<E, A>(mma: ReaderIO<E, ReaderIO<E, A>>) => ReaderIO<E, A>
```

Added in v0.1.0

# fromIO

**Signature**

```ts
export const fromIO: <R, A>(ma: IO<A>) => ReaderIO<R, A> = ...
```

Added in v0.1.0

# fromIOK

**Signature**

```ts
export function fromIOK<A extends Array<unknown>, B>(f: (...a: A) => IO<B>): <R>(...a: A) => ReaderIO<R, B> { ... }
```

Added in v0.1.10

# fromReader

**Signature**

```ts
export const fromReader: <R, A>(ma: Reader<R, A>) => ReaderIO<R, A> = ...
```

Added in v0.1.0

# local

**Signature**

```ts
export function local<Q, R>(f: (f: Q) => R): <A>(ma: ReaderIO<R, A>) => ReaderIO<Q, A> { ... }
```

Added in v0.1.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: ReaderIO<E, A>) => ReaderIO<E, B>
```

Added in v0.1.0

# readerIO

**Signature**

```ts
export const readerIO: Monad2<URI> = ...
```

Added in v0.1.0

# run

**Signature**

```ts
export function run<R, A>(ma: ReaderIO<R, A>, r: R): A { ... }
```

Added in v0.1.0
