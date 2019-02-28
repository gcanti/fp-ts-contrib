---
title: TheseOption.ts
nav_order: 12
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [URI](#uri)
- [TheseOption](#theseoption)
- [URI](#uri-1)
- [getFold](#getfold)
- [getFromThese](#getfromthese)
- [getMonad](#getmonad)
- [getSome](#getsome)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# TheseOption

**Signature** (class)

```ts
export class TheseOption<L, A> {
  constructor(readonly value: These<L, Option<A>>) { ... }
  ...
}
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# getFold

**Signature** (function)

```ts
export const getFold = <L>(
  M: Monad2C<TheseURI, L>
): (<A, R>(r: R, some: (a: A) => R, fa: TheseOption<L, A>) => These<L, R>) => ...
```

# getFromThese

**Signature** (function)

```ts
export const getFromThese = <L, A>(fa: These<L, A>): TheseOption<L, A> => ...
```

# getMonad

**Signature** (function)

```ts
export const getMonad = <L>(M: Monad2C<TheseURI, L>): Monad2C<URI, L> => ...
```

# getSome

**Signature** (function)

```ts
export const getSome = <L>(M: Monad2C<URI, L>): (<A>(a: A) => TheseOption<L, A>) => ...
```
