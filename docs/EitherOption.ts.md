---
title: EitherOption.ts
nav_order: 3
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [URI](#uri)
- [EitherOption](#eitheroption)
  - [map](#map)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [chain](#chain)
  - [fold](#fold)
  - [getOrElse](#getorelse)
- [URI](#uri-1)
- [eitherOption](#eitheroption)
- [none](#none)
- [some](#some)
- [fromEither](#fromeither)
- [fromOption](#fromoption)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# EitherOption

**Signature** (class)

```ts
export class EitherOption<L, A> {
  constructor(readonly value: Either<L, Option<A>>) { ... }
  ...
}
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): EitherOption<L, B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: EitherOption<L, (a: A) => B>): EitherOption<L, B> { ... }
```

## ap\_

**Signature** (method)

```ts
ap_<B, C>(this: EitherOption<L, (b: B) => C>, fb: EitherOption<L, B>): EitherOption<L, C> { ... }
```

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => EitherOption<L, B>): EitherOption<L, B> { ... }
```

## fold

**Signature** (method)

```ts
fold<R>(onNone: R, onSome: (a: A) => R): Either<L, R> { ... }
```

## getOrElse

**Signature** (method)

```ts
getOrElse(a: A): Either<L, A> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# eitherOption

**Signature** (constant)

```ts
export const eitherOption: Monad2<URI> = ...
```

# none

**Signature** (constant)

```ts
export const none = ...
```

# some

**Signature** (constant)

```ts
export const some = ...
```

# fromEither

**Signature** (function)

```ts
export const fromEither = <L, A>(ma: Either<L, A>): EitherOption<L, A> => ...
```

# fromOption

**Signature** (function)

```ts
export const fromOption = <L, A>(ma: Option<A>): EitherOption<L, A> => ...
```
