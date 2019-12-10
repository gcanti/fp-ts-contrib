---
title: Task/withTimeout.ts
nav_order: 18
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [withTimeout (function)](#withtimeout-function)

---

# withTimeout (function)

Returns the task result if it completes within a timeout, or a fallback value instead.

**Signature**

```ts
export function withTimeout<A>(onTimeout: A, millis: number): (ma: Task<A>) => Task<A> { ... }
```

**Example**

```ts
import { withTimeout } from 'fp-ts-contrib/lib/Task/withTimeout'
import { delay, of } from 'fp-ts/lib/Task'

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
