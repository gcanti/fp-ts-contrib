---
title: Task/withTimeout.ts
nav_order: 17
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
export const withTimeout = <A>(t: Task<A>, onTimeout: A, millis: number): Task<A> => ...
```

**Example**

```ts
import { withTimeout } from 'fp-ts-contrib/lib/Task/withTimeout'
import { delay } from 'fp-ts/lib/Task'

const completeAfter2s = delay(2000, 'result')

withTimeout(completeAfter2s, 'timeout', 3000).run() // Promise('result')
withTimeout(completeAfter2s, 'timeout', 1000).run() // Promise('timeout')
```

Added in v0.0.6
