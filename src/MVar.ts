/**
 * Adapted from https://hackage.haskell.org/package/base-4.12.0.0/docs/Control-Concurrent-MVar.html
 *
 * @since 0.1.14
 */
import * as O from 'fp-ts/lib/Option'
import * as T from 'fp-ts/lib/Task'
import { pipe } from 'fp-ts/lib/pipeable'
import * as A from 'fp-ts/lib/Array'
import { constVoid } from 'fp-ts/lib/function'
import * as IO from 'fp-ts/lib/IO'

/**
 * An MVar<T> is mutable location that is either empty or contains a value of type T.
 * It has two fundamental operations: `put` which fills an MVar if it is empty
 * and blocks otherwise, and `take` which empties an MVar if it is full
 * and blocks otherwise.
 *
 * @example
 * import * as IO from 'fp-ts/lib/IO'
 * import * as MVar from 'fp-ts-contrib/lib/MVar'
 * import * as T from 'fp-ts/lib/Task'
 * import { Do } from 'fp-ts-contrib/lib/Do'
 * import { log } from 'fp-ts/lib/Console'
 * import { pipe } from 'fp-ts/lib/pipeable'
 * import { randomRange } from 'fp-ts/lib/Random'
 * import { sequenceT } from 'fp-ts/lib/Apply'
 *
 * interface Response {
 *   status: 200 | 401
 * }
 *
 * type Token = string
 *
 * const issuedTokens: Set<Token> = new Set()
 * const isTokenValid = (token: Token): IO.IO<boolean> => () => issuedTokens.has(token)
 * const addToken = (token: Token): IO.IO<void> => () => issuedTokens.add(token)
 * const wipeTokens: IO.IO<void> = () => issuedTokens.clear()
 *
 * setInterval(
 *   pipe(
 *     wipeTokens,
 *     IO.chain(() => log('Tokens wiped.'))
 *   ),
 *   500
 * )
 *
 * const tokenVar = MVar.newEmptyMVar<Token>()
 *
 * const loginRequest: T.Task<Token> = pipe(
 *   log('Logging in'),
 *   IO.chain(() => randomRange(1, 9999)),
 *   IO.map(n => `token-${Math.floor(n)}`),
 *   IO.chainFirst(token => sequenceT(IO.io)(addToken(token), log(`New token "${token}" issued.`))),
 *   T.fromIO,
 *   T.delay(2)
 * )
 *
 * const login: T.Task<void> = pipe(loginRequest, T.chain(tokenVar.put))
 *
 * const someRequest = (token: Token): T.Task<Response> =>
 *   pipe(
 *     randomRange(50, 200),
 *     T.fromIO,
 *     T.chain(wait =>
 *       pipe(
 *         T.fromIO(isTokenValid(token)),
 *         T.map(isValid => ({ status: isValid ? (200 as const) : (401 as const) })),
 *         T.delay(wait)
 *       )
 *     )
 *   )
 *
 * const handleLogout: T.Task<void> = pipe(
 *   // Take the token out of the MVar. Other concurrent requests
 *   // have to wait for a new token. This prevents race conditions.
 *   tokenVar.take,
 *   T.chain(() => loginRequest),
 *   T.chain(tokenVar.put)
 * )
 *
 * const runRequest = (request: (token: Token) => T.Task<Response>): T.Task<Response> =>
 *   Do(T.task)
 *     .bind('id', T.fromIO(pipe(randomRange(1000, 9999), IO.map(Math.floor))))
 *     .bind('token', tokenVar.read)
 *     .bindL('response', ({ id, token }) =>
 *       pipe(
 *         T.fromIO(log(`[${id}] Request with token ${token}.`)),
 *         T.chain(() => request(token)),
 *         T.chainFirst(res => T.fromIO(log(`[${id}] ${res.status}`))),
 *         T.chain(res =>
 *           res.status === 401
 *             ? pipe(
 *                 T.fromIO(log(`[${id}] Session expired`)),
 *                 T.chain(() => handleLogout),
 *                 T.chain(() => runRequest(request))
 *               )
 *             : T.of(res)
 *         )
 *       )
 *     )
 *     .return(({ response }) => response)
 *
 * const halt: IO.IO<void> = () => process.exit(0)
 *
 * pipe(
 *   login,
 *   T.chain(() => runRequest(someRequest)),
 *   T.chain(() => T.delay(5)(runRequest(someRequest))),
 *   T.chain(() => T.delay(25)(runRequest(someRequest))),
 *   T.chain(() => T.delay(200)(runRequest(someRequest))),
 *   T.chain(() => T.delay(1)(runRequest(someRequest))),
 *   T.chain(() => T.delay(1)(runRequest(someRequest))),
 *   T.chain(() => T.delay(250)(runRequest(someRequest))),
 *   T.chain(() => T.delay(1)(runRequest(someRequest))),
 *   T.chain(() => T.fromIO(halt))
 * )()
 *
 * @since 0.1.14
 */
export class MVar<T> {
  private takeQ: Array<(a: T) => void>
  private putQ: Array<() => void>
  private readQ: Array<(a: T) => void>

  constructor(private value: O.Option<T>) {
    this.takeQ = []
    this.putQ = []
    this.readQ = []

    this.take = this.take.bind(this)
    this.put = this.put.bind(this)
    this.read = this.read.bind(this)
    this.modify = this.modify.bind(this)
    this.swap = this.swap.bind(this)
    this.isEmpty = this.isEmpty.bind(this)
    this.tryTake = this.tryTake.bind(this)
    this.tryPut = this.tryPut.bind(this)
    this.tryRead = this.tryRead.bind(this)
  }

  /**
   * @since 0.1.14
   */
  private enqueueTake(job: (a: T) => void): void {
    this.takeQ = A.snoc(this.takeQ, job)
  }

  /**
   * @since 0.1.14
   */
  private enqueuePut(job: () => void): void {
    this.putQ = A.snoc(this.putQ, job)
  }

  /**
   * @since 0.1.14
   */
  private enqueueRead(job: (a: T) => void): void {
    this.readQ = A.snoc(this.readQ, job)
  }

  /**
   * Returns the contents of the `MVar`. If the `MVar` is currently empty,
   * `take` will wait until it is full. After a `take`, the `MVar` is left empty.
   *
   * @since 0.1.14
   */
  take: T.Task<T> = () =>
    new Promise(resolve =>
      pipe(
        this.value,
        O.fold(
          () => this.enqueueTake(a => resolve(a)),
          a => {
            this.value = O.none
            pipe(
              A.head(this.putQ),
              O.fold(constVoid, putJob => {
                this.putQ = A.dropLeft(1)(this.putQ)
                putJob()
              })
            )
            resolve(a)
          }
        )
      )
    )

  /**
   * Puts a value into an `MVar`. If the `MVar` is currently full, put will wait
   * until it becomes empty.
   *
   * @since 0.1.14
   */
  put(a: T): T.Task<void> {
    return () =>
      new Promise(resolve =>
        pipe(
          this.value,
          O.fold(
            () => {
              this.value = O.some(a)
              pipe(
                A.head(this.takeQ),
                O.fold(constVoid, takeJob => {
                  this.takeQ = A.dropLeft(1)(this.takeQ)
                  takeJob(a)
                })
              )
              pipe(
                A.head(this.readQ),
                O.fold(constVoid, readJob => {
                  this.readQ = A.dropLeft(1)(this.readQ)
                  readJob(a)
                })
              )
              resolve()
            },
            () =>
              this.enqueuePut(() => {
                this.value = O.some(a)
                resolve()
              })
          )
        )
      )
  }

  /**
   * Reads the contents of an `MVar`. If the `MVar` is currently empty, `read`
   * will wait until it is full. `read` is guaranteed to receive the next `put`.
   *
   * @since 0.1.14
   */
  read: T.Task<T> = () =>
    new Promise(resolve =>
      pipe(
        this.value,
        O.fold(() => this.enqueueRead(resolve), resolve)
      )
    )

  /**
   * Modifies the contents of an `MVar`. If the `MVar` is currently empty, `modify`
   * will wait until it is full.
   *
   * @since 0.1.14
   */
  modify(f: (a: T) => T.Task<T>): T.Task<void> {
    return pipe(this.take, T.chain(f), T.chain(this.put))
  }

  /**
   * Takes a value from an `MVar`, put a new value into the `MVar` and returns
   * the value taken.
   *
   * @since 0.1.14
   */
  swap(a: T): T.Task<T> {
    return pipe(
      this.take,
      T.chainFirst(() => this.put(a))
    )
  }

  /**
   * Checks whether a given `MVar` is empty.
   *
   * @since 0.1.14
   */
  isEmpty: IO.IO<boolean> = (): boolean => O.isNone(this.value)

  /**
   * A non-blocking version of `take`. The `tryTake` function returns
   * immediately, with `None` if the `MVar` was empty, or `Some<T>` if the `MVar`
   * was full with contents `T`. After `tryTake`, the `MVar` is left empty.
   *
   * @since 0.1.14
   */
  tryTake: IO.IO<O.Option<T>> = pipe(
    IO.of(this.value),
    IO.chainFirst(() => () => (this.value = O.none))
  )

  /**
   * A non-blocking version of `put`. The `tryPut` function attempts
   * to put the value `a` into the `MVar`, returning `true` if it was successful,
   * or `false` otherwise.
   *
   * @since 0.1.14
   */
  tryPut(a: T): IO.IO<boolean> {
    return pipe(
      this.value,
      O.fold(
        () => {
          this.value = O.some(a)
          return IO.of<boolean>(true)
        },
        () => IO.of<boolean>(false)
      )
    )
  }

  /**
   * A non-blocking version of `read`. The `tryRead` function returns
   * immediately, with `None` if the `MVar` was empty, or `Some<T>`
   * if the `MVar` was full with contents `T`.
   *
   * @since 0.1.14
   */
  tryRead: IO.IO<O.Option<T>> = IO.of(this.value)
}

/**
 * Creates an `MVar` which is initially empty.
 *
 * @since 0.1.14
 */
export function newEmptyMVar<T>(): MVar<T> {
  return new MVar<T>(O.none)
}

/**
 * Creates an `MVar` which contains the supplied value.
 *
 * @since 0.1.14
 */
export function newMVar<T>(a: T): MVar<T> {
  return new MVar(O.some(a))
}
