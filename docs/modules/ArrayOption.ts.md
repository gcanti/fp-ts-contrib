---
title: ArrayOption.ts
nav_order: 5
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ArrayOption (interface)](#arrayoption-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [arrayOption (constant)](#arrayoption-constant)
- [fromArray (constant)](#fromarray-constant)
- [fromOption (constant)](#fromoption-constant)
- [none (constant)](#none-constant)
- [some (constant)](#some-constant)
- [fold (function)](#fold-function)
- [getOrElse (function)](#getorelse-function)

---

# ArrayOption (interface)

**Signature**

```ts
export interface ArrayOption<A> extends Array<Option<A>> {}
```

Added in v0.1.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.0

# URI (constant)

**Signature**

```ts
export const URI = ...
```

Added in v0.1.0

# arrayOption (constant)

**Signature**

```ts
export const arrayOption: Monad1<URI> & Alt1<URI> = ...
```

Added in v0.1.0

# fromArray (constant)

**Signature**

```ts
export const fromArray: <A>(as: Array<A>) => ArrayOption<A> = ...
```

Added in v0.1.0

# fromOption (constant)

**Signature**

```ts
export const fromOption: <A>(ma: Option<A>) => ArrayOption<A> = ...
```

Added in v0.1.0

# none (constant)

**Signature**

```ts
export const none: ArrayOption<never> = ...
```

Added in v0.1.0

# some (constant)

**Signature**

```ts
export const some: <A>(a: A) => ArrayOption<A> = ...
```

Added in v0.1.0

# fold (function)

**Signature**

```ts
export function fold<A, B>(onNone: () => Array<B>, onSome: (a: A) => Array<B>): (as: ArrayOption<A>) => Array<B> { ... }
```

Added in v0.1.0

# getOrElse (function)

**Signature**

```ts
export function getOrElse<A>(onNone: () => Array<A>): (as: ArrayOption<A>) => Array<A> { ... }
```

Added in v0.1.0
