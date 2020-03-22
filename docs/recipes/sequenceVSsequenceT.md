---
title: sequence vs sequenceT
parent: Recipes
---

#### Question

**Array of Options to Option of Array?**

Why does `sequenceT` doesn't work here?

```ts
import { sequenceT } from './Apply';
import { some, option, none } from './Option'

const sequenceTOption = sequenceT(option)

const arrayOfOptions = [some(1), none]

sequenceTOption(...arrayOfOptions) // type error
```

#### Answer

`sequence` and `sequenceT` (`sequenceS`) are different:

- `sequence` comes from [Traversable](https://gcanti.github.io/fp-ts/modules/Traversable.ts.html)
  and works with (homogeneous) arrays.
- `sequenceT` (`sequenceS`) comes from
  [Apply](https://gcanti.github.io/fp-ts/modules/Apply.ts.html) and works with
  non empty tuples (non empty structs) i.e the types can be different.

So with `sequenceT` (`sequenceS`) you can do:

```ts
import { sequenceT, sequenceS } from 'fp-ts/lib/Apply'
import * as O from 'fp-ts/lib/Option'

// Option<number> -----v         v---- Option<string>
sequenceT(O.option)(O.some(1), O.some('a'))

//      Option<number> -----v             v---- Option<string>
sequenceS(O.option)({ a: O.some(1), b: O.some('a') })
```

However with `sequence` you can't do this:

```
import * as O from 'fp-ts/lib/Option'
import * as A from 'fp-ts/lib/Array'

//                                        v--- error: Type 'string' is not assignable to type 'number'
A.array.sequence(O.option)([O.some(1), O.some('a')])
```

But it does work on homogeneous lists:

```ts
// this is ok since they are all `Option<number>`s
A.array.sequence(O.option)([O.some(1), O.some(2)]) 
```

When using `sequenceT` (`sequenceS`) we need at least one element because Apply
doesn't have the `of` operation, so we can't lift `[]` (`{}`).

#### Source

[fp-ts/issues/1140](https://github.com/gcanti/fp-ts/issues/1140)
