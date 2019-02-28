---
title: ArrayOption.ts
nav_order: 1
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [URI](#uri)
- [ArrayOption](#arrayoption)
  - [map](#map)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [chain](#chain)
  - [fold](#fold)
  - [getOrElse](#getorelse)
- [URI](#uri-1)
- [arrayOption](#arrayoption)
- [none](#none)
- [some](#some)
- [fromArray](#fromarray)
- [fromOption](#fromoption)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# ArrayOption

**Signature** (class)

```ts
export class ArrayOption<A> {
  constructor(readonly value: Array<Option<A>>) { ... }
  ...
}
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): ArrayOption<B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: ArrayOption<(a: A) => B>): ArrayOption<B> { ... }
```

## ap\_

**Signature** (method)

```ts
ap_<B, C>(this: ArrayOption<(b: B) => C>, fb: ArrayOption<B>): ArrayOption<C> { ... }
```

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => ArrayOption<B>): ArrayOption<B> { ... }
```

## fold

**Signature** (method)

```ts
fold<R>(onNone: R, onSome: (a: A) => R): Array<R> { ... }
```

## getOrElse

**Signature** (method)

```ts
getOrElse(a: A): Array<A> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# arrayOption

**Signature** (constant)

```ts
export const arrayOption: Monad1<URI> = ...
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

# fromArray

**Signature** (function)

```ts
export const fromArray = <A>(ma: Array<A>): ArrayOption<A> => ...
```

# fromOption

**Signature** (function)

```ts
export const fromOption = <A>(ma: Option<A>): ArrayOption<A> => ...
```
