---
title: EitherOption.ts
nav_order: 8
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [EitherOption (class)](#eitheroption-class)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [chain (method)](#chain-method)
  - [fold (method)](#fold-method)
  - [getOrElse (method)](#getorelse-method)
- [URI (constant)](#uri-constant)
- [eitherOption (constant)](#eitheroption-constant)
- [none (constant)](#none-constant)
- [some (constant)](#some-constant)
- [fromEither (function)](#fromeither-function)
- [fromOption (function)](#fromoption-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# EitherOption (class)

**Signature**

```ts
export class EitherOption<L, A> {
  constructor(readonly value: Either<L, Option<A>>) { ... }
  ...
}
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): EitherOption<L, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: EitherOption<L, (a: A) => B>): EitherOption<L, B> { ... }
```

## ap\_ (method)

**Signature**

```ts
ap_<B, C>(this: EitherOption<L, (b: B) => C>, fb: EitherOption<L, B>): EitherOption<L, C> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => EitherOption<L, B>): EitherOption<L, B> { ... }
```

## fold (method)

**Signature**

```ts
fold<R>(onNone: R, onSome: (a: A) => R): Either<L, R> { ... }
```

## getOrElse (method)

**Signature**

```ts
getOrElse(a: A): Either<L, A> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# eitherOption (constant)

**Signature**

```ts
export const eitherOption: Monad2<URI> = ...
```

# none (constant)

**Signature**

```ts
export const none = ...
```

# some (constant)

**Signature**

```ts
export const some = ...
```

# fromEither (function)

**Signature**

```ts
export const fromEither = <L, A>(ma: Either<L, A>): EitherOption<L, A> => ...
```

# fromOption (function)

**Signature**

```ts
export const fromOption = <L, A>(ma: Option<A>): EitherOption<L, A> => ...
```
