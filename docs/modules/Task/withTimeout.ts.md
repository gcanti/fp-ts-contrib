---
title: Task/withTimeout.ts
nav_order: 22
parent: Modules
---

## withTimeout overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [withTimeout](#withtimeout)

---

# utils

## withTimeout

Returns the task result if it completes within a timeout, or a fallback value instead.

**Signature**

```ts
export declare const withTimeout: <A>(onTimeout: A, millis: number) => (ma: Task<A>) => Task<A>
```

**Example**

```ts
import { withTimeout } from 'fp-ts-contrib/Task/withTimeout'
import { delay, of } from 'fp-ts/Task'

const completeAfter2s = delay(2000)(of('result'))

async function f() {
  const a1 = await withTimeout('timeout', 3000)(completeAfter2s)()
  assert.strictEqual(a1, 'result')
  const a2 = await withTimeout('timeout', 1000)(completeAfter2s)()
  assert.strictEqual(a2, 'timeout')
}

f()
```

Added in v0.1.0
