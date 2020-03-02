---
title: IOOption.ts
nav_order: 11
parent: Modules
---

# IOOption overview

Added in v0.1.14

---

<h2 class="text-delta">Table of contents</h2>

- [IOOption (interface)](#iooption-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [alt](#alt)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [chainOptionK](#chainoptionk)
- [compact](#compact)
- [filter](#filter)
- [filterMap](#filtermap)
- [flatten](#flatten)
- [fold](#fold)
- [fromIO](#fromio)
- [fromIOEither](#fromioeither)
- [fromNullable](#fromnullable)
- [fromOption](#fromoption)
- [fromOptionK](#fromoptionk)
- [getApplyMonoid](#getapplymonoid)
- [getApplySemigroup](#getapplysemigroup)
- [getOrElse](#getorelse)
- [ioOption](#iooption)
- [map](#map)
- [mapNullable](#mapnullable)
- [none](#none)
- [partition](#partition)
- [partitionMap](#partitionmap)
- [separate](#separate)
- [some](#some)
- [toNullable](#tonullable)
- [toUndefined](#toundefined)

---

# IOOption (interface)

**Signature**

```ts
export interface IOOption<A> extends IO<Option<A>> {}
```

Added in v0.1.14

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.14

# URI

**Signature**

```ts
export const URI: "IOOption" = ...
```

Added in v0.1.14

# alt

**Signature**

```ts
<A>(that: () => IOOption<A>) => (fa: IOOption<A>) => IOOption<A>
```

Added in v0.1.14

# ap

**Signature**

```ts
<A>(fa: IOOption<A>) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B>
```

Added in v0.1.14

# apFirst

**Signature**

```ts
<B>(fb: IOOption<B>) => <A>(fa: IOOption<A>) => IOOption<A>
```

Added in v0.1.14

# apSecond

**Signature**

```ts
<B>(fb: IOOption<B>) => <A>(fa: IOOption<A>) => IOOption<B>
```

Added in v0.1.14

# chain

**Signature**

```ts
<A, B>(f: (a: A) => IOOption<B>) => (ma: IOOption<A>) => IOOption<B>
```

Added in v0.1.14

# chainFirst

**Signature**

```ts
<A, B>(f: (a: A) => IOOption<B>) => (ma: IOOption<A>) => IOOption<A>
```

Added in v0.1.14

# chainOptionK

**Signature**

```ts
export function chainOptionK<A, B>(f: (a: A) => Option<B>): (ma: IOOption<A>) => IOOption<B> { ... }
```

Added in v0.1.14

# compact

**Signature**

```ts
<A>(fa: IOOption<O.Option<A>>) => IOOption<A>
```

Added in v0.1.14

# filter

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: IOOption<A>) => IOOption<B>; <A>(predicate: Predicate<A>): (fa: IOOption<A>) => IOOption<A>; }
```

Added in v0.1.14

# filterMap

**Signature**

```ts
<A, B>(f: (a: A) => O.Option<B>) => (fa: IOOption<A>) => IOOption<B>
```

Added in v0.1.14

# flatten

**Signature**

```ts
<A>(mma: IOOption<IOOption<A>>) => IOOption<A>
```

Added in v0.1.14

# fold

**Signature**

```ts
export function fold<A, B>(onNone: () => IO<B>, onSome: (a: A) => IO<B>): (ma: IOOption<A>) => IO<B> { ... }
```

Added in v0.1.14

# fromIO

**Signature**

```ts
export const fromIO: <A = never>(ma: IO<A>) => IOOption<A> = ...
```

Added in v0.1.14

# fromIOEither

**Signature**

```ts
export function fromIOEither<A>(ma: IOEither<any, A>): IOOption<A> { ... }
```

Added in v0.1.14

# fromNullable

**Signature**

```ts
export function fromNullable<A>(a: A): IOOption<NonNullable<A>> { ... }
```

Added in v0.1.14

# fromOption

**Signature**

```ts
export const fromOption: <A = never>(ma: Option<A>) => IOOption<A> = ...
```

Added in v0.1.14

# fromOptionK

**Signature**

```ts
export function fromOptionK<A extends Array<unknown>, B>(f: (...a: A) => Option<B>): (...a: A) => IOOption<B> { ... }
```

Added in v0.1.14

# getApplyMonoid

**Signature**

```ts
export function getApplyMonoid<A>(M: Monoid<A>): Monoid<IOOption<A>> { ... }
```

Added in v0.1.14

# getApplySemigroup

**Signature**

```ts
export function getApplySemigroup<A>(S: Semigroup<A>): Semigroup<IOOption<A>> { ... }
```

Added in v0.1.14

# getOrElse

**Signature**

```ts
export function getOrElse<A>(onNone: () => IO<A>): (ma: IOOption<A>) => IO<A> { ... }
```

Added in v0.1.14

# ioOption

**Signature**

```ts
export const ioOption: Monad1<URI> & Alt1<URI> & MonadIO1<URI> & Filterable1<URI> = ...
```

Added in v0.1.14

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: IOOption<A>) => IOOption<B>
```

Added in v0.1.14

# mapNullable

**Signature**

```ts
export function mapNullable<A, B>(f: (a: A) => B | null | undefined): (ma: IOOption<A>) => IOOption<B> { ... }
```

Added in v0.1.14

# none

**Signature**

```ts
export const none: IOOption<never> = ...
```

Added in v0.1.14

# partition

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: IOOption<A>) => Separated<IOOption<A>, IOOption<B>>; <A>(predicate: Predicate<A>): (fa: IOOption<A>) => Separated<IOOption<A>, IOOption<A>>; }
```

Added in v0.1.14

# partitionMap

**Signature**

```ts
<A, B, C>(f: (a: A) => Either<B, C>) => (fa: IOOption<A>) => Separated<IOOption<B>, IOOption<C>>
```

Added in v0.1.14

# separate

**Signature**

```ts
<A, B>(fa: IOOption<Either<A, B>>) => Separated<IOOption<A>, IOOption<B>>
```

Added in v0.1.14

# some

**Signature**

```ts
export const some: <A = never>(a: A) => IOOption<A> = ...
```

Added in v0.1.14

# toNullable

**Signature**

```ts
export function toNullable<A>(ma: IOOption<A>): IO<A | null> { ... }
```

Added in v0.1.14

# toUndefined

**Signature**

```ts
export function toUndefined<A>(ma: IOOption<A>): IO<A | undefined> { ... }
```

Added in v0.1.14
