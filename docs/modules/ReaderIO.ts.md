---
title: ReaderIO.ts
nav_order: 10
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
export const URI = ...
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
