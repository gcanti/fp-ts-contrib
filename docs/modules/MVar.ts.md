---
title: MVar.ts
nav_order: 12
parent: Modules
---

# MVar overview

Adapted from https://hackage.haskell.org/package/base-4.12.0.0/docs/Control-Concurrent-MVar.html

Added in v0.1.14

---

<h2 class="text-delta">Table of contents</h2>

- [MVar (class)](#mvar-class)
  - [enqueueTake (method)](#enqueuetake-method)
  - [enqueuePut (method)](#enqueueput-method)
  - [enqueueRead (method)](#enqueueread-method)
  - [put (method)](#put-method)
  - [modify (method)](#modify-method)
  - [swap (method)](#swap-method)
  - [tryPut (method)](#tryput-method)
- [newEmptyMVar](#newemptymvar)
- [newMVar](#newmvar)

---

# MVar (class)

An MVar<T> is mutable location that is either empty or contains a value of type T.
It has two fundamental operations: `put` which fills an MVar if it is empty
and blocks otherwise, and `take` which empties an MVar if it is full
and blocks otherwise.

**Signature**

```ts
export class MVar<T> {
  constructor(private value: O.Option<T>) { ... }
  ...
}
```

**Example**

```ts
import * as IO from 'fp-ts/lib/IO'
import * as MVar from 'fp-ts-contrib/lib/MVar'
import * as T from 'fp-ts/lib/Task'
import { Do } from 'fp-ts-contrib/lib/Do'
import { log } from 'fp-ts/lib/Console'
import { pipe } from 'fp-ts/lib/pipeable'
import { randomRange } from 'fp-ts/lib/Random'
import { sequenceT } from 'fp-ts/lib/Apply'

interface Response {
  status: 200 | 401
}

type Token = string

const issuedTokens: Set<Token> = new Set()
const isTokenValid = (token: Token): IO.IO<boolean> => () => issuedTokens.has(token)
const addToken = (token: Token): IO.IO<void> => () => issuedTokens.add(token)
const wipeTokens: IO.IO<void> = () => issuedTokens.clear()

setInterval(
  pipe(
    wipeTokens,
    IO.chain(() => log('Tokens wiped.'))
  ),
  500
)

const tokenVar = MVar.newEmptyMVar<Token>()

const loginRequest: T.Task<Token> = pipe(
  log('Logging in'),
  IO.chain(() => randomRange(1, 9999)),
  IO.map(n => `token-${Math.floor(n)}`),
  IO.chainFirst(token => sequenceT(IO.io)(addToken(token), log(`New token "${token}" issued.`))),
  T.fromIO,
  T.delay(2)
)

const login: T.Task<void> = pipe(loginRequest, T.chain(tokenVar.put))

const someRequest = (token: Token): T.Task<Response> =>
  pipe(
    randomRange(50, 200),
    T.fromIO,
    T.chain(wait =>
      pipe(
        T.fromIO(isTokenValid(token)),
        T.map(isValid => ({ status: isValid ? (200 as const) : (401 as const) })),
        T.delay(wait)
      )
    )
  )

const handleLogout: T.Task<void> = pipe(
  // Take the token out of the MVar. Other concurrent requests
  // have to wait for a new token. This prevents race conditions.
  tokenVar.take,
  T.chain(() => loginRequest),
  T.chain(tokenVar.put)
)

const runRequest = (request: (token: Token) => T.Task<Response>): T.Task<Response> =>
  Do(T.task)
    .bind('id', T.fromIO(pipe(randomRange(1000, 9999), IO.map(Math.floor))))
    .bind('token', tokenVar.read)
    .bindL('response', ({ id, token }) =>
      pipe(
        T.fromIO(log(`[${id}] Request with token ${token}.`)),
        T.chain(() => request(token)),
        T.chainFirst(res => T.fromIO(log(`[${id}] ${res.status}`))),
        T.chain(res =>
          res.status === 401
            ? pipe(
                T.fromIO(log(`[${id}] Session expired`)),
                T.chain(() => handleLogout),
                T.chain(() => runRequest(request))
              )
            : T.of(res)
        )
      )
    )
    .return(({ response }) => response)

const halt: IO.IO<void> = () => process.exit(0)

pipe(
  login,
  T.chain(() => runRequest(someRequest)),
  T.chain(() => T.delay(5)(runRequest(someRequest))),
  T.chain(() => T.delay(25)(runRequest(someRequest))),
  T.chain(() => T.delay(200)(runRequest(someRequest))),
  T.chain(() => T.delay(1)(runRequest(someRequest))),
  T.chain(() => T.delay(1)(runRequest(someRequest))),
  T.chain(() => T.delay(250)(runRequest(someRequest))),
  T.chain(() => T.delay(1)(runRequest(someRequest))),
  T.chain(() => T.fromIO(halt))
)()
```

Added in v0.1.14

## enqueueTake (method)

**Signature**

```ts
private enqueueTake(job: (a: T) => void): void { ... }
```

Added in v0.1.14

## enqueuePut (method)

**Signature**

```ts
private enqueuePut(job: () => void): void { ... }
```

Added in v0.1.14

## enqueueRead (method)

**Signature**

```ts
private enqueueRead(job: (a: T) => void): void { ... }
```

Added in v0.1.14

## put (method)

Puts a value into an `MVar`. If the `MVar` is currently full, put will wait
until it becomes empty.

**Signature**

```ts
put(a: T): T.Task<void> { ... }
```

Added in v0.1.14

## modify (method)

Modifies the contents of an `MVar`. If the `MVar` is currently empty, `modify`
will wait until it is full.

**Signature**

```ts
modify(f: (a: T) => T.Task<T>): T.Task<void> { ... }
```

Added in v0.1.14

## swap (method)

Takes a value from an `MVar`, put a new value into the `MVar` and returns
the value taken.

**Signature**

```ts
swap(a: T): T.Task<T> { ... }
```

Added in v0.1.14

## tryPut (method)

A non-blocking version of `put`. The `tryPut` function attempts
to put the value `a` into the `MVar`, returning `true` if it was successful,
or `false` otherwise.

**Signature**

```ts
tryPut(a: T): IO.IO<boolean> { ... }
```

Added in v0.1.14

# newEmptyMVar

Creates an `MVar` which is initially empty.

**Signature**

```ts
export function newEmptyMVar<T>(): MVar<T> { ... }
```

Added in v0.1.14

# newMVar

Creates an `MVar` which contains the supplied value.

**Signature**

```ts
export function newMVar<T>(a: T): MVar<T> { ... }
```

Added in v0.1.14
