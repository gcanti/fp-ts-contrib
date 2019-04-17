---
title: ReaderEither.ts
nav_order: 7
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [ReaderEither (class)](#readereither-class)
  - [map (method)](#map-method)
  - [of (method)](#of-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [chain (method)](#chain-method)
- [URI (constant)](#uri-constant)
- [readerEither (constant)](#readereither-constant)
- [alt (function)](#alt-function)
- [ask (function)](#ask-function)
- [asks (function)](#asks-function)
- [fromEither (function)](#fromeither-function)
- [fromReader (function)](#fromreader-function)
- [local (function)](#local-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# ReaderEither (class)

**Signature**

```ts
export class ReaderEither<E, L, A> {
  constructor(readonly run: (e: E) => Either<L, A>) { ... }
  ...
}
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): ReaderEither<E, L, B> { ... }
```

## of (method)

**Signature**

```ts
of<E, B>(b: B): ReaderEither<E, L, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: ReaderEither<E, L, (a: A) => B>): ReaderEither<E, L, B> { ... }
```

## ap\_ (method)

**Signature**

```ts
ap_<B, C>(this: ReaderEither<E, L, (b: B) => C>, fb: ReaderEither<E, L, B>): ReaderEither<E, L, C> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => ReaderEither<E, L, B>): ReaderEither<E, L, B> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# readerEither (constant)

**Signature**

```ts
export const readerEither: Monad3<URI> = ...
```

# alt (function)

**Signature**

```ts
export const alt = <E, L, A>(fx: ReaderEither<E, L, A>, fy: ReaderEither<E, L, A>): ReaderEither<E, L, A> => ...
```

# ask (function)

**Signature**

```ts
export const ask = <E, L>(): ReaderEither<E, L, E> => ...
```

# asks (function)

**Signature**

```ts
export const asks = <E, L, A>(f: (e: E) => A): ReaderEither<E, L, A> => ...
```

# fromEither (function)

**Signature**

```ts
export const fromEither = <E, L, A>(fa: Either<L, A>): ReaderEither<E, L, A> => ...
```

# fromReader (function)

**Signature**

```ts
export const fromReader = <E, L, A>(fa: Reader<E, A>): ReaderEither<E, L, A> => ...
```

# local (function)

**Signature**

```ts
export const local = <E>(f: (e: E) => E) => <L, A>(fa: ReaderEither<E, L, A>): ReaderEither<E, L, A> => ...
```
