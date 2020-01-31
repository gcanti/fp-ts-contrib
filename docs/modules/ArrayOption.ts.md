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
- [URI](#uri)
- [alt](#alt)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [arrayOption](#arrayoption)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [chainOptionK](#chainoptionk)
- [flatten](#flatten)
- [fold](#fold)
- [fromArray](#fromarray)
- [fromOption](#fromoption)
- [fromOptionK](#fromoptionk)
- [getOrElse](#getorelse)
- [map](#map)
- [none](#none)
- [some](#some)

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

# URI

**Signature**

```ts
export const URI: "ArrayOption" = ...
```

Added in v0.1.0

# alt

**Signature**

```ts
<A>(that: () => ArrayOption<A>) => (fa: ArrayOption<A>) => ArrayOption<A>
```

Added in v0.1.0

# ap

**Signature**

```ts
<A>(fa: ArrayOption<A>) => <B>(fab: ArrayOption<(a: A) => B>) => ArrayOption<B>
```

Added in v0.1.0

# apFirst

**Signature**

```ts
<B>(fb: ArrayOption<B>) => <A>(fa: ArrayOption<A>) => ArrayOption<A>
```

Added in v0.1.0

# apSecond

**Signature**

```ts
<B>(fb: ArrayOption<B>) => <A>(fa: ArrayOption<A>) => ArrayOption<B>
```

Added in v0.1.0

# arrayOption

**Signature**

```ts
export const arrayOption: Monad1<URI> & Alt1<URI> = ...
```

Added in v0.1.0

# chain

**Signature**

```ts
<A, B>(f: (a: A) => ArrayOption<B>) => (ma: ArrayOption<A>) => ArrayOption<B>
```

Added in v0.1.0

# chainFirst

**Signature**

```ts
<A, B>(f: (a: A) => ArrayOption<B>) => (ma: ArrayOption<A>) => ArrayOption<A>
```

Added in v0.1.0

# chainOptionK

**Signature**

```ts
export function chainOptionK<A, B>(f: (a: A) => Option<B>): (ma: ArrayOption<A>) => ArrayOption<B> { ... }
```

Added in v0.1.10

# flatten

**Signature**

```ts
<A>(mma: ArrayOption<ArrayOption<A>>) => ArrayOption<A>
```

Added in v0.1.0

# fold

**Signature**

```ts
export function fold<A, B>(onNone: () => Array<B>, onSome: (a: A) => Array<B>): (as: ArrayOption<A>) => Array<B> { ... }
```

Added in v0.1.0

# fromArray

**Signature**

```ts
export const fromArray: <A>(as: Array<A>) => ArrayOption<A> = ...
```

Added in v0.1.0

# fromOption

**Signature**

```ts
export const fromOption: <A>(ma: Option<A>) => ArrayOption<A> = ...
```

Added in v0.1.0

# fromOptionK

**Signature**

```ts
export function fromOptionK<A extends Array<unknown>, B>(f: (...a: A) => Option<B>): (...a: A) => ArrayOption<B> { ... }
```

Added in v0.1.10

# getOrElse

**Signature**

```ts
export function getOrElse<A>(onNone: () => Array<A>): (as: ArrayOption<A>) => Array<A> { ... }
```

Added in v0.1.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: ArrayOption<A>) => ArrayOption<B>
```

Added in v0.1.0

# none

**Signature**

```ts
export const none: ArrayOption<never> = ...
```

Added in v0.1.0

# some

**Signature**

```ts
export const some: <A>(a: A) => ArrayOption<A> = ...
```

Added in v0.1.0
