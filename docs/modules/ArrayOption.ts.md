---
title: ArrayOption.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [ArrayOption (class)](#arrayoption-class)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [chain (method)](#chain-method)
  - [fold (method)](#fold-method)
  - [getOrElse (method)](#getorelse-method)
- [URI (constant)](#uri-constant)
- [arrayOption (constant)](#arrayoption-constant)
- [none (constant)](#none-constant)
- [some (constant)](#some-constant)
- [fromArray (function)](#fromarray-function)
- [fromOption (function)](#fromoption-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# ArrayOption (class)

**Signature**

```ts
export class ArrayOption<A> {
  constructor(readonly value: Array<Option<A>>) { ... }
  ...
}
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): ArrayOption<B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: ArrayOption<(a: A) => B>): ArrayOption<B> { ... }
```

## ap\_ (method)

**Signature**

```ts
ap_<B, C>(this: ArrayOption<(b: B) => C>, fb: ArrayOption<B>): ArrayOption<C> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => ArrayOption<B>): ArrayOption<B> { ... }
```

## fold (method)

**Signature**

```ts
fold<R>(onNone: R, onSome: (a: A) => R): Array<R> { ... }
```

## getOrElse (method)

**Signature**

```ts
getOrElse(a: A): Array<A> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# arrayOption (constant)

**Signature**

```ts
export const arrayOption: Monad1<URI> = ...
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

# fromArray (function)

**Signature**

```ts
export const fromArray = <A>(ma: Array<A>): ArrayOption<A> => ...
```

# fromOption (function)

**Signature**

```ts
export const fromOption = <A>(ma: Option<A>): ArrayOption<A> => ...
```
