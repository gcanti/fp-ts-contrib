---
title: ReaderIO.ts
nav_order: 6
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [URI](#uri)
- [ReaderIO](#readerio)
  - [map](#map)
  - [of](#of)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [chain](#chain)
- [URI](#uri-1)
- [readerIO](#readerio)
- [ask](#ask)
- [asks](#asks)
- [fromIO](#fromio)
- [fromReader](#fromreader)
- [local](#local)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# ReaderIO

**Signature** (class)

```ts
export class ReaderIO<E, A> {
  constructor(readonly run: (e: E) => IO<A>) { ... }
  ...
}
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): ReaderIO<E, B> { ... }
```

## of

**Signature** (method)

```ts
of<E, B>(b: B): ReaderIO<E, B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: ReaderIO<E, (a: A) => B>): ReaderIO<E, B> { ... }
```

## ap\_

**Signature** (method)

```ts
ap_<B, C>(this: ReaderIO<E, (b: B) => C>, fb: ReaderIO<E, B>): ReaderIO<E, C> { ... }
```

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => ReaderIO<E, B>): ReaderIO<E, B> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# readerIO

**Signature** (constant)

```ts
export const readerIO: Monad2<URI> = ...
```

# ask

**Signature** (function)

```ts
export const ask = <E>(): ReaderIO<E, E> => ...
```

# asks

**Signature** (function)

```ts
export const asks = <E, A>(f: (e: E) => A): ReaderIO<E, A> => ...
```

# fromIO

**Signature** (function)

```ts
export const fromIO = <E, A>(fa: IO<A>): ReaderIO<E, A> => ...
```

# fromReader

**Signature** (function)

```ts
export const fromReader = <E, A>(fa: Reader<E, A>): ReaderIO<E, A> => ...
```

# local

**Signature** (function)

```ts
export const local = <E>(f: (e: E) => E) => <A>(fa: ReaderIO<E, A>): ReaderIO<E, A> => ...
```
