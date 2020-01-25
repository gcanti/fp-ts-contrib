---
title: ArrayOption.ts
nav_order: 5
parent: Modules
---

# ArrayOption overview

Added in v0.1.0

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
- [chainOptionK (function)](#chainoptionk-function)
- [fold (function)](#fold-function)
- [fromOptionK (function)](#fromoptionk-function)
- [getOrElse (function)](#getorelse-function)
- [alt (export)](#alt-export)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [flatten (export)](#flatten-export)
- [map (export)](#map-export)

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
export const URI: "ArrayOption" = ...
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

# chainOptionK (function)

**Signature**

```ts
export function chainOptionK<A, B>(f: (a: A) => Option<B>): (ma: ArrayOption<A>) => ArrayOption<B> { ... }
```

Added in v0.1.10

# fold (function)

**Signature**

```ts
export function fold<A, B>(onNone: () => Array<B>, onSome: (a: A) => Array<B>): (as: ArrayOption<A>) => Array<B> { ... }
```

Added in v0.1.0

# fromOptionK (function)

**Signature**

```ts
export function fromOptionK<A extends Array<unknown>, B>(f: (...a: A) => Option<B>): (...a: A) => ArrayOption<B> { ... }
```

Added in v0.1.10

# getOrElse (function)

**Signature**

```ts
export function getOrElse<A>(onNone: () => Array<A>): (as: ArrayOption<A>) => Array<A> { ... }
```

Added in v0.1.0

# alt (export)

**Signature**

```ts
<A>(that: () => ArrayOption<A>) => (fa: ArrayOption<A>) => ArrayOption<A>
```

Added in v0.1.0

# ap (export)

**Signature**

```ts
<A>(fa: ArrayOption<A>) => <B>(fab: ArrayOption<(a: A) => B>) => ArrayOption<B>
```

Added in v0.1.0

# apFirst (export)

**Signature**

```ts
<B>(fb: ArrayOption<B>) => <A>(fa: ArrayOption<A>) => ArrayOption<A>
```

Added in v0.1.0

# apSecond (export)

**Signature**

```ts
<B>(fb: ArrayOption<B>) => <A>(fa: ArrayOption<A>) => ArrayOption<B>
```

Added in v0.1.0

# chain (export)

**Signature**

```ts
<A, B>(f: (a: A) => ArrayOption<B>) => (ma: ArrayOption<A>) => ArrayOption<B>
```

Added in v0.1.0

# chainFirst (export)

**Signature**

```ts
<A, B>(f: (a: A) => ArrayOption<B>) => (ma: ArrayOption<A>) => ArrayOption<A>
```

Added in v0.1.0

# flatten (export)

**Signature**

```ts
<A>(mma: ArrayOption<ArrayOption<A>>) => ArrayOption<A>
```

Added in v0.1.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: ArrayOption<A>) => ArrayOption<B>
```

Added in v0.1.0
