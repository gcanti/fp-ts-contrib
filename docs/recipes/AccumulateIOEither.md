---
title: Accumulate IOEither
parent: Recipes
---

#### Question

Given `Array<IOEither<E, A>>`.

Count how many lefts and rights. Result should be
`IO<{ success: number, failure: number }>` (or `IO<[number, number]>`).

#### Answer

Using `wilt` (from
[Witherable](https://gcanti.github.io/fp-ts/modules/Witherable.ts.html)):

```ts
import { array } from 'fp-ts/lib/Array'
import { identity } from 'fp-ts/lib/function'
import { io, IO } from 'fp-ts/lib/IO'
import { IOEither } from 'fp-ts/lib/IOEither'
import { Separated } from 'fp-ts/lib/Compactable'

declare const xs: Array<IOEither<Error, number>>

const result: IO<Separated<Error[], number[]>> = array.wilt(io)(xs, identity)
```

#### Source

[#typescript of FP Slack ](https://fpchat-invite.herokuapp.com/).
