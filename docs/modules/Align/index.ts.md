---
title: Align/index.ts
nav_order: 2
parent: Modules
---

# Overview

The `Align` type class extends the `Semialign` type class with a value `nil`, which
acts as a unit in regards to `align`.

`Align` instances must satisfy the following laws in addition to the `Semialign` laws:

1. Right identity: `F.align(fa, nil) = F.map(fa, this_)`
2. Left identity: `F.align(nil, fa) = F.map(fa, that)`

Adapted from http://hackage.haskell.org/package/these-0.8/docs/Data-Align.html

---

<h2 class="text-delta">Table of contents</h2>

- [Align (interface)](#align-interface)
- [Align1 (interface)](#align1-interface)
- [Align2 (interface)](#align2-interface)
- [Align2C (interface)](#align2c-interface)
- [Align3 (interface)](#align3-interface)
- [Align3C (interface)](#align3c-interface)
- [padZip (function)](#padzip-function)
- [padZipWith (function)](#padzipwith-function)
- [salign (function)](#salign-function)

---

# Align (interface)

**Signature**

```ts
export interface Align<F> extends Semialign<F> {
  readonly nil: <A>() => HKT<F, A>
}
```

Added in v0.0.3

# Align1 (interface)

**Signature**

```ts
export interface Align1<F extends URIS> extends Semialign1<F> {
  readonly nil: <A>() => Type<F, A>
}
```

# Align2 (interface)

**Signature**

```ts
export interface Align2<F extends URIS2> extends Semialign2<F> {
  readonly nil: <L, A>() => Type2<F, L, A>
}
```

# Align2C (interface)

**Signature**

```ts
export interface Align2C<F extends URIS2, L> extends Semialign2C<F, L> {
  readonly nil: <A>() => Type2<F, L, A>
}
```

# Align3 (interface)

**Signature**

```ts
export interface Align3<F extends URIS3> extends Semialign3<F> {
  readonly nil: <U, L, A>() => Type3<F, U, L, A>
}
```

# Align3C (interface)

**Signature**

```ts
export interface Align3C<F extends URIS3, U, L> extends Semialign3C<F, U, L> {
  readonly nil: <A>() => Type3<F, U, L, A>
}
```

# padZip (function)

Align two structures, using `none` to fill blanks.

It is similar to `zip`, but it doesn't discard elements.

**Signature**

```ts
export function padZip<F extends URIS3, L>(
  F: Align3<F>
): <U, L, A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, [Option<A>, Option<B>]>
export function padZip<F extends URIS3, U, L>(
  F: Align3C<F, U, L>
): <A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, [Option<A>, Option<B>]>
export function padZip<F extends URIS2>(
  F: Align2<F>
): <L, A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, [Option<A>, Option<B>]>
export function padZip<F extends URIS2, L>(
  F: Align2C<F, L>
): <A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, [Option<A>, Option<B>]>
export function padZip<F extends URIS>(
  F: Align1<F>
): <A, B>(fa: Type<F, A>, fb: Type<F, B>) => Type<F, [Option<A>, Option<B>]>
export function padZip<F>(F: Align<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, [Option<A>, Option<B>]> { ... }
```

**Example**

```ts
import { some, none } from 'fp-ts/lib/Option'
import { padZip } from 'fp-ts-contrib/lib/Align'
import { alignArray } from 'fp-ts-contrib/lib/Align/Array'

assert.deepStrictEqual(padZip(alignArray)([1, 2, 3], [4, 5]), [[some(1), some(4)], [some(2), some(5)], [some(3), none]])
```

Added in v0.0.3

# padZipWith (function)

Align two structures by applying a function to each pair of aligned elements, using `none` to fill blanks.

It is similar to `zipWith`, but it doesn't discard elements.

**Signature**

```ts
export function padZipWith<F extends URIS3, L>(
  F: Align3<F>
): <U, L, A, B, C>(
  fa: Type3<F, U, L, A>,
  fb: Type3<F, U, L, B>,
  f: (a: Option<A>, b: Option<B>) => C
) => Type3<F, U, L, C>
export function padZipWith<F extends URIS3, U, L>(
  F: Align3C<F, U, L>
): <A, B, C>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>, f: (a: Option<A>, b: Option<B>) => C) => Type3<F, U, L, C>
export function padZipWith<F extends URIS2>(
  F: Align2<F>
): <L, A, B, C>(fa: Type2<F, L, A>, fb: Type2<F, L, B>, f: (a: Option<A>, b: Option<B>) => C) => Type2<F, L, C>
export function padZipWith<F extends URIS2, L>(
  F: Align2C<F, L>
): <A, B, C>(fa: Type2<F, L, A>, fb: Type2<F, L, B>, f: (a: Option<A>, b: Option<B>) => C) => Type2<F, L, C>
export function padZipWith<F extends URIS>(
  F: Align1<F>
): <A, B, C>(fa: Type<F, A>, fb: Type<F, B>, f: (a: Option<A>, b: Option<B>) => C) => Type<F, C>
export function padZipWith<F>(
  F: Align<F>
): <A, B, C>(fa: HKT<F, A>, fb: HKT<F, B>, f: (a: Option<A>, b: Option<B>) => C) => HKT<F, C> { ... }
```

**Example**

```ts
import { Option } from 'fp-ts/lib/Option'
import { padZipWith } from 'fp-ts-contrib/lib/Align'
import { alignArray } from 'fp-ts-contrib/lib/Align/Array'

const f = (ma: Option<number>, mb: Option<string>) => ma.fold('*', a => a.toString()) + mb.getOrElse('#')
assert.deepStrictEqual(padZipWith(alignArray)([1, 2], ['a'], f), ['1a', '2#'])
assert.deepStrictEqual(padZipWith(alignArray)([1], ['a', 'b'], f), ['1a', '*b'])
```

Added in v0.0.3

# salign (function)

Align two structures, using a semigroup for combining values.

**Signature**

```ts
export function salign<F extends URIS3, A, L>(
  F: Align3<F>,
  S: Semigroup<A>
): <U, L>(fx: Type3<F, U, L, A>, fy: Type3<F, U, L, A>) => Type3<F, U, L, A>
export function salign<F extends URIS3, A, U, L>(
  F: Align3C<F, U, L>,
  S: Semigroup<A>
): (fx: Type3<F, U, L, A>, fy: Type3<F, U, L, A>) => Type3<F, U, L, A>
export function salign<F extends URIS2, A>(
  F: Align2<F>,
  S: Semigroup<A>
): <L>(fx: Type2<F, L, A>, fy: Type2<F, L, A>) => Type2<F, L, A>
export function salign<F extends URIS2, A, L>(
  F: Align2C<F, L>,
  S: Semigroup<A>
): (fx: Type2<F, L, A>, fy: Type2<F, L, A>) => Type2<F, L, A>
export function salign<F extends URIS, A>(F: Align1<F>, S: Semigroup<A>): (fx: Type<F, A>, fy: Type<F, A>) => Type<F, A>
export function salign<F, A>(F: Align<F>, S: Semigroup<A>): (fx: HKT<F, A>, fy: HKT<F, A>) => HKT<F, A> { ... }
```

**Example**

```ts
import { semigroupSum } from 'fp-ts/lib/Semigroup'
import { salign } from 'fp-ts-contrib/lib/Align'
import { alignArray } from 'fp-ts-contrib/lib/Align/Array'

assert.deepStrictEqual(salign(alignArray, semigroupSum)([1, 2, 3], [4, 5]), [5, 7, 3])
```

Added in v0.0.3
