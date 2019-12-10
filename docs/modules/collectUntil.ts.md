---
title: collectUntil.ts
nav_order: 7
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [collectUntil (function)](#collectuntil-function)

---

# collectUntil (function)

Execute an action repeatedly until the `Option` condition returns a `Some`. Collects results into an arbitrary `Alt`
value, such as a `Array` or `NonEmptyArray`.

**Signature**

```ts
export function collectUntil<M extends URIS2, F extends URIS>(
  M: Monad2<M>,
  F: Alt1<F>
): <I, E, A>(f: (i: I) => Kind2<M, E, [Kind<F, A>, Option<I>]>) => (i: I) => Kind2<M, E, Kind<F, A>>
export function collectUntil<M extends URIS, F extends URIS2>(
  M: Monad1<M>,
  F: Alt2<F>
): <I, E, A>(f: (i: I) => Kind<M, [Kind2<F, E, A>, Option<I>]>) => (i: I) => Kind<M, Kind2<F, E, A>>
export function collectUntil<M extends URIS, F extends URIS>(
  M: Monad1<M>,
  F: Alt1<F>
): <I, A>(f: (i: I) => Kind<M, [Kind<F, A>, Option<I>]>) => (i: I) => Kind<M, Kind<F, A>>
export function collectUntil<M, F>(
  M: Monad<M>,
  F: Alt<F>
): <I, A>(f: (i: I) => HKT<M, [HKT<F, A>, Option<I>]>) => (i: I) => HKT<M, HKT<F, A>> { ... }
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import * as E from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import * as TE from 'fp-ts/lib/TaskEither'
import { collectUntil } from 'fp-ts-contrib/lib/collectUntil'

interface Page {
  rows: Array<string>
  current_page: number
  last_page: number
}

// fake API
function fetchPage(current_page: number): TE.TaskEither<string, Page> {
  if (current_page <= 3) {
    return TE.right({
      rows: [`row1-Page${current_page}`, `row2-Page${current_page}`],
      current_page: current_page,
      last_page: 3
    })
  } else {
    return TE.left('invalid page')
  }
}

const getNextInput = (page: Page): O.Option<number> =>
  page.current_page < page.last_page ? O.some(page.current_page + 1) : O.none

const collectRows = collectUntil(
  TE.taskEither,
  array
)(
  flow(
    fetchPage,
    TE.map(page => [page.rows, getNextInput(page)])
  )
)

collectRows(1)().then(rows => {
  assert.deepStrictEqual(
    rows,
    E.right(['row1-Page1', 'row2-Page1', 'row1-Page2', 'row2-Page2', 'row1-Page3', 'row2-Page3'])
  )
})
```

Added in v0.1.8
