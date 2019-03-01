---
title: ReaderEither.ts
nav_order: 5
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [URI](#uri)
- [ReaderEither](#readereither)
  - [map](#map)
  - [of](#of)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [chain](#chain)
- [URI](#uri-1)
- [readerEither](#readereither)
- [alt](#alt)
- [ask](#ask)
- [asks](#asks)
- [fromEither](#fromeither)
- [fromReader](#fromreader)
- [local](#local)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# ReaderEither

**Signature** (class)

```ts
export class ReaderEither<E, L, A> {
  constructor(readonly run: (e: E) => Either<L, A>) { ... }
  ...
}
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): ReaderEither<E, L, B> { ... }
```

## of

**Signature** (method)

```ts
of<E, B>(b: B): ReaderEither<E, L, B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: ReaderEither<E, L, (a: A) => B>): ReaderEither<E, L, B> { ... }
```

## ap\_

**Signature** (method)

```ts
ap_<B, C>(this: ReaderEither<E, L, (b: B) => C>, fb: ReaderEither<E, L, B>): ReaderEither<E, L, C> { ... }
```

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => ReaderEither<E, L, B>): ReaderEither<E, L, B> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# readerEither

**Signature** (constant)

```ts
export const readerEither: Monad3<URI> = ...
```

# alt

**Signature** (function)

```ts
export const alt = <E, L, A>(fx: ReaderEither<E, L, A>, fy: ReaderEither<E, L, A>): ReaderEither<E, L, A> => ...
```

# ask

**Signature** (function)

```ts
export const ask = <E, L>(): ReaderEither<E, L, E> => ...
```

# asks

**Signature** (function)

```ts
export const asks = <E, L, A>(f: (e: E) => A): ReaderEither<E, L, A> => ...
```

# fromEither

**Signature** (function)

```ts
export const fromEither = <E, L, A>(fa: Either<L, A>): ReaderEither<E, L, A> => ...
```

# fromReader

**Signature** (function)

```ts
export const fromReader = <E, L, A>(fa: Reader<E, A>): ReaderEither<E, L, A> => ...
```

# local

**Signature** (function)

```ts
export const local = <E>(f: (e: E) => E) => <L, A>(fa: ReaderEither<E, L, A>): ReaderEither<E, L, A> => ...
```
