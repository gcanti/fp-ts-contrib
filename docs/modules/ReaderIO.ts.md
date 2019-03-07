---
title: ReaderIO.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [ReaderIO (class)](#readerio-class)
  - [map (method)](#map-method)
  - [of (method)](#of-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [chain (method)](#chain-method)
- [URI (constant)](#uri-constant)
- [readerIO (constant)](#readerio-constant)
- [ask (function)](#ask-function)
- [asks (function)](#asks-function)
- [fromIO (function)](#fromio-function)
- [fromReader (function)](#fromreader-function)
- [local (function)](#local-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# ReaderIO (class)

**Signature**

```ts
export class ReaderIO<E, A> {
  constructor(readonly run: (e: E) => IO<A>) { ... }
  ...
}
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): ReaderIO<E, B> { ... }
```

## of (method)

**Signature**

```ts
of<E, B>(b: B): ReaderIO<E, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: ReaderIO<E, (a: A) => B>): ReaderIO<E, B> { ... }
```

## ap\_ (method)

**Signature**

```ts
ap_<B, C>(this: ReaderIO<E, (b: B) => C>, fb: ReaderIO<E, B>): ReaderIO<E, C> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => ReaderIO<E, B>): ReaderIO<E, B> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# readerIO (constant)

**Signature**

```ts
export const readerIO: Monad2<URI> = ...
```

# ask (function)

**Signature**

```ts
export const ask = <E>(): ReaderIO<E, E> => ...
```

# asks (function)

**Signature**

```ts
export const asks = <E, A>(f: (e: E) => A): ReaderIO<E, A> => ...
```

# fromIO (function)

**Signature**

```ts
export const fromIO = <E, A>(fa: IO<A>): ReaderIO<E, A> => ...
```

# fromReader (function)

**Signature**

```ts
export const fromReader = <E, A>(fa: Reader<E, A>): ReaderIO<E, A> => ...
```

# local (function)

**Signature**

```ts
export const local = <E>(f: (e: E) => E) => <A>(fa: ReaderIO<E, A>): ReaderIO<E, A> => ...
```
