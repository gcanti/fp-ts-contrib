---
title: TheseOption.ts
nav_order: 19
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [TheseOption (class)](#theseoption-class)
- [URI (constant)](#uri-constant)
- [getFold (function)](#getfold-function)
- [getFromThese (function)](#getfromthese-function)
- [getMonad (function)](#getmonad-function)
- [getSome (function)](#getsome-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# TheseOption (class)

**Signature**

```ts
export class TheseOption<L, A> {
  constructor(readonly value: These<L, Option<A>>) { ... }
  ...
}
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# getFold (function)

**Signature**

```ts
export const getFold = <L>(
  M: Monad2C<TheseURI, L>
): (<A, R>(r: R, some: (a: A) => R, fa: TheseOption<L, A>) => These<L, R>) => ...
```

# getFromThese (function)

**Signature**

```ts
export const getFromThese = <L, A>(fa: These<L, A>): TheseOption<L, A> => ...
```

# getMonad (function)

**Signature**

```ts
export const getMonad = <L>(M: Monad2C<TheseURI, L>): Monad2C<URI, L> => ...
```

# getSome (function)

**Signature**

```ts
export const getSome = <L>(M: Monad2C<URI, L>): (<A>(a: A) => TheseOption<L, A>) => ...
```
